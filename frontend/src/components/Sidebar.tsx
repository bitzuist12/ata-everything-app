import { Button } from "@/components/ui/button"
import Link from 'next/link'

const pages = [
  "Dashboard",
  "Projects",
  "Tasks",
  "Calendar",
  "Documents",
  "Reports",
  "Goals"
]

export default function Sidebar() {
  return (
    <div className="w-64 bg-secondary p-4 space-y-2">
      {pages.map((page) => (
        <Link key={page} href={`/${page.toLowerCase()}`} passHref>
          <Button
            variant="ghost"
            className="w-full justify-start text-primary-foreground"
          >
            {page}
          </Button>
        </Link>
      ))}
    </div>
  )
}

