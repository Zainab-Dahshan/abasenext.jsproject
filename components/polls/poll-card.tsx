"use client"

import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Calendar, User, BarChart3 } from 'lucide-react'

interface Poll {
  id: string
  title: string
  description: string
  options: Array<{
    id: string
    text: string
    votes: number
  }>
  totalVotes: number
  author?: {  // Make author optional
    name: string
  }
  createdAt: string
  expiresAt?: string
  isActive: boolean
}

interface PollCardProps {
  poll: Poll
}

export function PollCard({ poll }: PollCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const isExpired = poll.expiresAt && new Date(poll.expiresAt) < new Date()

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg mb-2 line-clamp-2">
              {poll.title}
            </CardTitle>
            <CardDescription className="line-clamp-2">
              {poll.description}
            </CardDescription>
          </div>
          <div className="flex flex-col gap-2 ml-4">
            <Badge variant={poll.isActive && !isExpired ? "default" : "secondary"}>
              {poll.isActive && !isExpired ? "Active" : "Closed"}
            </Badge>
            {poll.expiresAt && (
              <Badge variant="outline" className="text-xs">
                Expires {formatDate(poll.expiresAt)}
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          {/* Poll Stats */}
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <User className="h-4 w-4" />
                <span>{poll.author?.name || 'Unknown Author'}</span> {/* FIXED */}
              </div>
              <div className="flex items-center gap-1">
                <BarChart3 className="h-4 w-4" />
                <span>{poll.totalVotes} votes</span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(poll.createdAt)}</span>
            </div>
          </div>

          {/* Rest of the component remains the same */}
          {/* Poll Options Preview */}
          <div className="space-y-2">
            {poll.options.slice(0, 3).map((option) => {
              const percentage = poll.totalVotes > 0 ? (option.votes / poll.totalVotes) * 100 : 0
              return (
                <div key={option.id} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="truncate">{option.text}</span>
                    <span className="text-muted-foreground">{option.votes} votes</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              )
            })}
            {poll.options.length > 3 && (
              <p className="text-sm text-muted-foreground">
                +{poll.options.length - 3} more options
              </p>
            )}
          </div>

          {/* Action Button */}
          <div className="pt-2">
            <Link href={`/polls/${poll.id}`}>
              <Button className="w-full" variant={poll.isActive && !isExpired ? "default" : "outline"}>
                {poll.isActive && !isExpired ? "Vote Now" : "View Results"}
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}