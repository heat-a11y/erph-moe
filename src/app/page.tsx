"use client"

import { FileText, CalendarDays, Clock, BookOpen } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const quickActions = [
  {
    title: "Generate Daily Plan",
    description: "Create a single-day lesson plan",
    href: "/lesson-plans",
    icon: FileText,
  },
  {
    title: "Generate Weekly Plan",
    description: "Plan your entire week",
    href: "/lesson-plans/weekly",
    icon: CalendarDays,
  },
  {
    title: "Generate Monthly Plan",
    description: "Outline the month ahead",
    href: "/lesson-plans/monthly",
    icon: Clock,
  },
  {
    title: "Browse Curriculum",
    description: "View DSKP standards",
    href: "/curriculum",
    icon: BookOpen,
  },
]

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="mt-2 text-muted-foreground">
          Welcome to ERPH MoE — your AI-powered lesson plan generator for the Malaysian
          primary school English curriculum.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {quickActions.map((action) => (
          <a key={action.title} href={action.href}>
            <Card className="transition-colors hover:border-primary/50 cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">{action.title}</CardTitle>
                <action.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">{action.description}</p>
              </CardContent>
            </Card>
          </a>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Getting Started</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
            <li>
              <span className="font-medium text-foreground">Set up your timetable</span> —
              Define your teaching schedule in the Timetable Setup page.
            </li>
            <li>
              <span className="font-medium text-foreground">Browse the curriculum</span> —
              Review DSKP Content and Learning Standards for your year group.
            </li>
            <li>
              <span className="font-medium text-foreground">Generate lesson plans</span> —
              Use AI to create Daily, Weekly, or Monthly plans with one click.
            </li>
            <li>
              <span className="font-medium text-foreground">Review and save</span> —
              All plans are stored locally in your browser. No account needed.
            </li>
          </ol>
          <div className="flex gap-3 pt-2">
            <Button asChild>
              <a href="/timetable">Set Up Timetable</a>
            </Button>
            <Button variant="outline" asChild>
              <a href="/lesson-plans">Generate a Lesson Plan</a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
