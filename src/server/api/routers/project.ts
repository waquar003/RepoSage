import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { pollCommits } from "@/lib/github";
import { checkCredits, indexGithubRepo } from "@/lib/github-loader";
import { TRPCError } from "@trpc/server";

export const projectRouter = createTRPCRouter({
    createProject: protectedProcedure.input(
        z.object({
            name: z.string(),
            githubUrl: z.string(),
            githubToken: z.string().optional()
        })
    ).mutation(async ({ctx, input}) => {
        const user = await ctx.db.user.findUnique({
            where: {
                id: ctx.user.userId!
            },
            select: {
                credits: true
            }
        })

        if(!user) {
            throw new TRPCError({
                code: 'UNAUTHORIZED',
                message: 'User not found'
            })
        }
        
        const fileCount = await checkCredits(input.githubUrl, input.githubToken);

        if(fileCount > user.credits) {
            throw new TRPCError({
                code: 'BAD_REQUEST',
                message: 'Not enough credits to create project'
            })
        }

        const project = await ctx.db.project.create({
            data: {
                githubUrl: input.githubUrl,
                name: input.name,
                userToProjects: {
                    create: {
                        userId: ctx.user.userId!
                    }
                }
            }
        })
        try {
            // Index the GitHub repo
            await indexGithubRepo(project.id, input.githubUrl, input.githubToken);
        } catch (error: any) {
            // If GitHub indexing fails, throw a specific error
            throw new TRPCError({
                code: 'BAD_REQUEST',
                message: error.message || 'Failed to index GitHub repository. Please check the URL and token.',
                cause: error
            });
        }
        await pollCommits(project.id)
        await ctx.db.user.update({
            where: {
                id: ctx.user.userId!
            },
            data: {
                credits: {
                    decrement: fileCount
                }
            }
        })
        return project
    }),

    getProjects: protectedProcedure.query(async ({ctx}) => {
        const projects = await ctx.db.project.findMany({
            where: {
                userToProjects: {
                    some: {
                        userId: ctx.user.userId!
                    }
                },
                deletedAt: null
            }
        })
        // console.log(projects)
        return projects
    }),

    getCommits: protectedProcedure.input(
        z.object({
            projectId: z.string()
        })
    ).query(async ({ctx, input}) => {
        pollCommits(input.projectId).then().catch(console.error)
        const commits = await ctx.db.commit.findMany({
            where: {
                projectId: input.projectId
            }
        })
        return commits
    }),

    saveAnswer: protectedProcedure.input(
        z.object({
            projectId: z.string(),
            question: z.string(),
            answer: z.string(),
            filesReferences: z.any()
        })
    ).mutation(async ({ ctx, input }) => {
        const question = await ctx.db.question.create({
            data: {
                answer: input.answer,
                filesReferences: input.filesReferences,
                projectId: input.projectId,
                question: input.question,
                userId: ctx.user.userId!
            }
        })
        return question
    }),

    getQuestions: protectedProcedure.input(
        z.object({
            projectId: z.string()
        })
    ).query( async ({ ctx, input }) => {
        const questions = await ctx.db.question.findMany({
            where: {
                projectId: input.projectId
            },
            include: {
                user: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        })
        return questions
    }),

    uploadMeeting: protectedProcedure.input(
        z.object({
            projectId: z.string(),
            meetingUrl: z.string(),
            name: z.string()
        }) 
    ).mutation(async ({ ctx, input }) => {
        const meeting = await ctx.db.meeting.create({
            data: {
                projectId: input.projectId,
                meetingUrl: input.meetingUrl,
                name: input.name,
                status: "PROCESSING"
            }
        })
        return meeting
    }),
    
    getMeetings: protectedProcedure.input(
        z.object({
            projectId: z.string()
        })
    ).query(async ({ ctx, input }) => {
        const meetings = await ctx.db.meeting.findMany({
            where: {
                projectId: input.projectId
            }, 
            include: {
                issues: true
            }
        })
        return meetings
    }),
    
    deleteMeeting: protectedProcedure.input(
        z.object({
            meetingId: z.string()
        })
    ).mutation(async ({ ctx, input }) => {
        const meeting = await ctx.db.meeting.delete({
            where: {
                id: input.meetingId
            }
        })
        return meeting
    }),

    getMeetingById: protectedProcedure.input(
        z.object({
            meetingId: z.string()
        })
    ).query(async ({ ctx, input }) => {
        const meeting = await ctx.db.meeting.findUnique({
            where: {
                id: input.meetingId
            },
            include: {
                issues: true
            }
        })

        return meeting
    }),

    archiveProject: protectedProcedure.input(
        z.object({
            projectId: z.string()
        })
    ).mutation(async ({ ctx, input }) => {
        const project = await ctx.db.project.update({
            where: {
                id: input.projectId
            },
            data: {
                deletedAt: new Date()
            }
        })
        return project
    }),

    getTeamMembers: protectedProcedure.input(
        z.object({
            projectId: z.string()
        })
    ).query(async ({ ctx, input }) => {
        const teamMembers = await ctx.db.userToProject.findMany({
            where: {
                projectId: input.projectId
            },
            include: {
                user: true
            }
        })
        return teamMembers
    }),

    getMyCredits: protectedProcedure.query(async ({ ctx }) => {
        const credits = await ctx.db.user.findUnique({
            where: {
                id: ctx.user.userId!
            },
            select: {
                credits: true
            }
        })
        return credits
    }),

    checkCredits: protectedProcedure.input(
        z.object({
            githubUrl: z.string(),
            githubToken: z.string().optional()
        })
    ).mutation(async ({ ctx, input }) => {
        const fileCount = await checkCredits(input.githubUrl, input.githubToken)
        const userCredits = await ctx.db.user.findUnique({
            where: {
                id: ctx.user.userId!
            },
            select: {
                credits: true
            }
        })

        return { fileCount, userCredits: userCredits?.credits || 0 }
    }),

    getTransactions: protectedProcedure.query(async ({ ctx }) => {
        const transactions = await ctx.db.stripeTransaction.findMany({
            where: {
                userId: ctx.user.userId!
            },
            include: {
                user: true,
            }
        })
        return transactions
    })  
});