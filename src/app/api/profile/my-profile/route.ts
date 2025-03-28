import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import { prisma } from '@/app/api/auth/[...nextauth]/prisma';

export async function GET() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      profile: true
    }
  });

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  return NextResponse.json({
    id: user.id,
    avatarUrl: user.profile?.avatarUrl || null,
    bio: user.profile?.bio || null,
    user: {
      name: user.name,
      email: user.email,
      image: user.image
    }
  });
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const data = await request.json();
  
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      profile: true
    }
  });

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  const updatedUser = await prisma.user.update({
    where: { email: session.user.email },
    data: {
      name: data.name,
      profile: {
        upsert: {
          create: {
            bio: data.bio
          },
          update: {
            bio: data.bio
          }
        }
      }
    },
    include: {
      profile: true
    }
  });

  return NextResponse.json({
    id: updatedUser.id,
    avatarUrl: updatedUser.profile?.avatarUrl || null,
    bio: updatedUser.profile?.bio || null,
    user: {
      name: updatedUser.name,
      email: updatedUser.email,
      image: updatedUser.image
    }
  });
}
