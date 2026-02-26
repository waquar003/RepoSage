import { db } from "@/server/db";
import { Octokit } from "octokit";
import { aiSummariseCommit } from "./gemini";
import  axios  from "axios";

export const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
});

type Response = {
    commitHash: string;
    commitMessage: string;
    commitAuthorName: string;
    commitAuthorAvatar: string;
    commitDate: string;
}

export const getCommitHashes = async (githubUrl: string): Promise<Response[]> => {
    const owner = githubUrl.split("/")[3];
    const repo = githubUrl.split("/")[4];

    if(!owner || !repo) {
        throw new Error("Invalid github url")
    }
    
    const { data } = await octokit.rest.repos.listCommits({
        owner,
        repo
    });

    // console.log(data.commit)
    
    const sortedCommits = data.sort((a: any, b: any) => {
        const dateA = new Date(a.commit.author.date);
        const dateB = new Date(b.commit.author.date);
        return dateB.getTime() - dateA.getTime();
    }) as any[];

    return sortedCommits.slice(0, 15).map((commit: any) => ({
        commitHash: commit.sha as string,
        commitMessage: commit.commit.message ?? "" as string,
        commitAuthorName: commit.commit?.author?.name ?? "" as string,
        commitAuthorAvatar: commit?.author?.avatar_url ?? "" as string,
        commitDate: commit.commit?.author?.date ?? "" as string
    }))
}

export const pollCommits = async (projectId: string) => {
    const { project, githubUrl } = await fetchProjectGithubUrl(projectId)
    const commitHashes = await getCommitHashes(githubUrl)
    const unprocessedCommits = await filterUnprocessedCommits(projectId, commitHashes)
    const summaryResponses = await Promise.allSettled(unprocessedCommits.map(commit => {
        return summariseCommit(githubUrl, commit.commitHash)
    }))
    const summaries = summaryResponses.map((response) => {
        if (response.status === 'fulfilled') {
            return response.value as string
        }
        return ""
    })

    const commits = await db.commit.createMany({
        data: summaries.map((summary, index) =>{
            return {
                projectId: projectId,
                commitHash: unprocessedCommits[index]!.commitHash,
                commitMessage: unprocessedCommits[index]!.commitMessage,
                commitAuthorName: unprocessedCommits[index]!.commitAuthorName,
                commitAuthorAvatar: unprocessedCommits[index]!.commitAuthorAvatar,
                commitDate: unprocessedCommits[index]!.commitDate,
                summary
            }
        })
    })
    return commits
}


async function summariseCommit(githubUrl:string, commitHash: string) {
    //get the diff, then pass it to the ai model
    const { data } = await axios.get(`${githubUrl}/commit/${commitHash}.diff`, {
        headers: {
            Accept: 'application/vnd.github.v3.diff'
        }
    })
    return await aiSummariseCommit(data) || "";
}

async function fetchProjectGithubUrl(projectId: string) {
    const project = await db.project.findUnique({
        where: {id: projectId},
        select: {
            githubUrl: true
        }
    })

    if(!project?.githubUrl) {
        throw new Error("Project has no github url")
    }

    return {
        project,
        githubUrl: project.githubUrl
    }
}

async function filterUnprocessedCommits(projectId: string, commitHashes: Response[]) {
    const processedCommits = await db.commit.findMany({
        where: {projectId}
    })

    const unprocessedCommits = commitHashes.filter(commit => !processedCommits.some((processedCommit: any) => processedCommit.commitHash === commit.commitHash))
    return unprocessedCommits
}