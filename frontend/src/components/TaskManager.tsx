"use client"

import { useState, useEffect } from "react"
import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { ScrollArea } from "@/src/components/ui/scroll-area"
import { Share2 } from 'lucide-react'
import { cn } from "@/src/lib/utils"

interface Task {
  id: string
  project_id?: string
  content: string
  description?: string
  priority?: number
  due?: string
  labels?: string
  completed: boolean
  created_at?: string
}

export default function TaskManager() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  
  // New state variables for the form
  const [newContent, setNewContent] = useState<string>("")
  const [newDescription, setNewDescription] = useState<string>("")
  const [newDue, setNewDue] = useState<string>("")
  const [saving, setSaving] = useState<boolean>(false)
  const [saveError, setSaveError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        console.log("--- FRONTEND TASK FETCH ---")
        console.log("Attempting to fetch tasks...")
        
        const response = await fetch("http://localhost:8000/api/tasks/")
        
        console.log("Response status:", response.status)
        
        if (!response.ok) {
          const errorText = await response.text()
          console.error("Error response:", errorText)
          throw new Error(`Error: ${response.statusText} - ${errorText}`)
        }
        
        const data: Task[] = await response.json()
        
        console.log("Total tasks received:", data.length)
        data.forEach(task => {
          console.log("Task Details:")
          console.log("- ID:", task.id)
          console.log("- Content:", task.content)
          console.log("- Description:", task.description)
          console.log("- Priority:", task.priority)
          console.log("- Completed:", task.completed)
          console.log("- Created At:", task.created_at)
          console.log("---")
        })
        
        setTasks(data)
        setLoading(false)
      } catch (err: any) {
        console.error("Full fetch error:", err)
        setError(err.message)
        setLoading(false)
      }
    }

    fetchTasks()
  }, [])

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setSaveError(null)

    const newTask = {
      content: newContent,
      description: newDescription,
      due: newDue,
      completed: false
    }

    try {
      const response = await fetch("http://localhost:8000/api/tasks/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newTask)
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`Error: ${response.statusText} - ${errorText}`)
      }

      const createdTask: Task = await response.json()
      setTasks([createdTask, ...tasks])
      setNewContent("")
      setNewDescription("")
      setNewDue("")
    } catch (err: any) {
      console.error("Error adding task:", err)
      setSaveError(err.message)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <div>Loading tasks...</div>
  }

  if (error) {
    return <div>Error loading tasks: {error}</div>
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className="w-64 border-r bg-muted/40">
        {/* ...existing sidebar code... */}
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <header className="border-b p-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Tasks</h1>
          <Button variant="ghost" size="icon">
            <Share2 className="h-4 w-4" />
          </Button>
        </header>

        {/* Add Task Form */}
        <div className="p-4">
          <form onSubmit={handleAddTask} className="space-y-4">
            <Input
              type="text"
              placeholder="Task Content"
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              required
            />
            <Input
              type="text"
              placeholder="Description"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
            />
            <Input
              type="date"
              placeholder="Due Date"
              value={newDue}
              onChange={(e) => setNewDue(e.target.value)}
            />
            {saveError && <div className="text-red-500">{saveError}</div>}
            <Button type="submit" disabled={saving}>
              {saving ? "Adding..." : "Add Task"}
            </Button>
          </form>
        </div>

        <ScrollArea className="h-[calc(100vh-200px)]">
          <div className="p-4 space-y-4">
            {tasks.length === 0 ? (
              <div className="text-center text-muted-foreground">
                No tasks found. Try seeding some tasks!
              </div>
            ) : (
              tasks.map((task) => (
                <div
                  key={task.id}
                  className={cn(
                    "flex items-start gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors",
                  )}
                >
                  <input
                    type="checkbox"
                    checked={task.completed}
                    className="mt-1.5 h-4 w-4 rounded-full border-2"
                    readOnly
                  />
                  <div className="space-y-1">
                    <p className="font-medium">{task.content}</p>
                    {task.description && (
                      <p className="text-sm text-muted-foreground">{task.description}</p>
                    )}
                    {task.due && (
                      <p className="text-sm text-red-500">Due: {task.due}</p>
                    )}
                    {task.created_at && (
                      <p className="text-xs text-gray-500">Added on: {new Date(task.created_at).toLocaleDateString()}</p>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}