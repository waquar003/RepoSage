import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { ApiKeyProvider } from '@reposage/db';
import { EncryptionService } from 'src/common/services/encryption.service';
import { PrismaService } from 'src/database/prisma/prisma.service';

@Injectable()
export class ApiKeysService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly encryptedService: EncryptionService,
    ) {}

    async saveKey(userId: string, data: { name: string; provider: ApiKeyProvider; key: string }) {
        const { iv, encryptedData } = this.encryptedService.encrypt(data.key);

        return await this.prisma.userApiKey.create({
            data: {
                name: data.name,
                provider: data.provider,
                key: encryptedData,
                iv,
                userId,
            },
        });
    }

    async findAll(userId: string) {
        return await this.prisma.userApiKey.findMany({
            where: { userId },
            select: {
                id: true,
                name: true,
                provider: true,
                createdAt: true,
            },
        });
    }

    async deleteKey(userId: string, keyId: string) {
        const key = await this.prisma.userApiKey.findUnique({
            where: { id: keyId },
        });

        if (!key) throw new NotFoundException('API Key not found');
        if (key.userId !== userId) throw new ForbiddenException();

        return await this.prisma.userApiKey.delete({
            where: { id: keyId },
        });
    }

    async getDecryptedKey(keyId: string, userId: string): Promise<string> {
        const keyRecord = await this.prisma.userApiKey.findUnique({
            where: { id: keyId },
        });

        if (!keyRecord) throw new NotFoundException('API Key not found');
        if (keyRecord.userId !== userId) throw new ForbiddenException();

        return this.encryptedService.decrypt(keyRecord.key, keyRecord.iv);
    }
}
