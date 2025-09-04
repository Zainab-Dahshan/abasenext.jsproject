export interface User {
  id: string
  name: string
  email: string
  password?: string
  createdAt: Date
  updatedAt: Date
}

export interface Poll {
  id: string
  title: string
  description?: string
  options: PollOption[]
  totalVotes: number
  authorId: string
  author: User
  createdAt: Date
  expiresAt?: Date
  isActive: boolean
}

export interface PollOption {
  id: string
  text: string
  votes: number
  pollId: string
}

export interface Vote {
  id: string
  pollId: string
  optionId: string
  userId: string
  createdAt: Date
  user: User
  poll: Poll
  option: PollOption
}

// API Request/Response Types
export interface CreatePollRequest {
  title: string
  description?: string
  options: Array<{ text: string }>
  expiresAt?: string
}

export interface VoteRequest {
  optionId: string
}

export interface AuthRequest {
  email: string
  password: string
  name?: string
}

export interface AuthResponse {
  user: Omit<User, 'password'>
  token?: string
}

// Legacy types for backward compatibility
export interface CreatePollData {
  title: string
  description?: string
  options: string[]
}

export interface AuthData {
  email: string
  password: string
  name?: string
}
