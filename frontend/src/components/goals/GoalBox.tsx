import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Goal } from '../../types/goal'
import GoalForm from './GoalForm'

interface GoalBoxProps {
  goal: Goal
  onEdit: (goal: Goal) => void
}

export default function GoalBox({ goal, onEdit }: GoalBoxProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  const handleToggle = () => {
    setIsExpanded(!isExpanded)
  }

  const handleEdit = (updatedGoal: Goal) => {
    onEdit(updatedGoal)
    setIsEditing(false)
  }

  return (
    <Card className="bg-primary text-primary-foreground">
      <CardHeader onClick={handleToggle} className="cursor-pointer">
        <CardTitle>{goal.title}</CardTitle>
      </CardHeader>
      <CardContent>
        {!isExpanded ? (
          <ul className="list-disc list-inside space-y-2">
            {goal.tasks?.map((task, index) => (
              <li key={index}>{task.content}</li>
            ))}
          </ul>
        ) : isEditing ? (
          <GoalForm
            initialData={goal}
            onSubmit={handleEdit}
            onCancel={() => setIsEditing(false)}
          />
        ) : (
          <div className="space-y-2">
            <p><strong>Tag:</strong> {goal.tag}</p>
            <p><strong>Why:</strong> {goal.why}</p>
            <p><strong>How:</strong> {goal.how}</p>
            <p><strong>Result:</strong> {goal.result}</p>
            <p><strong>Period:</strong> {goal.period}</p>
            <button
              className="mt-2 px-3 py-1 bg-yellow-500 text-white rounded"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}