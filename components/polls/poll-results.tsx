"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { CheckCircle, BarChart3, Users, Calendar } from 'lucide-react'
import { useState } from 'react'

interface PollOption {
  id: string
  text: string
  votes: number
}

interface Poll {
  id: string
  title: string
  description: string
  options: PollOption[]
  totalVotes: number
  author: {
    name: string
  }
  createdAt: string
  expiresAt?: string
  isActive: boolean
  userVote?: string
}

interface PollResultsProps {
  poll: Poll
  onVote?: (optionId: string) => Promise<void>
}

export function PollResults({ poll, onVote }: PollResultsProps) {
  const [selectedOption, setSelectedOption] = useState(poll.userVote || '')
  const [voting, setVoting] = useState(false)
  const [hasVoted, setHasVoted] = useState(!!poll.userVote)

  const isExpired = poll.expiresAt && new Date(poll.expiresAt) < new Date()
  const canVote = poll.isActive && !isExpired && !hasVoted

  const handleVote = async () => {
    if (!selectedOption || !onVote) return

    setVoting(true)
    try {
      await onVote(selectedOption)
      setHasVoted(true)
    } catch (error) {
      console.error('Vote failed:', error)
    } finally {
      setVoting(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Poll Header */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-2xl mb-2">{poll.title}</CardTitle>
              {poll.description && (
                <CardDescription className="text-base">
                  {poll.description}
                </CardDescription>
              )}
            </div>
            <div className="flex flex-col gap-2 ml-4">
              <Badge variant={poll.isActive && !isExpired ? "default" : "secondary"}>
                {poll.isActive && !isExpired ? "Active" : "Closed"}
              </Badge>
              {poll.expiresAt && (
                <Badge variant="outline" className="text-xs">
                  {isExpired ? 'Expired' : 'Expires'} {formatDate(poll.expiresAt)}
                </Badge>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>by {poll.author.name}</span>
              </div>
              <div className="flex items-center gap-1">
                <BarChart3 className="h-4 w-4" />
                <span>{poll.totalVotes} total votes</span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>Created {formatDate(poll.createdAt)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Voting/Results Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {canVote ? 'Cast Your Vote' : 'Poll Results'}
            {hasVoted && <CheckCircle className="h-5 w-5 text-green-600" />}
          </CardTitle>
          <CardDescription>
            {canVote 
              ? 'Select your preferred option below'
              : hasVoted 
                ? 'Thank you for voting! Here are the current results:'
                : 'Here are the current results:'
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          {canVote ? (
            <div className="space-y-4">
              <RadioGroup value={selectedOption} onValueChange={setSelectedOption}>
                {poll.options.map((option) => (
                  <div key={option.id} className="flex items-center space-x-2">
                    <RadioGroupItem value={option.id} id={option.id} />
                    <Label htmlFor={option.id} className="flex-1 cursor-pointer">
                      {option.text}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
              
              <Button 
                onClick={handleVote} 
                disabled={!selectedOption || voting}
                className="w-full"
              >
                {voting ? 'Submitting Vote...' : 'Submit Vote'}
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {poll.options.map((option) => {
                const percentage = poll.totalVotes > 0 ? (option.votes / poll.totalVotes) * 100 : 0
                const isUserVote = poll.userVote === option.id
                
                return (
                  <div key={option.id} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{option.text}</span>
                      <div className="flex items-center gap-2">
                        {isUserVote && (
                          <Badge variant="default" className="text-xs">
                            Your Vote
                          </Badge>
                        )}
                        <span className="text-sm text-muted-foreground">
                          {option.votes} votes ({percentage.toFixed(1)}%)
                        </span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className={`h-3 rounded-full transition-all duration-500 ${
                          isUserVote ? 'bg-green-600' : 'bg-blue-600'
                        }`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
