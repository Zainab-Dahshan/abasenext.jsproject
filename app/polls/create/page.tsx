import { CreatePollForm } from "@/components/polls/create-poll-form"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function CreatePollPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link href="/polls">
            <Button variant="outline" className="mb-4">
              ← Back to Polls
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Create a New Poll</h1>
          <p className="mt-2 text-gray-600">
            Create engaging polls to gather opinions from your community
          </p>
        </div>
        
        <CreatePollForm />
      </div>
    </div>
  )
}
