"use client"

import Sidebar from '../src/components/Sidebar'
import MainContent from '../src/components/MainContent'

export default function Home() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <MainContent />
    </div>
  )
}

