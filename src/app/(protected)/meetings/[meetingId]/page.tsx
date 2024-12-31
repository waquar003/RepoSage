import { Suspense } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import IssuesList from "./issues-list"

type Props = {
    params: Promise<{ meetingId: string }>
}

const MeetingDetailsPage = async ({ params }: Props) => {
    const { meetingId } = await params

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Meeting Details</h1>
                <p className="mt-2 text-muted-foreground">
                    View and manage issues from your meeting.
                </p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Issues</CardTitle>
                </CardHeader>
                <CardContent>
                    <Suspense fallback={<IssuesListSkeleton />}>
                        <IssuesList meetingId={meetingId} />
                    </Suspense>
                </CardContent>
            </Card>
        </div>
    )
}

const IssuesListSkeleton = () => (
    <div className="space-y-4">
        {[...Array(3)].map((_, index) => (
            <Skeleton key={index} className="h-24 w-full" />
        ))}
    </div>
)

export default MeetingDetailsPage

