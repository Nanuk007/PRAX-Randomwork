'use server';

import { prisma } from "@/app/api/auth/[...nextauth]/prisma";

interface Profile {
  id: string;
  user: {
    name: string | null;
  };
  avatarUrl?: string | null;
  bio?: string | null;
}

interface Post {
  id: string;
  imageUrl: string;
  caption: string | null;
  createdAt: Date;
}

interface ProfileWithPosts extends Profile {
  posts: Post[];
}

export async function getProfileWithPosts(profileId: string): Promise<ProfileWithPosts | null> {
  try {
    const profile = await prisma.profile.findUnique({
      where: {
        id: profileId
      },
      select: {
        id: true,
        avatarUrl: true,
        bio: true,
        user: {
          select: {
            name: true,
            posts: {
              select: {
                id: true,
                imageUrl: true,
                caption: true,
                createdAt: true
              },
              orderBy: {
                createdAt: 'desc'
              }
            }
          }
        }
      }
    });

    if (!profile) return null;

    // Restructure the data to match the ProfileWithPosts interface
    return {
      id: profile.id,
      avatarUrl: profile.avatarUrl,
      bio: profile.bio,
      user: {
        name: profile.user.name
      },
      posts: profile.user.posts
    };
  } catch (error) {
    console.error('Error fetching profile with posts:', error);
    throw new Error('Failed to fetch profile data');
  }
}