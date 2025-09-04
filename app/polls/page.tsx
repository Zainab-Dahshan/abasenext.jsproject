"use client"

import { useState, useEffect } from "react"
import { PollCard } from "@/components/polls/poll-card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

// Mock data for demonstration
const mockPolls = [
  {
    id: "1",
    title: "What's your favorite programming language?",
    description: "Let's see what the community prefers for development",
    options: [
      { id: "1-1", text: "JavaScript", votes: 45 },
      { id: "1-2", text: "Python", votes: 38 },
      { id: "1-3", text: "TypeScript", votes: 32 },
      { id: "1-4", text: "Rust", votes: 15 }
    ],
    totalVotes: 130,
    createdAt: "2024-01-15",
    createdBy: "John Doe"
  },
  {
    id: "2",
    title: "Which framework do you prefer for React?",
    description: "Share your experience with different React frameworks",
    options: [
      { id: "2-1", text: "Next.js", votes: 67 },
      { id: "2-2", text: "Create React App", votes: 23 },
      { id: "2-3", text: "Vite", votes: 41 },
      { id: "2-4", text: "Gatsby", votes: 12 }
    ],
    totalVotes: 143,
    createdAt: "2024-01-14",
    createdBy: "Jane Smith"
  }
]

export default function PollsPage() {
  const [polls, setPolls] = useState(mockPolls)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }, [])

  const handleVote = (pollId: string, optionId: string) => {
    // TODO: Implement actual voting logic
    console.log(`Voted for poll ${pollId}, option ${optionId}`)
    
    // Update local state for demo
    setPolls(prevPolls => 
      prevPolls.map(poll => {
        if (poll.id === pollId) {
          const updatedOptions = poll.options.map(option => {
            if (option.id === optionId) {
              return { ...option, votes: option.votes + 1 }
            }
            return option
          })
          return {
            ...poll,
            options: updatedOptions,
            totalVotes: poll.totalVotes + 1
          }
        }
        return poll
      })
    )
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading polls...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Active Polls</h1>
            <p className="mt-2 text-gray-600">
              Vote on polls or create your own
            </p>
          </div>
          <Link href="/polls/create">
            <Button>Create Poll</Button>
          </Link>
        </div>

        {polls.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No polls available
            </h3>
            <p className="text-gray-600 mb-4">
              Be the first to create a poll!
            </p>
            <Link href="/polls/create">
              <Button>Create Your First Poll</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {polls.map((poll) => (
              <PollCard
                key={poll.id}
                poll={poll}
                onVote={handleVote}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
