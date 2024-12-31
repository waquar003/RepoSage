"use client"

import React from "react"
import { useDropzone } from 'react-dropzone'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { toast } from 'sonner'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import { Upload, Presentation, FileAudio } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { uploadFile } from "@/lib/cloudinary"
import useProject from '@/hooks/use-project'
import { api } from '@/trpc/react'

const MeetingCard = () => {
    const router = useRouter()
    const { project } = useProject()
    const [isUploading, setIsUploading] = React.useState(false)
    const [progress, setProgress] = React.useState(0)
    
    const uploadMeeting = api.project.uploadMeeting.useMutation()
    const getSignature = api.cloudinary.getSignature.useMutation()

    const processMeeting = useMutation({
        mutationFn: async (data: {meetingUrl: string, meetingId: string, projectId: string}) => {
            const { meetingUrl, meetingId, projectId } = data
            const response = await axios.post('/api/process-meeting', {
                meetingUrl,
                meetingId,
                projectId
            })
            return response.data
        }
    })

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: {
            'audio/*': ['.mp3', '.wav', '.m4a']
        },
        multiple: false,
        maxSize: 50_000_000,
        onDrop: async (acceptedFiles) => {
            try {
                setIsUploading(true)
                const file = acceptedFiles[0]
                if (!file) return

                const { signature, timestamp } = await getSignature.mutateAsync()
                const downloadURL = await uploadFile(file, signature, timestamp, setProgress)

                const meeting = await uploadMeeting.mutateAsync({
                    projectId: project?.id!,
                    meetingUrl: downloadURL,
                    name: file.name
                })

                toast.success('Meeting uploaded successfully')
                router.push('/meetings')

                processMeeting.mutateAsync({
                    meetingUrl: downloadURL,
                    meetingId: meeting.id!,
                    projectId: project?.id!
                })
            } catch (error) {
                console.error('Upload error:', error)
                toast.error('Failed to upload meeting')
            } finally {
                setIsUploading(false)
            }
        }
    })

    return (
        <Card className="col-span-2 overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                <CardTitle className="flex items-center text-lg font-semibold">
                    <Presentation className="mr-2 h-5 w-5" />
                    Create a New Meeting
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div
                    {...getRootProps()}
                    className={`mt-4 flex h-48 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 transition-colors ${
                        isDragActive ? 'border-primary bg-primary/10' : 'border-gray-300'
                    }`}
                >
                    <input {...getInputProps()} />
                    {!isUploading && (
                        <>
                            <FileAudio className="mb-2 h-10 w-10 text-gray-400" />
                            <p className="mb-2 text-sm font-medium text-gray-900">
                                {isDragActive ? 'Drop the audio file here' : 'Drag & drop an audio file here'}
                            </p>
                            <p className="text-xs text-gray-500">MP3, WAV, or M4A (max. 50MB)</p>
                            <Button className="mt-4" size="sm">
                                <Upload className="mr-2 h-4 w-4" />
                                Select File
                            </Button>
                        </>
                    )}
                    {isUploading && (
                        <div className="flex flex-col items-center">
                            <CircularProgressbar
                                value={progress}
                                text={`${progress}%`}
                                className="h-20 w-20"
                                styles={buildStyles({
                                    pathColor: '#3b82f6',
                                    textColor: '#3b82f6',
                                    trailColor: '#e2e8f0'
                                })}
                            />
                            <p className="mt-2 text-sm font-medium text-gray-900">Uploading your meeting...</p>
                        </div>
                    )}
                </div>
                <p className="mt-4 text-center text-xs text-gray-500">
                    Analyse your meeting with RepoSage. Powered by AI.
                </p>
            </CardContent>
        </Card>
    )
}

export default MeetingCard

