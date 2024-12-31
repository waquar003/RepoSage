"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { Info, Github, Loader2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import useRefetch from "@/hooks/use-refetch"
import { api } from "@/trpc/react"
import Image from "next/image"

type FormInput = {
    projectName: string
    repoUrl: string
    githubToken?: string
}

const CreatePage = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<FormInput>()
    const createProject = api.project.createProject.useMutation()
    const checkCredits = api.project.checkCredits.useMutation()
    const refetch = useRefetch()
    const [isChecking, setIsChecking] = useState(false)

    const onSubmit = async (data: FormInput) => {
        if (checkCredits.data) {
            createProject.mutate({
                githubUrl: data.repoUrl,
                name: data.projectName,
                githubToken: data.githubToken
            }, {
                onSuccess: () => {
                    toast.success('Project Created Successfully')
                    refetch()
                    reset()
                },
                onError: () => {
                    toast.error('Failed to Create Project')
                }
            })
        } else {
            setIsChecking(true)
            try {
                await checkCredits.mutateAsync({
                    githubUrl: data.repoUrl,
                    githubToken: data.githubToken
                })
            } finally {
                setIsChecking(false)
            }
        }
    }

    const hasEnoughCredits = checkCredits.data?.userCredits ? checkCredits.data.fileCount <= checkCredits.data.userCredits : true

    return (
        <div className="container mx-auto py-12">
            <div className="flex items-center justify-between gap-12">
                <div className="w-1/2">
                    <Image
                        src="/repo-creation.svg"
                        alt="Repository Creation Illustration"
                        width={200}
                        height={200}
                        className="w-full h-auto"
                    />
                </div>
                <Card className="w-1/2">
                    <CardHeader>
                        <CardTitle className="text-2xl">Link your GitHub Repository</CardTitle>
                        <CardDescription>Enter the details of your GitHub repository to link it to RepoSage</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <div>
                                <Input
                                    {...register("projectName", { required: "Project name is required" })}
                                    placeholder="Project Name"
                                />
                                {errors.projectName && (
                                    <p className="mt-1 text-sm text-red-500">{errors.projectName.message}</p>
                                )}
                            </div>
                            <div>
                                <Input
                                    {...register("repoUrl", { 
                                        required: "Repository URL is required",
                                        pattern: {
                                            value: /^https?:\/\/github\.com\/[\w-]+\/[\w.-]+$/,
                                            message: "Please enter a valid GitHub repository URL"
                                        }
                                    })}
                                    placeholder="GitHub Repository URL"
                                    type="url"
                                />
                                {errors.repoUrl && (
                                    <p className="mt-1 text-sm text-red-500">{errors.repoUrl.message}</p>
                                )}
                            </div>
                            <div>
                                <Input
                                    {...register("githubToken")}
                                    placeholder="GitHub Token (Optional for private repositories)"
                                    type="password"
                                />
                            </div>

                            {checkCredits.data && (
                                <Alert variant={hasEnoughCredits ? "default" : "destructive"}>
                                    <Info className="h-4 w-4" />
                                    <AlertTitle>Credit Information</AlertTitle>
                                    <AlertDescription>
                                        You will be charged <strong>{checkCredits.data.fileCount}</strong> credits for this repository.
                                        You have <strong>{checkCredits.data.userCredits}</strong> credits left.
                                    </AlertDescription>
                                </Alert>
                            )}
                        </form>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <div className="flex items-center text-sm text-muted-foreground">
                            <Github className="mr-2 h-4 w-4" />
                            Powered by GitHub
                        </div>
                        <Button 
                            type="submit" 
                            onClick={handleSubmit(onSubmit)}
                            disabled={createProject.isPending || isChecking || !hasEnoughCredits}
                        >
                            {createProject.isPending || isChecking ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    {createProject.isPending ? 'Creating Project...' : 'Checking Credits...'}
                                </>
                            ) : (
                                hasEnoughCredits ? 'Create Project' : 'Check Credits'
                            )}
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}

export default CreatePage

