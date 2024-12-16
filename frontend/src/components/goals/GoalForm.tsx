import { useState } from 'react'
import { Goal } from '../../types/goal'

interface GoalFormProps {
  onSubmit: (goal: Goal) => void
  onCancel: () => void
  initialData?: Goal
}

export default function GoalForm({ onSubmit, onCancel, initialData }: GoalFormProps) {
  const [title, setTitle] = useState(initialData?.title || '')
  const [tag, setTag] = useState(initialData?.tag || '')
  const [why, setWhy] = useState(initialData?.why || '')
  const [how, setHow] = useState(initialData?.how || '')
  const [result, setResult] = useState(initialData?.result || '')
  const [period, setPeriod] = useState(initialData?.period || '')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const goal: Goal = {
      id: initialData?.id || 0, // Assuming 0 is a placeholder for new goals
      title,
      tag,
      why,
      how,
      result,
      period,
      tasks: initialData?.tasks || [],
    }
    onSubmit(goal)
  }

  const inputClassName = "mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2.5 focus:ring-blue-500 focus:border-blue-500 text-gray-900"

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6 p-6 bg-white rounded-lg shadow-md">
      <div className="text-xl font-semibold mb-6">
        {initialData ? 'Edit Goal' : 'Create New Goal'}
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Goal Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
            placeholder="E.g., Learn React, Get Fit, Launch Product"
            className={inputClassName}
          />
          <p className="mt-1 text-sm text-gray-500">A clear, concise name for your goal</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category Tag
          </label>
          <input
            type="text"
            value={tag}
            onChange={e => setTag(e.target.value)}
            placeholder="E.g., Career, Health, Personal"
            className={inputClassName}
          />
          <p className="mt-1 text-sm text-gray-500">Categorize your goal for better organization</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Why is this important? <span className="text-red-500">*</span>
            </label>
            <textarea
              value={why}
              onChange={e => setWhy(e.target.value)}
              required
              placeholder="What motivates you to achieve this goal?"
              rows={4}
              className={inputClassName}
            />
            <p className="mt-1 text-sm text-gray-500">Your motivation keeps you focused</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              How will you achieve it? <span className="text-red-500">*</span>
            </label>
            <textarea
              value={how}
              onChange={e => setHow(e.target.value)}
              required
              placeholder="What specific steps will you take?"
              rows={4}
              className={inputClassName}
            />
            <p className="mt-1 text-sm text-gray-500">Break down your approach into actionable steps</p>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Desired Result <span className="text-red-500">*</span>
          </label>
          <textarea
            value={result}
            onChange={e => setResult(e.target.value)}
            required
            placeholder="What does success look like? Be specific and measurable"
            rows={3}
            className={inputClassName}
          />
          <p className="mt-1 text-sm text-gray-500">Define what success means for this goal</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Time Period <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={period}
            onChange={e => setPeriod(e.target.value)}
            required
            placeholder="E.g., 3 months, End of 2024, Daily"
            className={inputClassName}
          />
          <p className="mt-1 text-sm text-gray-500">Set a realistic timeframe for achieving this goal</p>
        </div>
      </div>

      <div className="flex justify-end space-x-3 pt-6 border-t">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {initialData ? 'Update Goal' : 'Create Goal'}
        </button>
      </div>
    </form>
  )
}