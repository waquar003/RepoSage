import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';
@Injectable()
export class EncryptionService {
    private readonly algorithm = 'aes-256-gcm';
    private readonly secretKey: Buffer;

    constructor(private readonly configService: ConfigService) {
        this.secretKey = Buffer.from(
            this.configService.getOrThrow<string>('ENCRYPTION_SECRET'),
            'hex',
        );
    }

    encrypt(text: string): { iv: string; encryptedData: string } {
        const iv = crypto.randomBytes(16);
        const cipher = crypto.createCipheriv(this.algorithm, this.secretKey, iv);

        let encrypted = cipher.update(text, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        const authTag = cipher.getAuthTag();

        return {
            iv: iv.toString('hex'),
            encryptedData: encrypted + authTag.toString('hex'),
        };
    }

    decrypt(encryptedData: string, iv: string): string {
        const ivBuffer = Buffer.from(iv, 'hex');
        const authTag = Buffer.from(encryptedData.slice(-32), 'hex');
        const data = encryptedData.slice(0, -32);

        const decipher = crypto.createDecipheriv(this.algorithm, this.secretKey, ivBuffer);
        decipher.setAuthTag(authTag);

        let decrypted = decipher.update(data, 'hex', 'utf-8');
        decrypted += decipher.final('utf-8');
        return decrypted;
    }
}
