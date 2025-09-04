import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const pollId = params.id

    const poll = await prisma.poll.findUnique({
      where: { id: pollId },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        options: {
          include: {
            _count: {
              select: { votes: true }
            }
          }
        },
        _count: {
          select: { votes: true }
        }
      }
    })

    if (!poll) {
      return NextResponse.json(
        { message: 'Poll not found' },
        { status: 404 }
      )
    }

    const pollWithVoteCounts = {
      ...poll,
      totalVotes: poll._count.votes,
      options: poll.options.map(option => ({
        id: option.id,
        text: option.text,
        votes: option._count.votes
      }))
    }

    return NextResponse.json(pollWithVoteCounts)
  } catch (error) {
    console.error('Fetch poll error:', error)
    return NextResponse.json(
      { message: 'Failed to fetch poll' },
      { status: 500 }
    )
  }
}
