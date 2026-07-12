"use client"

import { useState } from "react"
import { Plus, Trash2, Save } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useStore } from "@/lib/store"
import type { TimetableSlot, DayOfWeek, YearGroup } from "@/types"

const days: DayOfWeek[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
const yearGroups: YearGroup[] = ["Year 1", "Year 2", "Year 3", "Year 4", "Year 5", "Year 6"]
const periods = Array.from({ length: 8 }, (_, i) => i + 1)

function generateId(): string {
  return crypto.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`
}

export default function TimetablePage() {
  const { state, updateTimetable } = useStore()
  const [slots, setSlots] = useState<TimetableSlot[]>(state.timetable)

  const addSlot = () => {
    const newSlot: TimetableSlot = {
      id: generateId(),
      day: "Monday",
      period: 1,
      startTime: "08:00",
      endTime: "09:00",
      yearGroup: "Year 1",
      subject: "English",
    }
    setSlots([...slots, newSlot])
  }

  const removeSlot = (id: string) => {
    setSlots(slots.filter((s) => s.id !== id))
  }

  const updateSlot = (id: string, field: keyof TimetableSlot, value: string | number) => {
    setSlots(slots.map((s) => (s.id === id ? { ...s, [field]: value } : s)))
  }

  const saveTimetable = () => {
    updateTimetable(slots)
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Timetable Setup</h1>
          <p className="mt-2 text-muted-foreground">
            Define your weekly teaching schedule. This powers lesson plan generation.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={addSlot}>
            <Plus className="mr-2 h-4 w-4" />
            Add Slot
          </Button>
          <Button onClick={saveTimetable}>
            <Save className="mr-2 h-4 w-4" />
            Save Timetable
          </Button>
        </div>
      </div>

      {slots.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-muted-foreground mb-4">No timetable slots yet.</p>
            <Button onClick={addSlot}>
              <Plus className="mr-2 h-4 w-4" />
              Add Your First Slot
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {slots.map((slot) => (
            <Card key={slot.id}>
              <CardContent className="flex flex-wrap items-end gap-4 pt-6">
                <div className="space-y-1.5">
                  <Label>Day</Label>
                  <Select
                    value={slot.day}
                    onValueChange={(v) => updateSlot(slot.id, "day", v)}
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {days.map((d) => (
                        <SelectItem key={d} value={d}>{d}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <Label>Period</Label>
                  <Select
                    value={String(slot.period)}
                    onValueChange={(v) => updateSlot(slot.id, "period", Number(v))}
                  >
                    <SelectTrigger className="w-20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {periods.map((p) => (
                        <SelectItem key={p} value={String(p)}>{p}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <Label>Start</Label>
                  <Input
                    type="time"
                    value={slot.startTime}
                    onChange={(e) => updateSlot(slot.id, "startTime", e.target.value)}
                    className="w-28"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label>End</Label>
                  <Input
                    type="time"
                    value={slot.endTime}
                    onChange={(e) => updateSlot(slot.id, "endTime", e.target.value)}
                    className="w-28"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label>Year</Label>
                  <Select
                    value={slot.yearGroup}
                    onValueChange={(v) => updateSlot(slot.id, "yearGroup", v)}
                  >
                    <SelectTrigger className="w-28">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {yearGroups.map((y) => (
                        <SelectItem key={y} value={y}>{y}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  className="text-destructive"
                  onClick={() => removeSlot(slot.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Timetable Preview</CardTitle>
        </CardHeader>
        <CardContent>
          {slots.length === 0 ? (
            <p className="text-sm text-muted-foreground">Add slots above to see your timetable.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="px-3 py-2 text-left font-medium">Period</th>
                    {days.map((day) => (
                      <th key={day} className="px-3 py-2 text-left font-medium">{day}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {periods.map((period) => (
                    <tr key={period} className="border-b last:border-0">
                      <td className="px-3 py-2 font-medium text-muted-foreground">{period}</td>
                      {days.map((day) => {
                        const slot = slots.find((s) => s.day === day && s.period === period)
                        return (
                          <td key={day} className="px-3 py-2">
                            {slot ? (
                              <span className="inline-block rounded bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                                {slot.yearGroup}
                                <br />
                                {slot.startTime}-{slot.endTime}
                              </span>
                            ) : null}
                          </td>
                        )
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
