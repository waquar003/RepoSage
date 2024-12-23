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

const AskQuestionCard = () => {
    const { project }   = useProject();
    const [question, setQuestion] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [filesReferences, setFilesReferences] = React.useState<{ fileName: string, sourceCode: string, summary: string }[]>([])
    const [answer, setAnswer] = React.useState('')
    const saveAnswer = api.project.saveAnswer.useMutation()
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        setAnswer('')
        setFilesReferences([])
        e.preventDefault()
        if(!project?.id)    return
        setLoading(true)
        
        const { output, fileReferences } = await askQuestion(question, project.id)
        setOpen(true);
        setFilesReferences(fileReferences)

        for await (const chunk of readStreamableValue(output)) {
            if(chunk) {
                setAnswer(ans => ans + chunk)
            }
        }
        setLoading(false)
    }

    return (
        <>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-[80vw]">
                    <DialogHeader>
                        <div className="flex items-center gap-2">
                            <DialogTitle>
                                <Image src='/reposage-logo-v2.svg' alt="RepoSage" width={40} height={40} />
                            </DialogTitle>
                            <Button disabled={saveAnswer.isPending} variant={'outline'} onClick={() => {
                                saveAnswer.mutate({
                                    projectId: project!.id, 
                                    question,
                                    answer,
                                    filesReferences
                                }, {
                                    onSuccess: () => {
                                        toast.success('Answer Saved!')
                                    },
                                    onError: () => {
                                        toast.error('Failed to Save Answer!')
                                    },
                                })
                            }}>
                                Save Answer
                            </Button>
                        </div>
                    </DialogHeader>
                    
                    <MDEditor.Markdown source={answer} className="max-w-[70vw] !h-full max-h-[40vh] overflow-scroll"/>
                    <div className="h-4"></div>
                    <CodeReferences filesReferences={filesReferences} />
                    
                    <Button type="button" onClick={() => {setOpen(false)}}>
                        Close
                    </Button>

                    <h1>Files References</h1>
                    {filesReferences.map((file: { fileName: string }) => <span>{file.fileName}</span>)}
                </DialogContent>
            </Dialog>
            
            <Card className="relative col-span-3">
                <CardHeader>
                    <CardTitle>Ask a question</CardTitle>
                    <CardDescription>Ask a question about the project</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <Textarea placeholder="Which file should I edit to change the home page?" value={question} onChange={e => setQuestion(e.target.value)}/>
                        <div className="h-4"></div>
                        <Button type="submit" disabled={loading}>
                            Ask RepoSage
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </>
    )
}

export default AskQuestionCard