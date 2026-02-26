import { GithubRepoLoader } from "@langchain/community/document_loaders/web/github";
import { Document } from "@langchain/core/documents";
import { generateEmbedding, summariseCode } from "./gemini";
import { db } from "@/server/db";
import { Octokit } from "octokit";


const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));


export const checkCredits = async (githubUrl: string, githubToken?: string) => {
    const octokit = new Octokit({ auth: githubToken || process.env.GITHUB_TOKEN });
    const [owner, repo] = githubUrl.replace('https://github.com/', '').split('/');

    if (!owner || !repo) throw new Error("Invalid GitHub URL");

    const count = await getFileCount('', octokit, owner, repo);
    return count;
};

const getFileCount = async (path: string, octokit: Octokit, owner: string, repo: string): Promise<number> => {
    const { data } = await octokit.rest.repos.getContent({ owner, repo, path });

    if (!Array.isArray(data)) return 1;

    let total = 0;
    for (const item of data) {
        if (item.type === "file") {
            total++;
        } else if (item.type === "dir") {
            await delay(1000); 
            total += await getFileCount(item.path, octokit, owner, repo);
        }
    }

    return total;
};


export const loadGithubRepo = async (githubUrl: string, githubToken?: string) => {
    const loader = new GithubRepoLoader(githubUrl, {
        accessToken: githubToken || process.env.GITHUB_TOKEN,
        branch: await getDefaultBranch(githubUrl),
        ignoreFiles: ['**/node_modules/**/*', '**/dist/**/*'],
        recursive: true,
    });

    const docs = await loader.load();
    return docs;
};

const getDefaultBranch = async (githubUrl: string, githubToken?: string): Promise<string> => {
    const [owner, repo] = githubUrl.replace('https://github.com/', '').split('/');
    const octokit = new Octokit({ auth: githubToken || process.env.GITHUB_TOKEN });

    const { data } = await octokit.rest.repos.get({ owner, repo });
    return data.default_branch;
};


export const indexGithubRepo = async (projectId: string, githubUrl: string, githubToken?: string) => {
    console.log("Indexing GitHub Repo:", githubUrl);

    const docs = await loadGithubRepo(githubUrl, githubToken);
    console.log(`Loaded ${docs.length} documents`);

    for (let i = 0; i < docs.length; i++) {
        const doc = docs[i];
        try {
            console.log(`Processing ${i + 1}/${docs.length}: ${doc.metadata.source}`);

            const summary = await summariseCode(doc);
            const embedding = await generateEmbedding(summary);

            const sourceCodeEmbedding = await db.sourceCodeEmbedding.create({
                data: {
                    projectId,
                    sourceCode: JSON.stringify(doc.pageContent),
                    fileName: doc.metadata.source,
                    summary,
                }
            });

            await db.$executeRaw`
                UPDATE "SourceCodeEmbedding" 
                SET "summaryEmbedding" = ${embedding}::vector
                WHERE "id" = ${sourceCodeEmbedding.id};
            `;

            console.log(`Indexed: ${doc.metadata.source}`);
        } catch (error) {
            console.error(`Failed to process ${doc.metadata.source}:`, error);
        }

        await delay(4000); 
    }

    console.log("Indexing complete.");
};
