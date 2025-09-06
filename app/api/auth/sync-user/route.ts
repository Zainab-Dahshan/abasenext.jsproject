import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const { id, email, name } = await request.json()

    if (!id || !email || !name) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Upsert user in Prisma database
    const user = await prisma.user.upsert({
      where: { id },
      update: {
        email,
        name,
        updatedAt: new Date(),
      },
      create: {
        id,
        email,
        name,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    })

    return NextResponse.json(user)
  } catch (error) {
    console.error('Error syncing user:', error)
    return NextResponse.json(
      { error: 'Failed to sync user' },
      { status: 500 }
    )
  }
}
