// lib/auth.ts
import { createServerClient } from "@/supabase-server"
import { prisma } from '@/lib/db'

export async function getAuthenticatedUser() {
  try {
    const supabase = await createServerClient()
    
    const {
      data: { user: supabaseUser },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !supabaseUser) {
      return null
    }

    // Get user from Prisma database
    const user = await prisma.user.findUnique({
      where: { id: supabaseUser.id },
    })

    return user
  } catch (error) {
    console.error('Error getting authenticated user:', error)
    return null
  }
}

export async function requireAuth() {
  const user = await getAuthenticatedUser()
  
  if (!user) {
    throw new Error('Unauthorized')
  }
  
  return user
}
