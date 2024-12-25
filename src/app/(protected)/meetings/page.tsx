"use client"

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import MeetingCard from "../dashboard/meeting-card";
import { api } from "@/trpc/react";
import useProject from "@/hooks/use-project";

const MeetingsPage = () => {
    const { project } = useProject();
    const { data: meetings, isLoading } = api.project.getMeetings.useQuery({ projectId: project?.id! }, {
        refetchInterval: 5000
    })
    return (
        <>
            <MeetingCard />
            <div className="h-6"></div>
            <h1 className="text-xl font-semibold">Meetings</h1>
            {meetings && meetings.length === 0 && <div>No Meetings Found</div>}
            {isLoading && <div>Loading...</div>}
            <ul className="divide-y divide-gray-200">
                {meetings?.map(meeting => (
                    <li key={meeting.id} className="flex items-center justify-between py-5 gap-x-6">
                        <div>
                            <div className="min-w-0">
                                <div className="flex items-center gap-2">
                                    <Link href={`/meetings/${meeting.id}`} target="_blank" className="text-sm font-semibold text-gray-900">
                                        {meeting.name}
                                    </Link>
                                {meeting.status === 'PROCESSING' && (
                                    <Badge className="bg-yellow-500 text-white">
                                        Processing...
                                    </Badge>
                                )}
                                </div>
                            </div>

                            <div className="flex items-center text-xs text-gray-500 gap-x-2">
                                <p className="whitespace-nowrap">
                                    {meeting.createdAt.toLocaleString()}
                                </p>
                                <p className="truncate">{meeting.issues.length} issues</p>
                            </div>
                        </div>

                        <div className="flex items-center flex-none gap-x-4">
                            <Link href={`/meetings/${meeting.id}`} target="_blank">
                                <Button variant="outline">
                                    View Meeting
                                </Button>
                            </Link>
                        </div>
                    </li>
                ))}
            </ul>
        </>
    )
}

export default MeetingsPage