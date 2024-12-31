"use client";

import useProject from "@/hooks/use-project";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/react";
import { ExternalLink } from 'lucide-react';
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const CommitLog = () => {
    const { projectId, project } = useProject();
    const { data: commits } = api.project.getCommits.useQuery({ projectId: projectId! });

    if (!commits || commits.length === 0) {
        return <div className="text-center text-muted-foreground">No commits found.</div>;
    }

    return (
        <ul className="space-y-6">
            {commits.map((commit, commitIdx) => (
                <li key={commit.id} className="flex gap-x-4 relative">
                    <div className={cn(
                        commitIdx === commits.length - 1 ? "h-6" : "-bottom-6",
                        "absolute left-0 top-0 flex w-6 justify-center"
                    )}>
                        <div className="w-px bg-border"></div>
                    </div>
                    <div className="relative mt-3">
                        <Avatar className="h-8 w-8">
                            <AvatarImage src={commit.commitAuthorAvatar} alt={commit.commitAuthorName} />
                            <AvatarFallback>{commit.commitAuthorName[0]}</AvatarFallback>
                        </Avatar>
                    </div>
                    <div className="flex-1 rounded-lg bg-card p-4 shadow">
                        <div className="flex justify-between gap-x-4">
                            <Link 
                                href={`${project?.githubUrl}/commit/${commit.commitHash}`}
                                target="_blank"
                                className="text-sm text-muted-foreground hover:text-primary"
                            >
                                <span className="font-medium text-foreground">
                                    {commit.commitAuthorName}
                                </span>{" "}
                                committed
                                <ExternalLink className="ml-1 inline-block h-3 w-3" />
                            </Link>
                        </div>
                        <p className="mt-1 text-sm font-semibold">{commit.commitMessage}</p>
                        <pre className="mt-2 whitespace-pre-wrap text-sm text-muted-foreground">
                            {commit.summary}
                        </pre>
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default CommitLog;

