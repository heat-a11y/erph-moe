"use client"

import { useState, useRef, useCallback } from "react"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  Sparkles,
  FileDown,
  Copy,
  Pencil,
  Trash2,
  Check,
  X,
  ChevronDown,
  ChevronRight,
  BookOpen,
  Clock,
  Target,
  CheckSquare,
  Wrench,
  Heart,
  Globe,
  Lightbulb,
  GraduationCap,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
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
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { useStore } from "@/lib/store"
import type { LessonPlan, YearGroup, SkillArea, Theme, Activity } from "@/types"

/* ─── Constants ──────────────────────────────────────── */

const YEAR_GROUPS: YearGroup[] = ["Year 1", "Year 2", "Year 3", "Year 4", "Year 5", "Year 6"]
const SKILL_AREAS: SkillArea[] = ["Listening", "Speaking", "Reading", "Writing", "Language Arts"]
const THEMES: Theme[] = [
  "World of Self, Family and Friends",
  "World of Stories",
  "World of Knowledge",
  "World of Arts",
]
const PHASES: Activity["phase"][] = [
  "Set Induction",
  "Pre-lesson",
  "Lesson Development",
  "Post-lesson",
  "Closure",
]

const SKILL_ICONS: Record<SkillArea, typeof BookOpen> = {
  Listening: BookOpen,
  Speaking: BookOpen,
  Reading: BookOpen,
  Writing: BookOpen,
  "Language Arts": BookOpen,
}

/* ─── Helpers ────────────────────────────────────────── */

