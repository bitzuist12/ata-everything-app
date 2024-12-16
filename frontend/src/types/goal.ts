export interface Goal {
    id: string
    title: string
    status: string
    tag?: string
    why?: string
    how?: string
    result?: string
    period?: string
    created_at: string
    tasks?: Task[]
  }
  
  export interface Task {
    id: string
    content: string
    // Add other relevant fields as needed
  }