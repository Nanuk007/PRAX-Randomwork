import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { PrismaClient } from "@prisma/client";
import { authOptions } from "../../auth/[...nextauth]/authOptions";

const prisma = new PrismaClient();

// GET endpoint to check if a post is saved by the current user
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const postId = searchParams.get("postId");

    if (!postId) {
      return NextResponse.json({ error: "Post ID is required" }, { status: 400 });
    }

    // Get the current user
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Check if the post is saved by the user
    const savedPost = await prisma.savedPost.findUnique({
      where: {
        userId_postId: {
          userId: user.id,
          postId,
        },
      },
    });

    // Count total saves for this post
    const savesCount = await prisma.savedPost.count({
      where: { postId },
    });

    return NextResponse.json({
      hasSaved: !!savedPost,
      savesCount,
    });
  } catch (error) {
    console.error("Error checking saved status:", error);
    return NextResponse.json(
      { error: "Failed to check saved status" },
      { status: 500 }
    );
  }
}

// POST endpoint to toggle save status
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { postId } = await request.json();

    if (!postId) {
      return NextResponse.json({ error: "Post ID is required" }, { status: 400 });
    }

    // Get the current user
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Check if the post exists
    const post = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    // Check if the post is already saved
    const existingSave = await prisma.savedPost.findUnique({
      where: {
        userId_postId: {
          userId: user.id,
          postId,
        },
      },
    });

    let action: "saved" | "unsaved";

    if (existingSave) {
      // Unsave the post
      await prisma.savedPost.delete({
        where: {
          userId_postId: {
            userId: user.id,
            postId,
          },
        },
      });
      action = "unsaved";
    } else {
      // Save the post
      await prisma.savedPost.create({
        data: {
          userId: user.id,
          postId,
        },
      });
      action = "saved";
    }

    // Count total saves for this post
    const savesCount = await prisma.savedPost.count({
      where: { postId },
    });

    return NextResponse.json({
      action,
      savesCount,
    });
  } catch (error) {
    console.error("Error toggling save status:", error);
    return NextResponse.json(
      { error: "Failed to toggle save status" },
      { status: 500 }
    );
  }
}