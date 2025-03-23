import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, content, mood } = body;

    const journal = await prisma.journal.create({
      data: {
        title,
        content,
        mood,
        userId: 'temp-user-id', // TODO: Replace with actual user ID from auth
      },
    });

    return NextResponse.json(journal);
  } catch (error) {
    console.error('Error creating journal:', error);
    return NextResponse.json(
      { error: 'Error creating journal entry' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const journals = await prisma.journal.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      take: 10,
    });

    return NextResponse.json(journals);
  } catch (error) {
    console.error('Error fetching journals:', error);
    return NextResponse.json(
      { error: 'Error fetching journal entries' },
      { status: 500 }
    );
  }
} 