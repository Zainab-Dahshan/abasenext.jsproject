import { createClient } from '@supabase/supabase-js'
/**
 * Initializes and exports a Supabase client for use throughout the app.
 * 
 * This client is configured using environment variables for the Supabase URL and
 * anonymous key, which should be set in your `.env.local` file. The exported
 * `supabase` object allows you to interact with your Supabase backend for
 * authentication, database operations, and more.
 * 
 * Why: Centralizes Supabase configuration, ensuring a single client instance is
 * used everywhere, and keeps sensitive keys out of source code.
 */
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Export a configured Supabase client for use in API routes, components, etc.
export const supabase = createClient(supabaseUrl, supabaseAnonKey)