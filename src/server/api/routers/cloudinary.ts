import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const cloudinaryRouter = createTRPCRouter({
    getSignature: protectedProcedure
        .mutation(async () => {
            const timestamp = Math.round(new Date().getTime() / 1000);
            
            const signature = cloudinary.utils.api_sign_request(
                {
                    timestamp: timestamp,
                    folder: 'reposage',
                },
                process.env.CLOUDINARY_API_SECRET!
            );
            
            return {
                signature,
                timestamp,
            };
        }),
});