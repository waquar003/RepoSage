import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class EncryptionService {
    private readonly algorithm = 'aes-256-gcm';
    private readonly key = Buffer.from(process.env.ENCRYPTION_KEY!, 'hex');

    encrypt(text: string): { encryptedData: string; iv: string } {
        const iv = crypto.randomBytes(12);
        const cipher = crypto.createCipheriv(this.algorithm, this.key, iv);
        let encrypted = cipher.update(text, 'utf8', 'hex');
        encrypted += cipher.final('hex');

        const authTag = cipher.getAuthTag().toString('hex');
        return {
            encryptedData: encrypted + authTag,
            iv: iv.toString('hex'),
        };
    }

    decrypt(encryptedData: string, iv: string): string {
        const authTag = encryptedData.slice(-32);
        const data = encryptedData.slice(0, -32);
        const decipher = crypto.createDecipheriv(this.algorithm, this.key, Buffer.from(iv, 'hex'));
        decipher.setAuthTag(Buffer.from(authTag, 'hex'));
        let decrypted = decipher.update(data, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
    }
}
