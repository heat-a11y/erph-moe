"use client"

import { useState, useMemo } from "react"
import {
  Plus,
  Trash2,
  Clock,
  X,
  ChevronLeft,
  ChevronRight,
  SplitSquareHorizontal,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import type { TimetableSlot, DayOfWeek, YearGroup } from "@/types"

/* ─── Constants ──────────────────────────────────────── */

const DAYS: DayOfWeek[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
const YEAR_GROUPS: YearGroup[] = ["Year 1", "Year 2", "Year 3", "Year 4", "Year 5", "Year 6"]
const MAX_PERIODS = 8

const DAY_LABELS: Record<DayOfWeek, string> = {
  Monday: "Mon",
  Tuesday: "Tue",
  Wednesday: "Wed",
  Thursday: "Thu",
  Friday: "Fri",
}

/* Helpers */

function generateId(): string {
  return crypto.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`
}

function getWeekDateRange(year: number, month: number, day: number): { start: string; end: string } {
  const d = new Date(year, month, day)
  const dayOfWeek = d.getDay()
  const monday = new Date(d)
  monday.setDate(d.getDate() - ((dayOfWeek + 6) % 7))
  const friday = new Date(monday)
  friday.setDate(monday.getDate() + 4)

  const fmt = (date: Date) =>
    date.toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric" })

  return { start: fmt(monday), end: fmt(friday) }
}

/* ─── Year Badge Color ──────────────────────────────── */

const YEAR_COLORS: Record<YearGroup, string> = {
  "Year 1": "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300 border-blue-200 dark:border-blue-800",
  "Year 2": "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300 border-green-200 dark:border-green-800",
  "Year 3": "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300 border-amber-200 dark:border-amber-800",
  "Year 4": "bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300 border-purple-200 dark:border-purple-800",
  "Year 5": "bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300 border-rose-200 dark:border-rose-800",
  "Year 6": "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/40 dark:text-cyan-300 border-cyan-200 dark:border-cyan-800",
}

/* ─── Slot Cell ─────────────────────────────────────── */

function SlotChip({
  slot,
  onEdit,
  onDelete,
}: {
  slot: TimetableSlot
  onEdit: (slot: TimetableSlot) => void
  onDelete: (id: string) => void
}) {
  return (
    <div
      className={cn(
        "group relative cursor-pointer rounded-md border px-2 py-1 text-xs transition-all hover:shadow-sm",
        YEAR_COLORS[slot.yearGroup],
      )}
      onClick={() => onEdit(slot)}
    >
      <div className="flex items-center justify-between gap-1">
        <span className="font-semibold truncate">{slot.yearGroup}</span>
        {slot.part && (
          <span className="shrink-0 rounded bg-background/60 px-1 text-[10px] font-medium">
            P{slot.part}
          </span>
        )}
      </div>
      <div className="flex items-center gap-1 text-[10px] opacity-75">
        <Clock className="h-3 w-3" />
        {slot.startTime}–{slot.endTime}
      </div>
      <button
        className="absolute -right-1.5 -top-1.5 hidden h-4 w-4 items-center justify-center rounded-full bg-destructive text-destructive-foreground shadow group-hover:flex"
        onClick={(e) => {
          e.stopPropagation()
          onDelete(slot.id)
        }}
      >
        <X className="h-3 w-3" />
      </button>
    </div>
  )
}

/* ─── Slot Editor Dialog ────────────────────────────── */

function SlotEditor({
  slot,
  open,
  onSave,
  onClose,
  onDelete,
}: {
  slot: Partial<TimetableSlot> | null
  open: boolean
  onSave: (slot: TimetableSlot) => void
  onClose: () => void
  onDelete?: (id: string) => void
}) {
  const [day, setDay] = useState<DayOfWeek>(slot?.day ?? "Monday")
  const [period, setPeriod] = useState(slot?.period ?? 1)
  const [part, setPart] = useState<1 | 2>(slot?.part ?? 1)
  const [startTime, setStartTime] = useState(slot?.startTime ?? "08:00")
  const [endTime, setEndTime] = useState(slot?.endTime ?? "09:00")
  const [yearGroup, setYearGroup] = useState<YearGroup>(slot?.yearGroup ?? "Year 1")

  const isEditing = !!slot?.id

  const handleSave = () => {
    onSave({
      id: slot?.id ?? generateId(),
      day,
      period,
      part,
      startTime,
      endTime,
      yearGroup,
      subject: "English",
    })
  }

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit Timetable Slot" : "Add Timetable Slot"}</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-4 py-4">
          <div className="space-y-1.5">
            <Label>Day</Label>
            <Select value={day} onValueChange={(v) => setDay(v as DayOfWeek)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {DAYS.map((d) => (
                  <SelectItem key={d} value={d}>{d}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label>Period</Label>
            <Select value={String(period)} onValueChange={(v) => setPeriod(Number(v))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: MAX_PERIODS }, (_, i) => i + 1).map((p) => (
                  <SelectItem key={p} value={String(p)}>Period {p}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label>Session Part</Label>
            <Select value={String(part)} onValueChange={(v) => setPart(Number(v) as 1 | 2)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">
                  <div className="flex items-center gap-2">
                    <SplitSquareHorizontal className="h-4 w-4" />
                    Part 1
                  </div>
                </SelectItem>
                <SelectItem value="2">
                  <div className="flex items-center gap-2">
                    <SplitSquareHorizontal className="h-4 w-4" />
                    Part 2
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label>Year Group</Label>
            <Select value={yearGroup} onValueChange={(v) => setYearGroup(v as YearGroup)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {YEAR_GROUPS.map((y) => (
                  <SelectItem key={y} value={y}>{y}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label>Start Time</Label>
            <Input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
          </div>

          <div className="space-y-1.5">
            <Label>End Time</Label>
            <Input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter className="gap-2 sm:justify-between">
          <div>
            {isEditing && onDelete && (
              <Button variant="destructive" size="sm" onClick={() => onDelete(slot!.id!)}>
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </Button>
            )}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button onClick={handleSave}>{isEditing ? "Update" : "Add Slot"}</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

/* ─── Week Navigation ────────────────────────────────── */

function WeekHeader({
  weekNumber,
  onPrevWeek,
  onNextWeek,
}: {
  weekNumber: number
  onPrevWeek: () => void
  onNextWeek: () => void
}) {
  const today = new Date()
  const { start, end } = getWeekDateRange(today.getFullYear(), today.getMonth(), today.getDate())

  return (
    <div className="flex items-center justify-between rounded-lg border bg-card p-3">
      <div className="flex items-center gap-3">
        <Button variant="outline" size="icon" className="h-8 w-8" onClick={onPrevWeek}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div>
          <p className="text-sm font-semibold">Week {weekNumber}</p>
          <p className="text-xs text-muted-foreground">{start} – {end}</p>
        </div>
        <Button variant="outline" size="icon" className="h-8 w-8" onClick={onNextWeek}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

/* ─── Main Timetable Grid ───────────────────────────── */

export function TimetableGrid({
  slots,
  onSave,
  onDelete,
}: {
  slots: TimetableSlot[]
  onSave: (slot: TimetableSlot) => void
  onDelete: (id: string) => void
}) {
  const [weekNumber, setWeekNumber] = useState(() => {
    const now = new Date()
    const start = new Date(now.getFullYear(), 0, 1)
    const diff = now.getTime() - start.getTime()
    return Math.ceil(diff / (7 * 24 * 60 * 60 * 1000))
  })
  const [editingSlot, setEditingSlot] = useState<Partial<TimetableSlot> | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [emptyCell, setEmptyCell] = useState<{ day: DayOfWeek; period: number } | null>(null)

  const gridSlots = useMemo(() => {
    const map = new Map<string, TimetableSlot[]>()
    for (const slot of slots) {
      const key = `${slot.day}-${slot.period}`
      if (!map.has(key)) map.set(key, [])
      map.get(key)!.push(slot)
    }
    return map
  }, [slots])

  const handleCellClick = (day: DayOfWeek, period: number) => {
    const key = `${day}-${period}`
    const existing = gridSlots.get(key)
    if (existing && existing.length > 0) {
      setEditingSlot(existing[0])
    } else {
      setEditingSlot({ day, period, part: 1, startTime: "08:00", endTime: "09:00", yearGroup: "Year 1" })
    }
    setEmptyCell({ day, period })
    setDialogOpen(true)
  }

  const handleSave = (slot: TimetableSlot) => {
    if (!slot.part) slot.part = 1
    onSave(slot)
    setDialogOpen(false)
    setEditingSlot(null)
    setEmptyCell(null)
  }

  const handleEdit = (slot: TimetableSlot) => {
    setEditingSlot(slot)
    setDialogOpen(true)
  }

  const handleDelete = (id: string) => {
    onDelete(id)
    setDialogOpen(false)
    setEditingSlot(null)
    setEmptyCell(null)
  }

  const handlePrevWeek = () => setWeekNumber((w) => Math.max(1, w - 1))
  const handleNextWeek = () => setWeekNumber((w) => w + 1)

  return (
    <div className="space-y-4">
      <WeekHeader weekNumber={weekNumber} onPrevWeek={handlePrevWeek} onNextWeek={handleNextWeek} />

      <div className="overflow-x-auto rounded-lg border">
        <table className="w-full min-w-[640px] border-collapse">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="w-20 px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Period
              </th>
              {DAYS.map((day) => (
                <th
                  key={day}
                  className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                >
                  <span className="hidden sm:inline">{day}</span>
                  <span className="sm:hidden">{DAY_LABELS[day]}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: MAX_PERIODS }, (_, i) => i + 1).map((period) => (
              <tr key={period} className="border-b last:border-0">
                <td className="px-3 py-2 text-sm font-medium text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {period}
                  </span>
                </td>
                {DAYS.map((day) => {
                  const key = `${day}-${period}`
                  const cellSlots = gridSlots.get(key) ?? []

                  return (
                    <td
                      key={day}
                      className={cn(
                        "relative min-h-[72px] cursor-pointer border-l px-1.5 py-1 transition-colors hover:bg-muted/30",
                        cellSlots.length === 0 && "group",
                      )}
                      onClick={() => handleCellClick(day, period)}
                    >
                      {cellSlots.length > 0 ? (
                        <div className="flex flex-col gap-1">
                          {cellSlots.map((slot) => (
                            <SlotChip
                              key={slot.id}
                              slot={slot}
                              onEdit={handleEdit}
                              onDelete={handleDelete}
                            />
                          ))}
                        </div>
                      ) : (
                        <div className="flex h-full min-h-[56px] items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                          <Plus className="h-4 w-4 text-muted-foreground" />
                        </div>
                      )}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap gap-2">
        <p className="w-full text-xs text-muted-foreground mb-1">Legend:</p>
        {YEAR_GROUPS.map((y) => (
          <div key={y} className="flex items-center gap-1.5">
            <span className={cn("h-3 w-3 rounded-sm border", YEAR_COLORS[y].split(" ")[0])} />
            <span className="text-xs text-muted-foreground">{y}</span>
          </div>
        ))}
      </div>

      <SlotEditor
        slot={editingSlot}
        open={dialogOpen}
        onSave={handleSave}
        onClose={() => {
          setDialogOpen(false)
          setEditingSlot(null)
          setEmptyCell(null)
        }}
        onDelete={editingSlot?.id ? handleDelete : undefined}
      />
    </div>
  )
}
