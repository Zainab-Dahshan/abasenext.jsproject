"use client"

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { PollResults } from '@/components/polls/poll-results'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Poll } from '@/lib/types'

export default function PollPage() {
  const params = useParams()
  const router = useRouter()
  const [poll, setPoll] = useState<Poll | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (params.id) {
      fetchPoll(params.id as string)
    }
  }, [params.id])

  const fetchPoll = async (pollId: string) => {
    try {
      const response = await fetch(`/api/polls/${pollId}`)
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Poll not found')
        }
        throw new Error('Failed to fetch poll')
      }
      const pollData = await response.json()
      setPoll(pollData)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch poll')
    } finally {
      setLoading(false)
    }
  }

  const handleVote = async (optionId: string) => {
    if (!poll) return

    try {
      const response = await fetch(`/api/polls/${poll.id}/vote`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ optionId }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Failed to vote')
      }

      const updatedPoll = await response.json()
      setPoll(updatedPoll)
    } catch (err) {
      console.error('Vote failed:', err)
      // You might want to show a toast notification here
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center h-64">
            <div className="text-lg text-gray-600">Loading poll...</div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="border-red-200 bg-red-50">
            <CardContent className="pt-6">
              <div className="text-center">
                <h2 className="text-xl font-semibold text-red-800 mb-2">Error</h2>
                <p className="text-red-600 mb-4">{error}</p>
                <div className="flex gap-4 justify-center">
                  <Button variant="outline" onClick={() => router.back()}>
                    Go Back
                  </Button>
                  <Button onClick={() => fetchPoll(params.id as string)}>
                    Try Again
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (!poll) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">Poll Not Found</h2>
                <p className="text-gray-600 mb-4">The poll you're looking for doesn't exist.</p>
                <Button onClick={() => router.push('/polls')}>
                  Browse All Polls
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Button variant="outline" onClick={() => router.back()}>
            ← Back
          </Button>
        </div>
        <PollResults poll={poll} onVote={handleVote} />
      </div>
    </div>
  )
}
