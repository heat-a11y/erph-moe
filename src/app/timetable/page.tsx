"use client"

import { Save, RotateCcw, Calendar } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TimetableGrid } from "@/components/timetable-grid"
import { useStore } from "@/lib/store"
import type { TimetableSlot } from "@/types"

export default function TimetablePage() {
  const { state, updateTimetable } = useStore()

  const handleSave = (slot: TimetableSlot) => {
    const existing = state.timetable.findIndex(
      (s) => s.id === slot.id,
    )
    if (existing >= 0) {
      const updated = [...state.timetable]
      updated[existing] = slot
      updateTimetable(updated)
    } else {
      updateTimetable([...state.timetable, slot])
    }
  }

  const handleDelete = (id: string) => {
    updateTimetable(state.timetable.filter((s) => s.id !== id))
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Timetable Setup</h1>
          <p className="mt-2 text-muted-foreground">
            Click any cell to add or edit a class. Split sessions (Part 1 / Part 2) let you
            schedule two lessons for the same class on the same day.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => updateTimetable([])}
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Clear All
          </Button>
          <Button
            size="sm"
            onClick={() => updateTimetable(state.timetable)}
          >
            <Save className="mr-2 h-4 w-4" />
            Save
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">Weekly Schedule</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <TimetableGrid
            slots={state.timetable}
            onSave={handleSave}
            onDelete={handleDelete}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Tips</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>
            <span className="font-medium text-foreground">Split sessions</span> — Use
            Part 1 and Part 2 to schedule, e.g., a morning session (8:15–9:15) and an
            afternoon session (11:05–11:35) for the same class.
          </p>
          <p>
            <span className="font-medium text-foreground">Click a cell</span> to add a
            new slot. Click an existing slot to edit or delete it.
          </p>
          <p>
            <span className="font-medium text-foreground">Changes are local</span> — Your
            timetable is saved to your browser. No account needed.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
