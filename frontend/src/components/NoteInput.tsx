'use client'

import { useState } from 'react'
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export default function NoteInput() {
  const [note, setNote] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Submitted note:', note)
    setNote('')
    // Here you would typically send the note to your backend or state management system
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Textarea
        placeholder="Type your ideas, thoughts, or notes here..."
        value={note}
        onChange={(e) => setNote(e.target.value)}
        className="min-h-[100px]"
      />
      <Button type="submit">Post Note</Button>
    </form>
  )
}

