'use client'; // Important for client-side components with hooks

import { useEffect, useState } from 'react'
import GoalBox from '../../src/components/goals/GoalBox'
import NoteInput from '../../src/components/NoteInput'
import GoalForm from '../../src/components/goals/GoalForm'
import { Goal } from '../../src/types/goal'
import axios from 'axios'

export default function GoalsPage() {
  const [goals, setGoals] = useState<Goal[]>([])
  const [isAdding, setIsAdding] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchGoals()
  }, [])

  const fetchGoals = async () => {
    try {
      const response = await axios.get<Goal[]>('/api/goals/')
      setGoals(response.data)
      setError(null)
    } catch (error) {
      console.error('Error fetching goals:', error)
      setError('Failed to load goals. Please try again later.')
    }
  }

  const handleAddGoal = async (newGoal: Goal) => {
    try {
      const response = await axios.post<Goal>('/api/goals/', newGoal)
      setGoals([...goals, response.data])
      setIsAdding(false)
    } catch (error) {
      console.error('Error adding goal:', error)
      setError('Failed to add goal. Please try again.')
    }
  }

  const handleEditGoal = async (updatedGoal: Goal) => {
    try {
      await axios.put(`/api/goals/${updatedGoal.id}/`, updatedGoal)
      setGoals(goals.map(goal => (goal.id === updatedGoal.id ? updatedGoal : goal)))
    } catch (error) {
      console.error('Error updating goal:', error)
      setError('Failed to update goal. Please try again.')
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
      {error && <div className="text-red-500">{error}</div>}
      {isAdding && <GoalForm onSubmit={handleAddGoal} onCancel={() => setIsAdding(false)} />}
      <div className="grid grid-cols-3 gap-6">
        {goals.map(goal => (
          <GoalBox key={goal.id} goal={goal} onEdit={handleEditGoal} />
        ))}
      </div>
      <NoteInput />
    </div>
  )
}