import { Controller, Post, Body, Param, HttpCode } from '@nestjs/common';
import { MeetingsService } from './meetings.service';

@Controller('meetings')
export class MeetingsController {
    constructor(private readonly meetingsService: MeetingsService) {}

    @Post()
    async createMeeting(
        @Body('projectId') projectId: string,
        @Body('name') name: string,
        @Body('audioUrl') audioUrl: string,
    ) {
        return this.meetingsService.processNewMeeting(projectId, name, audioUrl);
    }

    @Post('webhook/meeting/:meetingId')
    @HttpCode(200)
    async handleTranscriptionWebhook(
        @Param('meetingId') meetingId: string,
        @Body() payload: { transcript_id: string; status: 'completed' | 'error' },
    ) {
        return this.meetingsService.handleTranscriptionComplete(meetingId, payload);
    }
}
