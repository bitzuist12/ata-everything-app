import { useEffect, useState } from 'react'
import GoalBox from '../components/goals/GoalBox'
import NoteInput from '../components/NoteInput'
import { Goal } from '../types/goal'
import axios from 'axios'
import GoalForm from '../components/goals/GoalForm'

export default function GoalsPage() {
  const [goals, setGoals] = useState<Goal[]>([])
  const [isAdding, setIsAdding] = useState(false)

  useEffect(() => {
    fetchGoals()
  }, [])

  const fetchGoals = async () => {
    try {
      const response = await axios.get<Goal[]>('/api/goals/')
      setGoals(response.data)
    } catch (error) {
      console.error('Error fetching goals:', error)
    }
  }

  const handleAddGoal = async (newGoal: Goal) => {
    try {
      const response = await axios.post<Goal>('/api/goals/', newGoal)
      setGoals([...goals, response.data])
      setIsAdding(false)
    } catch (error) {
      console.error('Error adding goal:', error)
    }
  }

  const handleEditGoal = async (updatedGoal: Goal) => {
    try {
      await axios.put(`/api/goals/${updatedGoal.id}/`, updatedGoal)
      setGoals(goals.map(goal => (goal.id === updatedGoal.id ? updatedGoal : goal)))
    } catch (error) {
      console.error('Error updating goal:', error)
    }
  }

  return (
    <div className="flex-1 p-8 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Goals</h1>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => setIsAdding(true)}
        >
          Add Goal
        </button>
      </div>
      {isAdding && <GoalForm onSubmit={handleAddGoal} onCancel={() => setIsAdding(false)} />}
      <div className="grid grid-cols-3 gap-6">
        {goals.map(goal => (
          <GoalBox key={goal.id} goal={goal} onEdit={handleEditGoal} />
        ))}
      </div>
    </div>
  )
}