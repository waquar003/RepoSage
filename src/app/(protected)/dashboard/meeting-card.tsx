"use client"
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { uploadFile } from "@/lib/cloudinary";
import React from "react";
import { useDropzone } from 'react-dropzone';
import { Upload, Presentation } from 'lucide-react';
import { toast } from 'sonner';
import useProject from '@/hooks/use-project';
import { useRouter } from 'next/navigation';
import { api } from '@/trpc/react';

const MeetingCard = () => {
    const router = useRouter();
    const { project } = useProject();
    const [isUploading, setIsUploading] = React.useState(false);
    const [progress, setProgress] = React.useState(0);
    
    const uploadMeeting = api.project.uploadMeeting.useMutation();
    const getSignature = api.cloudinary.getSignature.useMutation();

    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            'audio/*': ['.mp3', '.wav', '.m4a']
        },
        multiple: false,
        maxSize: 50_000_000,
        onDrop: async (acceptedFiles) => {
            try {
                setIsUploading(true);
                const file = acceptedFiles[0];
                if (!file) return;

                // Get signature first
                const { signature, timestamp } = await getSignature.mutateAsync();
                
                // Upload file with signature
                const downloadURL = await uploadFile(
                    file,
                    signature,
                    timestamp,
                    setProgress
                );

                // Upload meeting details
                await uploadMeeting.mutateAsync({
                    projectId: project?.id!,
                    meetingUrl: downloadURL,
                    name: file.name
                });

                toast.success('Meeting uploaded successfully');
                router.push('/meetings');
            } catch (error) {
                console.error('Upload error:', error);
                toast.error('Failed to upload meeting');
            } finally {
                setIsUploading(false);
            }
        }
    });

    return (
        <Card className="col-span-2 flex flex-col items-center justify-center p-10" {...getRootProps()}>
            {!isUploading && (
                <>
                    <Presentation className="h-10 w-10 animate-bounce" />
                    <h3 className="mt-2 text-sm font-semibold text-gray-900">
                        Create a new Meeting
                    </h3>
                    <p className="mt-1 text-center text-sm text-gray-500">
                        Analyse your meeting with RepoSage.
                        <br />
                        Powered by AI.
                    </p>
                    <div className="mt-6">
                        <Button disabled={isUploading}>
                            <Upload className="ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
                            Upload Meeting
                            <input className="hidden" {...getInputProps()} />
                        </Button>
                    </div>
                </>
            )}
            {isUploading && (
                <div className="">
                    <CircularProgressbar 
                        value={progress} 
                        text={`${progress}%`} 
                        className="size-20"
                        styles={buildStyles({
                            pathColor: '#2e7d32',
                            textColor: '#2e7d32',
                            trailColor: '#d9d9d9'
                        })}
                    />
                    <p className="text-sm text-gray-500 text-center">
                        Uploading your meeting...
                    </p>
                </div>
            )}
        </Card>
    );
};

export default MeetingCard;