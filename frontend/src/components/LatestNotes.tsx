interface LatestNoteProps {
    note?: string
  }
  
  export default function LatestNote({ note }: LatestNoteProps) {
    return (
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Latest Note</h2>
        {note ? (
          <p className="whitespace-pre-wrap">{note}</p>
        ) : (
          <p className="text-gray-500">No notes yet. Start writing!</p>
        )}
      </div>
    )
  }
  
  