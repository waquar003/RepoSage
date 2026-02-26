import { processMeeting } from "@/lib/assembly";
import { db } from "@/server/db";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const bodyParser = z.object({
    meetingUrl: z.string(),
    projectId: z.string(),
    meetingId: z.string()
})

export const maxDuration = 300

export async function POST(req: NextRequest) {
    const { userId } = await auth();
    if(!userId) {
        return NextResponse.json({error: "Unauthorized! User not found"}, {status: 401});
    }

    try {
        const body = await req.json();
        const { meetingUrl, projectId, meetingId } = bodyParser.parse(body);

        if(!meetingUrl || !projectId || !meetingId) {
            return NextResponse.json({error: "Server Error"}, {status: 500});
        }

        const { transcript, summaries } = await processMeeting(meetingUrl);

        await db.issue.createMany({
            data: summaries.map((summary) => ({
                meetingId,
                summary: summary.sumary,
                start: summary.start,
                end: summary.end,
                gist: summary.gist,
                headline: summary.headline,
            }))
        })
        await db.meeting.update({
            where: {
                id: meetingId
            },
            data: {
                name: transcript.text!,
                status: "COMPLETED"
            }
        })
        return NextResponse.json({success: "Meeting processed successfully"}, {status: 200});

    } catch (error) {
        return NextResponse.json({error: "Failed to process meeting | Internal Server Error"}, {status: 500});
    }
}