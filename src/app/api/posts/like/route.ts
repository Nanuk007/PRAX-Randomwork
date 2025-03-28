import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/authOptions";
import { prisma } from "../../auth/[...nextauth]/prisma";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const url = new URL(req.url);
    const postId = url.searchParams.get("postId");

    if (!postId) {
      return NextResponse.json(
        { error: "Post ID is required" },
        { status: 400 }
      );
    }

    // Check if the post exists
    const post = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    // Count total likes for the post
    const likesCount = await prisma.like.count({
      where: { postId },
    });

    // Check if the current user has liked the post
    let hasLiked = false;

    if (session?.user?.id) {
      const existingLike = await prisma.like.findUnique({
        where: {
          userId_postId: {
            userId: session.user.id,
            postId,
          },
        },
      });

      hasLiked = !!existingLike;
    }

    return NextResponse.json({ likesCount, hasLiked });
  } catch (error) {
    console.error("Error fetching likes:", error);
    return NextResponse.json(
      { error: "An error occurred while processing your request" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;
    const { postId } = await req.json();

    if (!postId) {
      return NextResponse.json(
        { error: "Post ID is required" },
        { status: 400 }
      );
    }

    // Check if the post exists
    const post = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    // Check if the user already liked the post
    const existingLike = await prisma.like.findUnique({
      where: {
        userId_postId: {
          userId,
          postId,
        },
      },
    });

    let action;

    if (existingLike) {
      // If like exists, delete it (unlike)
      await prisma.like.delete({
        where: {
          id: existingLike.id,
        },
      });
      action = "unliked";
    } else {
      // If like doesn't exist, create it
      await prisma.like.create({
        data: {
          userId,
          postId,
        },
      });
      action = "liked";
    }

    // Get the updated like count
    const likesCount = await prisma.like.count({
      where: { postId },
    });

    return NextResponse.json({ success: true, action, likesCount });
  } catch (error) {
    console.error("Error handling like:", error);
    return NextResponse.json(
      { error: "An error occurred while processing your request" },
      { status: 500 }
    );
  }
}
