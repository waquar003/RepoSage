import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { AssemblyAI } from 'assemblyai';

@Injectable()
export class TranscriptionService {
    private client = new AssemblyAI({ apiKey: process.env.ASSEMBLYAI_API_KEY! });

    async submitTranscriptionJob(url: string, webhookUrl: string) {
        try {
            const transcript = await this.client.transcripts.submit({
                audio: url,
                webhook_url: webhookUrl,

                auto_chapters: true,
                speaker_labels: true,
                summarization: true,
                summary_model: 'informative',
                summary_type: 'bullets',
                entity_detection: true,
            });

            return {
                transcriptId: transcript.id,
                status: transcript.status,
            };
        } catch (error) {
            console.error('AssemblyAI transcription job submission failed: ', error);
            throw new InternalServerErrorException(
                'Failed to submit to transcription service provider',
            );
        }
    }
}
