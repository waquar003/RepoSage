"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";

type FormInput ={
    projectName: string,
    repoUrl: string,
    githubToken?: string,
}

const CreatePage = () => {
    const { register, handleSubmit, reset } = useForm<FormInput>();
    return (
        <div className="flex items-center gap-12 h-full justify-center">
            <img src="/PicWithComputerandgithubback" alt="Picture" className="h-56 w-auto"/>
            <div>
                <div>
                    <h1 className="text-2xl font-semibold">
                        Link your GitHub Repository
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Enter the URL of your GitHub repository to link it to RepoSage
                    </p>
                </div>
                <div className="h-4"></div>
                <div>
                    <form onSubmit={handleSubmit((data) => console.log(data))}>
                        <Input
                            {...register("projectName", {required: true})}
                            placeholder="Project Name"
                            required
                        />
                        <div className="h-2"></div>
                        <Input
                            {...register("repoUrl", {required: true})}
                            placeholder="GitHub Repository URL"
                            type="url"
                            required
                        />
                        <div className="h-2"></div>
                        <Input
                            {...register("githubToken")}
                            placeholder="GitHub Token (Optional For Private Repositories)"
                        />
                        <div className="h-4"></div>
                        <Button>
                            Create Project
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreatePage;