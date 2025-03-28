import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { PrismaClient } from "@prisma/client";
import { authOptions } from "../../auth/[...nextauth]/authOptions";

const prisma = new PrismaClient();

// GET endpoint to fetch all saved posts for the current user
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get the current user
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Fetch all saved posts for the user with post and user details
    const savedPostsWithDetails = await prisma.savedPost.findMany({
      where: { userId: user.id },
      include: {
        post: {
          include: {
            user: {
              select: {
                name: true,
                image: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Transform the data to match the expected Post type
    const posts = savedPostsWithDetails.map((savedPost) => ({
      id: savedPost.post.id,
      userId: savedPost.post.userId,
      imageUrl: savedPost.post.imageUrl,
      caption: savedPost.post.caption,
      createdAt: savedPost.post.createdAt,
      updatedAt: savedPost.post.updatedAt,
      user: {
        name: savedPost.post.user.name,
        image: savedPost.post.user.image,
      },
    }));

    return NextResponse.json({ posts });
  } catch (error) {
    console.error("Error fetching saved posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch saved posts" },
      { status: 500 }
    );
  }
}