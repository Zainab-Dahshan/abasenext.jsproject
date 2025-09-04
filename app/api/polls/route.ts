import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// GET /api/polls - Fetch all polls
export async function GET() {
  try {
    const polls = await prisma.poll.findMany({
      include: {
        options: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        _count: {
          select: {
            votes: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    // Transform data to match frontend expectations
    const transformedPolls = polls.map(poll => ({
      id: poll.id,
      title: poll.title,
      description: poll.description,
      options: poll.options.map(option => ({
        id: option.id,
        text: option.text,
        votes: option.voteCount
      })),
      totalVotes: poll._count.votes,
      createdAt: poll.createdAt,
      createdBy: poll.user.name
    }))

    return NextResponse.json(transformedPolls)
  } catch (error) {
    console.error('Error fetching polls:', error)
    return NextResponse.json(
      { error: 'Failed to fetch polls' },
      { status: 500 }
    )
  }
}

// POST /api/polls - Create a new poll
export async function POST(request: NextRequest) {
  try {
    const { title, description, options, userId } = await request.json()

    // Validate input
    if (!title || !options || options.length < 2 || !userId) {
      return NextResponse.json(
        { error: 'Invalid poll data' },
        { status: 400 }
      )
    }

    // Create poll with options
    const poll = await prisma.poll.create({
      data: {
        title,
        description,
        createdBy: userId,
        options: {
          create: options.map((option: string) => ({
            text: option,
            voteCount: 0
          }))
        }
      },
      include: {
        options: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    })

    const transformedPoll = {
      id: poll.id,
      title: poll.title,
      description: poll.description,
      options: poll.options.map(option => ({
        id: option.id,
        text: option.text,
        votes: option.voteCount
      })),
      totalVotes: 0,
      createdAt: poll.createdAt,
      createdBy: poll.user.name
    }

    return NextResponse.json(transformedPoll, { status: 201 })
  } catch (error) {
    console.error('Error creating poll:', error)
    return NextResponse.json(
      { error: 'Failed to create poll' },
      { status: 500 }
    )
  }
}
