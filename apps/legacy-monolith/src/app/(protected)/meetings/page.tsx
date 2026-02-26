"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { api } from "@/trpc/react"
import useProject from "@/hooks/use-project"
import useRefetch from "@/hooks/use-refetch"
import { toast } from "sonner"
import { Trash, FileAudio, ExternalLink, Calendar } from 'lucide-react'
import MeetingCard from "../dashboard/meeting-card"

const MeetingsPage = () => {
    const { project } = useProject()
    const { data: meetings, isLoading } = api.project.getMeetings.useQuery({ projectId: project?.id! }, {
        refetchInterval: 5000
    })
    const deleteMeeting = api.project.deleteMeeting.useMutation()
    const refetch = useRefetch()
    const router = useRouter()
    
    const handleDeleteMeeting = async (meetingId: string) => {
        try {
            await deleteMeeting.mutateAsync({ meetingId })
            toast.success('Meeting deleted successfully')
            refetch()
        } catch (error) {
            toast.error('Failed to delete meeting')
        }
    }

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Meetings</h1>
                <p className="mt-2 text-muted-foreground">
                    Upload and manage your project meetings for AI-powered analysis.
                </p>
            </div>

            <MeetingCard />

            <Card>
                <CardHeader>
                    <CardTitle>Recent Meetings</CardTitle>
                </CardHeader>
                <CardContent>
                    {isLoading ? (
                        <div className="space-y-4">
                            {[...Array(3)].map((_, index) => (
                                <MeetingSkeleton key={index} />
                            ))}
                        </div>
                    ) : meetings && meetings.length > 0 ? (
                        <ul className="divide-y divide-gray-200">
                            {meetings.map(meeting => (
                                <li key={meeting.id} className="py-4">
                                    <div className="flex items-center justify-between">
                                        <div className="min-w-0 flex-1">
                                            <div className="flex items-center gap-2">
                                                <FileAudio className="h-5 w-5 text-blue-500" />
                                                <Link href={`/meetings/${meeting.id}`} className="text-sm font-medium text-blue-600 hover:underline">
                                                    {meeting.name}
                                                </Link>
                                                {meeting.status === 'PROCESSING' && (
                                                    <Badge variant="secondary">Processing</Badge>
                                                )}
                                            </div>
                                            <div className="mt-1 flex items-center gap-4 text-xs text-gray-500">
                                                <span className="flex items-center gap-1">
                                                    <Calendar className="h-3 w-3" />
                                                    {new Date(meeting.createdAt).toLocaleDateString()}
                                                </span>
                                                <span>{meeting.issues.length} issues</span>
                                            </div>
                                        </div>
                                        <div className="ml-4 flex flex-shrink-0 gap-2">
                                            <Button variant="outline" size="sm" asChild>
                                                <Link href={`/meetings/${meeting.id}`}>
                                                    <ExternalLink className="mr-1 h-3 w-3" />
                                                    View
                                                </Link>
                                            </Button>
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                onClick={() => handleDeleteMeeting(meeting.id)}
                                                disabled={deleteMeeting.isPending}
                                            >
                                                <Trash className="h-3 w-3" />
                                            </Button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="text-center py-8 text-muted-foreground">
                            No meetings found. Upload a meeting to get started.
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}

const MeetingSkeleton = () => (
    <div className="flex items-center justify-between py-4">
        <div className="flex items-center space-x-4">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="space-y-2">
                <Skeleton className="h-4 w-[200px]" />
                <Skeleton className="h-3 w-[150px]" />
            </div>
        </div>
        <div className="flex space-x-2">
            <Skeleton className="h-8 w-16" />
            <Skeleton className="h-8 w-8" />
        </div>
    </div>
)

export default MeetingsPage

