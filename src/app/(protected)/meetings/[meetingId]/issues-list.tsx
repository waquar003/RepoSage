"use client"

import React from "react"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Skeleton } from "@/components/ui/skeleton"
import { api, RouterOutputs } from "@/trpc/react"
import { Clock, FileText, MessageCircle } from 'lucide-react'

type Props = {
    meetingId: string
}

const IssuesList = ({ meetingId }: Props) => {
    const { data: meeting, isLoading } = api.project.getMeetingById.useQuery({ meetingId }, {
        refetchInterval: 4000
    })
    
    if (isLoading) return <IssuesListSkeleton />
    if (!meeting) return <div className="text-center py-8 text-muted-foreground">No meeting data found.</div>

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-semibold">{meeting.name}</h2>
                    <p className="text-sm text-muted-foreground">
                        Meeting on {format(new Date(meeting.createdAt), "MMMM d, yyyy")}
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                        {meeting.issues.length} issues identified
                    </span>
                </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {meeting.issues.map(issue => (
                    <IssueCard key={issue.id} issue={issue} />
                ))}
            </div>
        </div>
    )
}

function IssueCard({ issue }: { issue: NonNullable<RouterOutputs["project"]["getMeetingById"]>["issues"][number] }) {
    const [open, setOpen] = React.useState(false)

    return (
        <>
            <Card className="flex flex-col justify-between">
                <CardHeader>
                    <CardTitle className="text-lg">{issue.gist}</CardTitle>
                    <CardDescription className="line-clamp-2">{issue.headline}</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground mb-2">
                        <span className="font-medium">Time:</span> {issue.start} - {issue.end}
                    </p>
                    <p className="text-sm line-clamp-3">{issue.summary}</p>
                </CardContent>
                <CardFooter>
                    <Button variant="outline" onClick={() => setOpen(true)}>View Details</Button>
                </CardFooter>
            </Card>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>{issue.gist}</DialogTitle>
                        <DialogDescription>
                            {format(new Date(issue.createdAt), "MMMM d, yyyy")}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div>
                            <h4 className="text-sm font-medium mb-1">Headline</h4>
                            <p className="text-sm text-muted-foreground">{issue.headline}</p>
                        </div>
                        <div>
                            <h4 className="text-sm font-medium mb-1">Time</h4>
                            <p className="text-sm text-muted-foreground">{issue.start} - {issue.end}</p>
                        </div>
                        <div>
                            <h4 className="text-sm font-medium mb-1">Summary</h4>
                            <p className="text-sm text-muted-foreground">{issue.summary}</p>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}

const IssuesListSkeleton = () => (
    <div className="space-y-6">
        <Skeleton className="h-8 w-64" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, index) => (
                <Card key={index} className="flex flex-col justify-between">
                    <CardHeader>
                        <Skeleton className="h-6 w-3/4" />
                        <Skeleton className="h-4 w-full mt-2" />
                    </CardHeader>
                    <CardContent>
                        <Skeleton className="h-4 w-1/2 mb-2" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full mt-1" />
                        <Skeleton className="h-4 w-3/4 mt-1" />
                    </CardContent>
                    <CardFooter>
                        <Skeleton className="h-9 w-full" />
                    </CardFooter>
                </Card>
            ))}
        </div>
    </div>
)

export default IssuesList

