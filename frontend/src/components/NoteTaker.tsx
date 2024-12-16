import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

interface NoteEditorProps {
  onSave: (note: string) => void
}

export default function NoteEditor({ onSave }: NoteEditorProps) {
  const [note, setNote] = useState('')

  const handleSave = () => {
    if (note.trim()) {
      onSave(note)
      setNote('')
    }
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <Textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Start writing your note here..."
        className="w-full h-64 mb-4 p-2 border rounded"
      />
      <Button onClick={handleSave}>Save Note</Button>
    </div>
  )
}

