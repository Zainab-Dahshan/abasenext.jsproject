import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { requireAuth } from '@/lib/auth'

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Require authentication
    const user = await requireAuth()
    
    const { optionId } = await request.json()
    const pollId = params.id

    // Validate input
    if (!optionId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Check if poll exists
    const poll = await prisma.poll.findUnique({
      where: { id: pollId },
      include: { options: true }
    })

    if (!poll) {
      return NextResponse.json(
        { error: 'Poll not found' },
        { status: 404 }
      )
    }

    // Check if option exists
    const option = poll.options.find(opt => opt.id === optionId)
    if (!option) {
      return NextResponse.json(
        { error: 'Invalid option' },
        { status: 400 }
      )
    }

    // Check if user has already voted
    const existingVote = await prisma.vote.findUnique({
      where: {
        pollId_userId: {
          pollId,
          userId: user.id
        }
      }
    })

    if (existingVote) {
      return NextResponse.json(
        { error: 'User has already voted on this poll' },
        { status: 409 }
      )
    }

    // Create vote and update option vote count
    const [vote] = await prisma.$transaction([
      prisma.vote.create({
        data: {
          pollId,
          optionId,
          userId: user.id
        }
      }),
      prisma.pollOption.update({
        where: { id: optionId },
        data: {
          voteCount: {
            increment: 1
          }
        }
      })
    ])

    return NextResponse.json(
      { message: 'Vote recorded successfully', vote },
      { status: 201 }
    )
  } catch (error) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }
    
    console.error('Error recording vote:', error)
    return NextResponse.json(
      { error: 'Failed to record vote' },
      { status: 500 }
    )
  }
}