function generateId(): string {
  return crypto.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`
}

function formatPlanAsText(plan: LessonPlan): string {
  const lines = [
    `${plan.title}`,
    `Date: ${plan.date}  |  ${plan.yearGroup}  |  Duration: ${plan.duration} min`,
    `Theme: ${plan.theme}  |  Topic: ${plan.topic}`,
    `Skills: ${plan.skillArea.join(", ")}`,
    "",
    "=== Learning Objectives ===",
    ...plan.learningObjectives.map((o) => `  • ${o}`),
    "",
    "=== Success Criteria ===",
    ...plan.successCriteria.map((s) => `  • ${s}`),
    "",
    "=== Activities ===",
    ...plan.activities.map(
      (a) => `  [${a.phase}] ${a.description} (${a.duration} min)`,
    ),
    "",
    `Teaching Aids: ${plan.teachingAids.join(", ")}`,
    `Moral Values: ${plan.moralValues.join(", ")}`,
    `CCE: ${plan.cce.join(", ")}`,
  ]
  return lines.join("\n")
}

/* ─── Generate Template Plan ─────────────────────────── */

function createTemplatePlan(mode: "daily" | "weekly" | "monthly", overrides: Partial<LessonPlan>): LessonPlan {
  const startDate = new Date()
  return {
    id: generateId(),
    title: overrides.title ?? `${mode.charAt(0).toUpperCase() + mode.slice(1)} Lesson Plan`,
    yearGroup: overrides.yearGroup ?? "Year 1",
    subject: "English",
    theme: overrides.theme ?? "World of Self, Family and Friends",
    topic: overrides.topic ?? "",
    skillArea: overrides.skillArea ?? ["Reading"],
    date: startDate.toISOString().split("T")[0],
    duration: overrides.duration ?? 60,
    learningObjectives: [
      `By the end of the lesson, pupils will be able to ${overrides.skillArea?.[0]?.toLowerCase() ?? "read"} at least 3 items related to ${overrides.topic || overrides.theme || "the topic"}.`,
      "Pupils will be able to respond to simple questions with guidance.",
    ],
    successCriteria: [
      "Pupils can identify key vocabulary from the topic.",
      "Pupils can complete a simple task with minimal help.",
    ],
    teachingAids: ["Whiteboard", "Worksheet", "Picture cards", "Audio player"],
    activities: [
      {
        id: generateId(),
        phase: "Set Induction",
        description: `Engage pupils with a guessing game or song related to ${overrides.topic || "the theme"}.`,
        duration: 10,
        teacherRole: "Facilitator – leads the warm-up activity.",
        studentRole: "Participant – listen, observe and respond.",
      },
      {
        id: generateId(),
        phase: "Pre-lesson",
        description: "Introduce and drill key vocabulary using flashcards. Pupils repeat and match words to pictures.",
        duration: 10,
        teacherRole: "Instructor – presents and models vocabulary.",
        studentRole: "Listener and repeater – practise pronunciation.",
      },
      {
        id: generateId(),
        phase: "Lesson Development",
        description: `Main activity: pupils work in pairs/groups to complete a task related to ${overrides.topic || "the theme"}.`,
        duration: 25,
        teacherRole: "Facilitator – monitors and provides support.",
        studentRole: "Active learner – complete the task collaboratively.",
      },
      {
        id: generateId(),
        phase: "Post-lesson",
        description: "Pupils present their work or share answers. Class discusses and gives feedback.",
        duration: 10,
        teacherRole: "Moderator – guides discussion.",
        studentRole: "Presenter – share and explain their work.",
      },
      {
        id: generateId(),
        phase: "Closure",
        description: "Recap key learning points. Pupils self-reflect using thumbs up/down.",
        duration: 5,
        teacherRole: "Facilitator – summarises lesson.",
        studentRole: "Reflector – express understanding.",
      },
    ],
    moralValues: ["Cooperation", "Respect", "Responsibility"],
    cce: ["Language", "Creativity and Innovation"],
    ...(mode === "weekly" ? { weekNumber: overrides.weekNumber ?? 1 } : {}),
    ...(mode === "monthly" ? { month: overrides.month ?? startDate.toLocaleString("default", { month: "long" }) } : {}),
  }
}

/* ─── Generator Dialog ───────────────────────────────── */

function GeneratorDialog({
  open,
  onClose,
  onGenerate,
  mode,
}: {
  open: boolean
  onClose: () => void
  onGenerate: (plan: LessonPlan) => void
  mode: "daily" | "weekly" | "monthly"
}) {
  const [yearGroup, setYearGroup] = useState<YearGroup>("Year 1")
  const [theme, setTheme] = useState<Theme>("World of Self, Family and Friends")
  const [topic, setTopic] = useState("")
  const [skillArea, setSkillArea] = useState<SkillArea>("Reading")

  const handleGenerate = () => {
    const plan = createTemplatePlan(mode, {
      yearGroup,
      theme,
      topic,
      skillArea: [skillArea],
      title: `${mode === "daily" ? "Daily" : mode === "weekly" ? "Weekly" : "Monthly"} Lesson Plan — ${topic || theme}`,
    })
    onGenerate(plan)
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            Generate {mode === "daily" ? "Daily" : mode === "weekly" ? "Weekly" : "Monthly"} Lesson Plan
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-4 py-4">
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
            <Label>Theme</Label>
            <Select value={theme} onValueChange={(v) => setTheme(v as Theme)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {THEMES.map((t) => (
                  <SelectItem key={t} value={t}>{t}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label>Topic</Label>
            <Input
              placeholder="e.g., My Family, Animals"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
          </div>

          <div className="space-y-1.5">
            <Label>Skill Focus</Label>
            <Select value={skillArea} onValueChange={(v) => setSkillArea(v as SkillArea)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {SKILL_AREAS.map((s) => (
                  <SelectItem key={s} value={s}>{s}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleGenerate}>
            <Sparkles className="mr-2 h-4 w-4" />
            Generate
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

/* ─── Edit Dialog ────────────────────────────────────── */

function EditDialog({
  plan,
  open,
  onClose,
  onSave,
}: {
  plan: LessonPlan | null
  open: boolean
  onClose: () => void
  onSave: (plan: LessonPlan) => void
}) {
  const [edited, setEdited] = useState<LessonPlan | null>(null)

  const handleOpenChange = (o: boolean) => {
    if (!o) onClose()
  }

  if (!plan) return null

  const update = (field: keyof LessonPlan, value: unknown) => {
    setEdited((prev) => prev ? { ...prev, [field]: value } : null)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Lesson Plan</DialogTitle>
        </DialogHeader>

        {edited ? (
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label>Title</Label>
                <Input value={edited.title} onChange={(e) => update("title", e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label>Date</Label>
                <Input value={edited.date} onChange={(e) => update("date", e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label>Year Group</Label>
                <Select value={edited.yearGroup} onValueChange={(v) => update("yearGroup", v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {YEAR_GROUPS.map((y) => (
                      <SelectItem key={y} value={y}>{y}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>Duration (min)</Label>
                <Input type="number" value={edited.duration} onChange={(e) => update("duration", Number(e.target.value))} />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label>Learning Objectives</Label>
              {edited.learningObjectives.map((obj, i) => (
                <div key={i} className="flex gap-2">
                  <Input value={obj} onChange={(e) => {
                    const copy = [...edited.learningObjectives]
                    copy[i] = e.target.value
                    update("learningObjectives", copy)
                  }} />
                  <Button variant="ghost" size="icon" className="shrink-0 text-destructive" onClick={() => {
                    update("learningObjectives", edited.learningObjectives.filter((_, j) => j !== i))
                  }}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button variant="outline" size="sm" onClick={() => update("learningObjectives", [...edited.learningObjectives, ""])}>
                + Add Objective
              </Button>
            </div>

            <div className="space-y-1.5">
              <Label>Activities</Label>
              {edited.activities.map((act, i) => (
                <Card key={act.id}>
                  <CardContent className="space-y-2 pt-4">
                    <div className="flex items-center justify-between">
                      <Select value={act.phase} onValueChange={(v) => {
                        const copy = [...edited.activities]
                        copy[i] = { ...copy[i], phase: v as Activity["phase"] }
                        update("activities", copy)
                      }}>
                        <SelectTrigger className="w-44"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {PHASES.map((p) => (
                            <SelectItem key={p} value={p}>{p}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          className="w-20"
                          value={act.duration}
                          onChange={(e) => {
                            const copy = [...edited.activities]
                            copy[i] = { ...copy[i], duration: Number(e.target.value) }
                            update("activities", copy)
                          }}
                        />
                        <span className="text-xs text-muted-foreground">min</span>
                      </div>
                    </div>
                    <Textarea
                      value={act.description}
                      onChange={(e) => {
                        const copy = [...edited.activities]
                        copy[i] = { ...copy[i], description: e.target.value }
                        update("activities", copy)
                      }}
                    />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          <div className="py-4 text-center text-sm text-muted-foreground">Loading...</div>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={() => edited && onSave(edited)}>
            <Check className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

/* ─── Lesson Plan Card ────────────────────────────────── */

function LessonPlanCard({
  plan,
  onDelete,
  onEdit,
}: {
  plan: LessonPlan
  onDelete: (id: string) => void
  onEdit: (plan: LessonPlan) => void
}) {
  const [expanded, setExpanded] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(formatPlanAsText(plan))
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // fallback
    }
  }, [plan])

  const handleExportPDF = useCallback(() => {
    const printWindow = window.open("", "_blank")
    if (!printWindow) return
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>${plan.title}</title>
        <style>
          body { font-family: 'Segoe UI', system-ui, sans-serif; padding: 2rem; max-width: 800px; margin: 0 auto; color: #1a1a2e; }
          h1 { font-size: 1.5rem; margin-bottom: 0.25rem; }
          .meta { color: #666; font-size: 0.875rem; margin-bottom: 1.5rem; }
          h2 { font-size: 1.125rem; margin-top: 1.5rem; margin-bottom: 0.5rem; border-bottom: 2px solid #e5e7eb; padding-bottom: 0.25rem; }
          ul { margin: 0; padding-left: 1.25rem; }
          li { margin-bottom: 0.25rem; }
          .activity { border: 1px solid #e5e7eb; border-radius: 0.5rem; padding: 0.75rem; margin-bottom: 0.75rem; }
          .activity-header { font-weight: 600; color: #2563eb; margin-bottom: 0.25rem; }
          .tag { display: inline-block; background: #f0f0ff; color: #2563eb; border-radius: 9999px; padding: 0.125rem 0.625rem; font-size: 0.75rem; margin-right: 0.25rem; }
          .footer { margin-top: 2rem; padding-top: 1rem; border-top: 1px solid #e5e7eb; font-size: 0.75rem; color: #999; }
        </style>
      </head>
      <body>
        <h1>${plan.title}</h1>
        <div class="meta">
          ${plan.date} | ${plan.yearGroup} | ${plan.duration} min<br>
          Theme: ${plan.theme} | Topic: ${plan.topic || "—"}<br>
          Skills: ${plan.skillArea.join(", ")}
        </div>

        <h2>Learning Objectives</h2>
        <ul>${plan.learningObjectives.map((o) => `<li>${o}</li>`).join("")}</ul>

        <h2>Success Criteria</h2>
        <ul>${plan.successCriteria.map((s) => `<li>${s}</li>`).join("")}</ul>

        <h2>Activities</h2>
        ${plan.activities.map((a) => `
          <div class="activity">
            <div class="activity-header">${a.phase} — ${a.duration} min</div>
            <p>${a.description}</p>
          </div>
        `).join("")}

        <h2>Teaching Aids</h2>
        <p>${plan.teachingAids.map((a) => `<span class="tag">${a}</span>`).join("")}</p>

        <h2>Moral Values</h2>
        <p>${plan.moralValues.map((v) => `<span class="tag">${v}</span>`).join("")}</p>

        <h2>CCE (Cross-Curricular Elements)</h2>
        <p>${plan.cce.map((c) => `<span class="tag">${c}</span>`).join("")}</p>

        <div class="footer">
          Generated by ERPH MoE — eRPH for Malaysian English Teachers
        </div>
      </body>
      </html>
    `)
    printWindow.document.close()
    printWindow.focus()
    printWindow.print()
  }, [plan])

  const phaseToIcon: Record<string, typeof Lightbulb> = {
    "Set Induction": Lightbulb,
    "Pre-lesson": GraduationCap,
    "Lesson Development": BookOpen,
    "Post-lesson": CheckSquare,
    "Closure": Target,
  }

  const phaseToColor: Record<string, string> = {
    "Set Induction": "text-amber-600 bg-amber-50 dark:bg-amber-950/30 dark:text-amber-400",
    "Pre-lesson": "text-blue-600 bg-blue-50 dark:bg-blue-950/30 dark:text-blue-400",
    "Lesson Development": "text-green-600 bg-green-50 dark:bg-green-950/30 dark:text-green-400",
    "Post-lesson": "text-purple-600 bg-purple-50 dark:bg-purple-950/30 dark:text-purple-400",
    "Closure": "text-rose-600 bg-rose-50 dark:bg-rose-950/30 dark:text-rose-400",
  }

  return (
    <Card className="overflow-hidden border-l-4 border-l-primary transition-shadow hover:shadow-md">
      {/* ── Header ── */}
      <CardHeader
        className="cursor-pointer pb-3"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-2">
            <button className="mt-0.5 shrink-0 text-muted-foreground">
              {expanded ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </button>
            <div>
              <CardTitle className="text-base leading-snug">{plan.title}</CardTitle>
              <p className="mt-1 text-xs text-muted-foreground">
                <Clock className="mr-1 inline h-3 w-3" />
                {plan.date} &middot; {plan.yearGroup} &middot; {plan.duration} min
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 sm:shrink-0">
            {plan.skillArea.map((s) => (
              <Badge key={s} variant="secondary" className="text-[10px]">
                {s}
              </Badge>
            ))}
          </div>
        </div>
      </CardHeader>

      {/* ── Collapsed Summary ── */}
      {!expanded && (
        <CardContent className="pb-3 pt-0">
          <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
            <span className="font-medium">Theme:</span> {plan.theme}
            <span className="font-medium">Topic:</span> {plan.topic || "—"}
            {plan.weekNumber && <><span className="font-medium">Week:</span> {plan.weekNumber}</>}
            {plan.month && <><span className="font-medium">Month:</span> {plan.month}</>}
          </div>
        </CardContent>
      )}

      {/* ── Expanded Content ── */}
      {expanded && (
        <CardContent className="space-y-6 pt-0">
          <Separator />

          {/* Learning Objectives */}
          <section>
            <h4 className="mb-2 flex items-center gap-1.5 text-sm font-semibold">
              <Target className="h-4 w-4 text-primary" />
              Learning Objectives
            </h4>
            <ul className="space-y-1">
              {plan.learningObjectives.map((obj, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  {obj}
                </li>
              ))}
            </ul>
          </section>

          {/* Success Criteria */}
          <section>
            <h4 className="mb-2 flex items-center gap-1.5 text-sm font-semibold">
              <CheckSquare className="h-4 w-4 text-emerald-500" />
              Success Criteria
            </h4>
            <ul className="space-y-1">
              {plan.successCriteria.map((sc, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                  {sc}
                </li>
              ))}
            </ul>
          </section>

          {/* Activities Timeline */}
          <section>
            <h4 className="mb-3 flex items-center gap-1.5 text-sm font-semibold">
              <BookOpen className="h-4 w-4 text-primary" />
              Lesson Activities
            </h4>
            <div className="space-y-3">
              {plan.activities.map((act, i) => {
                const PhaseIcon = phaseToIcon[act.phase] ?? Lightbulb
                return (
                  <div key={act.id} className="relative flex gap-3">
                    {/* Timeline line */}
                    {i < plan.activities.length - 1 && (
                      <div className="absolute left-[15px] top-8 h-full w-px bg-border" />
                    )}
                    {/* Icon */}
                    <div className={cn(
                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
                      phaseToColor[act.phase]?.split(" ").slice(0, 2).join(" ") ?? "bg-muted text-muted-foreground",
                    )}>
                      <PhaseIcon className="h-4 w-4" />
                    </div>
                    {/* Content */}
                    <div className="min-w-0 flex-1 rounded-lg border bg-card p-3">
                      <div className="mb-1 flex items-center justify-between gap-2">
                        <span className="text-sm font-medium">{act.phase}</span>
                        <span className="shrink-0 text-xs text-muted-foreground">{act.duration} min</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{act.description}</p>
                      <div className="mt-2 grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                        <div><span className="font-medium text-foreground">Teacher:</span> {act.teacherRole}</div>
                        <div><span className="font-medium text-foreground">Students:</span> {act.studentRole}</div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </section>

          {/* Teaching Aids, Moral Values, CCE */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-lg border bg-card p-3">
              <h4 className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                <Wrench className="h-3.5 w-3.5" />
                Teaching Aids
              </h4>
              <div className="flex flex-wrap gap-1">
                {plan.teachingAids.map((aid) => (
                  <Badge key={aid} variant="outline" className="text-[10px]">{aid}</Badge>
                ))}
              </div>
            </div>
            <div className="rounded-lg border bg-card p-3">
              <h4 className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                <Heart className="h-3.5 w-3.5 text-rose-500" />
                Moral Values
              </h4>
              <div className="flex flex-wrap gap-1">
                {plan.moralValues.map((v) => (
                  <Badge key={v} variant="outline" className="text-[10px]">{v}</Badge>
                ))}
              </div>
            </div>
            <div className="rounded-lg border bg-card p-3">
              <h4 className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                <Globe className="h-3.5 w-3.5 text-primary" />
                CCE
              </h4>
              <div className="flex flex-wrap gap-1">
                {plan.cce.map((c) => (
                  <Badge key={c} variant="outline" className="text-[10px]">{c}</Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-2 pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleExportPDF}
            >
              <FileDown className="mr-1.5 h-4 w-4" />
              Export PDF
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopy}
            >
              {copied ? (
                <><Check className="mr-1.5 h-4 w-4 text-emerald-500" /> Copied</>
              ) : (
                <><Copy className="mr-1.5 h-4 w-4" /> Copy</>
              )}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(plan)}
            >
              <Pencil className="mr-1.5 h-4 w-4" />
              Edit
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="ml-auto text-destructive hover:text-destructive"
              onClick={() => onDelete(plan.id)}
            >
              <Trash2 className="mr-1.5 h-4 w-4" />
              Delete
            </Button>
          </div>
        </CardContent>
      )}
    </Card>
  )
}

/* ─── Main Dashboard Page ────────────────────────────── */

export default function DashboardPage() {
  const pathname = usePathname()
  const router = useRouter()
  const { state, addLessonPlan, deleteLessonPlan, updateLessonPlan } = useStore()

  const [generatorOpen, setGeneratorOpen] = useState(false)
  const [generatorMode, setGeneratorMode] = useState<"daily" | "weekly" | "monthly">("daily")
  const [editingPlan, setEditingPlan] = useState<LessonPlan | null>(null)
  const [editOpen, setEditOpen] = useState(false)

  const activeTab = pathname.includes("/dashboard") ? "dashboard" : "dashboard"

  const dailyPlans = state.lessonPlans.filter((p) => !p.weekNumber && !p.month)
  const weeklyPlans = state.lessonPlans.filter((p) => p.weekNumber)
  const monthlyPlans = state.lessonPlans.filter((p) => p.month && !p.weekNumber)

  const handleGenerate = (plan: LessonPlan) => {
    addLessonPlan(plan)
  }

  const handleEdit = (plan: LessonPlan) => {
    setEditingPlan(plan)
    setEditOpen(true)
  }

  const handleSaveEdit = (plan: LessonPlan) => {
    updateLessonPlan(plan.id, plan)
    setEditOpen(false)
    setEditingPlan(null)
  }

  const openGenerator = (mode: "daily" | "weekly" | "monthly") => {
    setGeneratorMode(mode)
    setGeneratorOpen(true)
  }

  const counts = {
    daily: dailyPlans.length,
    weekly: weeklyPlans.length,
    monthly: monthlyPlans.length,
  }

  const total = state.lessonPlans.length

  return (
    <div className="space-y-8">
      {/* ── Header ── */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Lesson Plans</h1>
          <p className="mt-2 text-muted-foreground">
            Generate, view, and manage your English lesson plans aligned with the DSKP curriculum.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">
            {total} plan{total !== 1 ? "s" : ""} saved
          </span>
        </div>
      </div>

      {/* ── Quick Stats ── */}
      <div className="grid grid-cols-3 gap-3">
        {(["daily", "weekly", "monthly"] as const).map((mode) => (
          <button
            key={mode}
            onClick={() => openGenerator(mode)}
            className="group relative overflow-hidden rounded-xl border bg-card p-4 text-left transition-all hover:border-primary/50 hover:shadow-md"
          >
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {mode}
              </span>
              <span className="text-2xl font-bold tabular-nums">{counts[mode]}</span>
            </div>
            <div className="flex items-center gap-1.5 text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
              <Sparkles className="h-3.5 w-3.5" />
              Generate {mode}
            </div>
          </button>
        ))}
      </div>

      {/* ── Tabs & Plans ── */}
      <Tabs value={activeTab} className="space-y-6">
        <TabsList className="w-full sm:w-auto">
          <TabsTrigger value="dashboard" className="gap-2">
            <BookOpen className="h-4 w-4" />
            All Plans
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-8">
          {/* Daily */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Daily Lesson Plans</h2>
              <Button size="sm" onClick={() => openGenerator("daily")}>
                <Sparkles className="mr-1.5 h-4 w-4" />
                Generate Daily
              </Button>
            </div>
            {dailyPlans.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-xl border border-dashed py-12 text-center">
                <BookOpen className="mb-3 h-8 w-8 text-muted-foreground/50" />
                <p className="text-sm text-muted-foreground">No daily lesson plans yet.</p>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-3"
                  onClick={() => openGenerator("daily")}
                >
                  <Sparkles className="mr-1.5 h-4 w-4" />
                  Create Your First Plan
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {dailyPlans.map((plan) => (
                  <LessonPlanCard
                    key={plan.id}
                    plan={plan}
                    onDelete={deleteLessonPlan}
                    onEdit={handleEdit}
                  />
                ))}
              </div>
            )}
          </section>

          <Separator />

          {/* Weekly */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Weekly Lesson Plans</h2>
              <Button size="sm" onClick={() => openGenerator("weekly")}>
                <Sparkles className="mr-1.5 h-4 w-4" />
                Generate Weekly
              </Button>
            </div>
            {weeklyPlans.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-xl border border-dashed py-12 text-center">
                <BookOpen className="mb-3 h-8 w-8 text-muted-foreground/50" />
                <p className="text-sm text-muted-foreground">No weekly lesson plans yet.</p>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-3"
                  onClick={() => openGenerator("weekly")}
                >
                  <Sparkles className="mr-1.5 h-4 w-4" />
                  Create Your First Week
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {weeklyPlans.map((plan) => (
                  <LessonPlanCard
                    key={plan.id}
                    plan={plan}
                    onDelete={deleteLessonPlan}
                    onEdit={handleEdit}
                  />
                ))}
              </div>
            )}
          </section>

          <Separator />

          {/* Monthly */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Monthly Lesson Plans</h2>
              <Button size="sm" onClick={() => openGenerator("monthly")}>
                <Sparkles className="mr-1.5 h-4 w-4" />
                Generate Monthly
              </Button>
            </div>
            {monthlyPlans.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-xl border border-dashed py-12 text-center">
                <BookOpen className="mb-3 h-8 w-8 text-muted-foreground/50" />
                <p className="text-sm text-muted-foreground">No monthly lesson plans yet.</p>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-3"
                  onClick={() => openGenerator("monthly")}
                >
                  <Sparkles className="mr-1.5 h-4 w-4" />
                  Plan Your Month
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {monthlyPlans.map((plan) => (
                  <LessonPlanCard
                    key={plan.id}
                    plan={plan}
                    onDelete={deleteLessonPlan}
                    onEdit={handleEdit}
                  />
                ))}
              </div>
            )}
          </section>
        </TabsContent>
      </Tabs>

      {/* ── Generator Dialog ── */}
      <GeneratorDialog
        open={generatorOpen}
        onClose={() => setGeneratorOpen(false)}
        onGenerate={handleGenerate}
        mode={generatorMode}
      />

      {/* ── Edit Dialog ── */}
      <EditDialog
        plan={editingPlan}
        open={editOpen}
        onClose={() => { setEditOpen(false); setEditingPlan(null) }}
        onSave={handleSaveEdit}
      />
    </div>
  )
}
