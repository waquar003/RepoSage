import { Controller, Post, Body, Param, HttpCode, UseGuards } from '@nestjs/common';
import { MeetingsService } from './meetings.service';
import { ResponseMessage } from 'src/common/decorators/response-message.decorator';
import { AuthGuard } from 'src/common/guards/auth.guard';

@Controller('meetings')
export class MeetingsController {
    constructor(private readonly meetingsService: MeetingsService) {}

    @Post()
    @UseGuards(AuthGuard)
    @HttpCode(201)
    @ResponseMessage('Meeting received and queued for processing')
    async createMeeting(
        @Body('projectId') projectId: string,
        @Body('name') name: string,
        @Body('audioUrl') audioUrl: string,
    ): Promise<unknown> {
        return this.meetingsService.processNewMeeting(projectId, name, audioUrl);
    }

    @Post('webhook/meeting/:meetingId')
    @HttpCode(200)
    @ResponseMessage('Transcription status updated')
    async handleTranscriptionWebhook(
        @Param('meetingId') meetingId: string,
        @Body() payload: { transcript_id: string; status: 'completed' | 'error' },
    ) {
        return this.meetingsService.handleTranscriptionComplete(meetingId, payload);
    }
}
