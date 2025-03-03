'use server'

import { prisma } from "@/app/api/auth/[...nextauth]/prisma";

export async function searchProfiles(query: string) {
    // Modified to return all profiles when query is empty or less than 3 characters
    try {
        const profiles = await prisma.profile.findMany({
            where: query && query.length >= 3 ? {
                OR: [
                    {
                        user: {
                            name: {
                                contains: query,
                                mode: 'insensitive'
                            }
                        }
                    }
                ]
            } : {},
            select: {
                id: true,
                avatarUrl: true,
                bio: true,
                user: {
                    select: {
                        name: true
                    }
                }
            },
            take: 10
        });
        
        return profiles;
    } catch (error) {
        console.error('Chyba pri vyhľadávaní profilov:', error);
        throw new Error('Nastala chyba pri vyhľadávaní profilov');
    }
}