import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { pollCommits } from "@/lib/github";
import { indexGithubRepo } from "@/lib/github-loader";
import { TRPCError } from "@trpc/server";

export const projectRouter = createTRPCRouter({
    createProject: protectedProcedure.input(
        z.object({
            name: z.string(),
            githubUrl: z.string(),
            githubToken: z.string().optional()
        })
    ).mutation(async ({ctx, input}) => {
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
    
});