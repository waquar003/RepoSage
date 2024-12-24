import { GithubRepoLoader } from "@langchain/community/document_loaders/web/github";
import { Document } from "@langchain/core/documents";
import { generateEmbedding, summariseCode } from "./gemini";
import { db } from "@/server/db";
import { Octokit } from "octokit";
import { Prisma } from "@prisma/client";

// Batch size for database operations
const DB_BATCH_SIZE = 10;

// Retry database operations
const retryDbOperation = async <T>(
    operation: () => Promise<T>,
    maxRetries: number = 3
): Promise<T> => {
    let lastError;
    
    for (let attempt = 0; attempt < maxRetries; attempt++) {
        try {
            return await operation();
        } catch (error: any) {
            lastError = error;
            
            // Check if it's a connection error
            const isConnectionError = 
                error instanceof Prisma.PrismaClientKnownRequestError &&
                (error.code === 'P1001' || error.code === 'P1002') ||
                error.message?.includes('terminating connection');

            if (isConnectionError) {
                console.log(`Database connection lost, attempt ${attempt + 1}/${maxRetries} to reconnect...`);
                await db.$disconnect();
                await new Promise(resolve => setTimeout(resolve, 5000)); // Wait 5s before reconnecting
                await db.$connect();
            } else {
                throw error; // If it's not a connection error, throw immediately
            }
        }
    }
    
    throw lastError;
};

// Retry mechanism with exponential backoff
const retryWithBackoff = async <T>(
    fn: () => Promise<T>,
    maxRetries: number = 3,
    initialDelay: number = 2000,
    context: string = ''
): Promise<T> => {
    let retries = 0;
    while (true) {
        try {
            return await fn();
        } catch (error: any) {
            if (retries >= maxRetries) {
                console.error(`${context} failed after ${maxRetries} retries:`, error);
                throw error;
            }
            
            // Handle rate limits specifically
            const delay = error.status === 429 ? 
                60000 : // 1 minute for rate limits
                initialDelay * Math.pow(2, retries);
            
            console.log(`${context}: Attempt ${retries + 1} failed, retrying in ${delay}ms`);
            await new Promise(resolve => setTimeout(resolve, delay));
            retries++;
        }
    }
};

const getDefaultBranch = async (githubUrl: string, githubToken?: string): Promise<string> => {
    // if (!githubToken) {
    //     throw new Error("GitHub token is required to avoid rate limiting");
    // }

    const [owner, repo] = githubUrl.replace('https://github.com/', '').split('/');
    const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
    
    return await retryWithBackoff(
        async () => {
            const { data } = await octokit.rest.repos.get({ owner: owner!, repo: repo! });
            return data.default_branch;
        },
        3,
        2000,
        'GitHub branch fetch'
    );
};

export const loadGithubRepo = async (githubUrl: string, githubToken?: string) => {
    // if (!githubToken) {
    //     throw new Error("GitHub token is required to avoid rate limiting");
    // }

    const branch = await getDefaultBranch(githubUrl, githubToken);
    const loader = new GithubRepoLoader(githubUrl, {
        accessToken: githubToken,
        branch,
        ignoreFiles: [
            '**/node_modules/**/*', 
            '**/dist/**/*', 
            'package-lock.json', 
            'yarn-lock', 
            'pnpm-lock.yaml', 
            'bun.lockb',
            '**/.*', // Ignore hidden files
            '**/*.md', // Ignore markdown
            '**/*.test.*', // Ignore test files
        ],
        recursive: true,
        unknown: 'warn',
        maxConcurrency: 1, // Process one at a time to avoid rate limits
    });

    return await retryWithBackoff(
        () => loader.load(),
        3,
        5000,
        'GitHub repo load'
    );
};

export const indexGithubRepo = async (projectId: string, githubUrl: string, githubToken?: string) => {
    console.log("Starting GitHub Repo Indexing");
    
    try {
        // Load repository files
        const docs = await loadGithubRepo(githubUrl, githubToken);
        console.log(`Loaded ${docs.length} files from repository`);
        
        // Process files in batches
        let processedCount = 0;
        const failedFiles: string[] = [];
        
        // Process docs in smaller chunks
        for (let i = 0; i < docs.length; i += DB_BATCH_SIZE) {
            const batch = docs.slice(i, i + DB_BATCH_SIZE);
            
            try {
                // Generate embeddings for the batch
                const batchEmbeddings = await batchProcess(batch);
                
                // Use a transaction for each batch
                await retryDbOperation(async () => {
                    await db.$transaction(async (tx) => {
                        for (const embedding of batchEmbeddings) {
                            if (!embedding) continue;
                            
                            // Create the embedding record
                            const sourceCodeEmbedding = await tx.sourceCodeEmbedding.create({
                                data: {
                                    projectId,
                                    sourceCode: embedding.sourceCode,
                                    fileName: embedding.fileName,
                                    summary: embedding.summary,
                                }
                            });

                            // Update with vector data
                            await tx.$executeRaw`
                                UPDATE "SourceCodeEmbedding"
                                SET "summaryEmbedding" = ${embedding.embedding}::vector
                                WHERE "id" = ${sourceCodeEmbedding.id};
                            `;
                            
                            processedCount++;
                            console.log(`Processed ${processedCount}/${docs.length}: ${embedding.fileName}`);
                        }
                    });
                });
                
                // Add delay between batches to prevent overload
                await new Promise(resolve => setTimeout(resolve, 2000));
                
            } catch (error) {
                console.error(`Failed to process batch starting at index ${i}:`, error);
                batch.forEach(doc => failedFiles.push(doc.metadata.source));
                
                // Continue with next batch instead of failing entirely
                continue;
            }
        }
        
        return {
            success: true,
            processed: processedCount,
            total: docs.length,
            failed: failedFiles
        };
        
    } catch (error: any) {
        console.error("Failed to index repository:", error);
        throw new Error(`Repository indexing failed: ${error.message}`);
    }
};

const generateEmbeddings = async (doc: Document) => {
    return await retryWithBackoff(async () => {
        const summary = await summariseCode(doc);
        // Add delay between Gemini API calls
        await new Promise(resolve => setTimeout(resolve, 2000));
        const embedding = await generateEmbedding(summary);
        return {
            summary,
            embedding,
            sourceCode: JSON.parse(JSON.stringify(doc.pageContent)),
            fileName: doc.metadata.source
        };
    }, 3, 5000, 'Gemini API call');
};

const batchProcess = async (docs: Document[], batchSize = 1) => {
    const results = [];
    for (let i = 0; i < docs.length; i += batchSize) {
        const batch = docs.slice(i, i + batchSize);
        try {
            // Process one document at a time
            const batchResults = await Promise.all(
                batch.map(doc => generateEmbeddings(doc))
            );
            results.push(...batchResults);
            // Wait 15 seconds between batches to avoid rate limits
            await new Promise(resolve => setTimeout(resolve, 15000));
        } catch (error) {
            console.error(`Failed to process batch at index ${i}:`, error);
        }
    }
    return results;
};