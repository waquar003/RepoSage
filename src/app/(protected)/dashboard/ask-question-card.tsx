"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import useProject from "@/hooks/use-project";
import React from "react";
import Image from "next/image";
import { askQuestion } from "./actions";
import { readStreamableValue } from "ai/rsc";
import MDEditor from "@uiw/react-md-editor";
import CodeReferences from "./code-references";
import { api } from "@/trpc/react";
import { toast } from "sonner";
import useRefetch from "@/hooks/use-refetch";
import { MessageSquareText, Save, X, FileCode, Loader2 } from 'lucide-react';
import { ScrollArea } from "@/components/ui/scroll-area";

const AskQuestionCard = () => {
    const { project } = useProject();
    const [question, setQuestion] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [filesReferences, setFilesReferences] = React.useState<{ fileName: string, sourceCode: string, summary: string }[]>([]);
    const [answer, setAnswer] = React.useState('');
    const saveAnswer = api.project.saveAnswer.useMutation();
    const refetch = useRefetch();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        setAnswer('');
        setFilesReferences([]);
        e.preventDefault();
        if (!project?.id) return;
        setLoading(true);

        const { output, fileReferences } = await askQuestion(question, project.id);
        setOpen(true);
        setFilesReferences(fileReferences);
        for await (const chunk of readStreamableValue(output)) {
            if (chunk) {
                setAnswer(ans => ans + chunk);
            }
        }
        setLoading(false);
    }

    return (
        <>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-[800px]">
                    <DialogHeader className="border-b pb-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <Image src='/reposage-logo-v2.svg' alt="RepoSage" width={40} height={40} />
                                <DialogTitle className="text-xl font-bold">{question}</DialogTitle>
                            </div>
                            <div className="flex items-center gap-2">
                                <Button 
                                    disabled={saveAnswer.isPending} 
                                    variant="outline" 
                                    onClick={() => {
                                        saveAnswer.mutate({
                                            projectId: project!.id,
                                            question,
                                            answer,
                                            filesReferences
                                        }, {
                                            onSuccess: () => {
                                                toast.success('Answer Saved!');
                                                refetch();
                                            },
                                            onError: () => {
                                                toast.error('Failed to Save Answer!');
                                            },
                                        })
                                    }}
                                >
                                    <Save className="mr-2 h-4 w-4" />
                                    Save Answer
                                </Button>
                                <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </DialogHeader>

                    <ScrollArea className="max-h-[60vh] pr-4">
                        <div className="space-y-6">
                            <div className="prose dark:prose-invert max-w-none">
                                <MDEditor.Markdown source={answer} />
                            </div>
                            
                            {filesReferences.length > 0 && (
                                <div className="space-y-4">
                                    <h2 className="text-lg font-semibold flex items-center gap-2">
                                        <FileCode className="h-5 w-5" />
                                        Code References
                                    </h2>
                                    <CodeReferences filesReferences={filesReferences} />
                                </div>
                            )}
                        </div>
                    </ScrollArea>
                </DialogContent>
            </Dialog>

            <Card className="relative col-span-3">
                <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                    <CardTitle className="flex items-center text-lg font-semibold">
                        <MessageSquareText className="mr-2 h-5 w-5" />
                        Ask RepoSage
                    </CardTitle>
                    <CardDescription className="text-white/80">
                        Get instant answers about your project's codebase
                    </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                    <form onSubmit={handleSubmit}>
                        <Textarea 
                            placeholder="Ask anything about your project (e.g., 'Which file should I edit to change the home page?')"
                            value={question} 
                            onChange={e => setQuestion(e.target.value)}
                            className="min-h-[100px] resize-none"
                        />
                        <div className="h-4" />
                        <Button 
                            type="submit" 
                            disabled={loading || !question.trim()} 
                            className="w-full sm:w-auto"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Thinking...
                                </>
                            ) : (
                                <>
                                    <MessageSquareText className="mr-2 h-4 w-4" />
                                    Ask RepoSage
                                </>
                            )}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </>
    )
}

export default AskQuestionCard