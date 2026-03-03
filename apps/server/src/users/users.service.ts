import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import type { UserJSON } from '@clerk/backend';

@Injectable()
export class UsersService {
    constructor(private readonly prisma: PrismaService) {}

    async syncUser(userData: UserJSON) {
        const primaryEmail =
            userData?.email_addresses.find(
                (email) => email.id === userData.primary_email_address_id,
            )?.email_address || userData.email_addresses?.[0]?.email_address;

        if (!primaryEmail) {
            console.error('No primary email found for user: ', userData);
            return;
        }

        await this.prisma.user.upsert({
            where: { id: userData.id },
            update: {
                firstName: userData.first_name,
                lastName: userData.last_name,
                imageUrl: userData.image_url,
                emailAddress: primaryEmail,
            },
            create: {
                id: userData.id,
                firstName: userData.first_name,
                lastName: userData.last_name,
                imageUrl: userData.image_url,
                emailAddress: primaryEmail,
            },
        });
    }

    async deleteUser(userId: string) {
        try {
            await this.prisma.user.delete({
                where: { id: userId },
            });
        } catch (error) {
            console.error(`Error deleting user with ID ${userId}: `, error);
        }
    }
}
