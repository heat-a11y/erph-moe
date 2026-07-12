"use client"

import { useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { Sparkles, Trash2, ChevronDown, ChevronRight } from "lucide-react"
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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { useStore } from "@/lib/store"
import type { LessonPlan, YearGroup, SkillArea, Theme } from "@/types"

const yearGroups: YearGroup[] = ["Year 1", "Year 2", "Year 3", "Year 4", "Year 5", "Year 6"]
const skillAreas: SkillArea[] = ["Listening", "Speaking", "Reading", "Writing", "Language Arts"]
const themes: Theme[] = [
  "World of Self, Family and Friends",
  "World of Stories",
  "World of Knowledge",
  "World of Arts",
]

function generateId(): string {
  return crypto.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`
}

function emptyPlan(overrides?: Partial<LessonPlan>): LessonPlan {
  return {
    id: generateId(),
    title: "",
    yearGroup: "Year 1",
    subject: "English",
    theme: "World of Self, Family and Friends",
    topic: "",
    skillArea: ["Reading"],
    date: new Date().toISOString().split("T")[0],
    duration: 60,
    learningObjectives: [],
    successCriteria: [],
    teachingAids: [],
    activities: [],
    moralValues: [],
    cce: [],
    ...overrides,
  }
}

function LessonPlanCard({
  plan,
  onDelete,
}: {
  plan: LessonPlan
  onDelete: (id: string) => void
}) {
  const [expanded, setExpanded] = useState(false)

  return (
    <Card>
      <CardHeader className="cursor-pointer" onClick={() => setExpanded(!expanded)}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {expanded ? (
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            ) : (
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            )}
            <CardTitle className="text-base">{plan.title || "Untitled Plan"}</CardTitle>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">{plan.date}</span>
            <span className="rounded bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
              {plan.yearGroup}
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-destructive"
              onClick={(e) => {
                e.stopPropagation()
                onDelete(plan.id)
              }}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      {expanded && (
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium">Topic:</span> {plan.topic || "—"}
            </div>
            <div>
              <span className="font-medium">Theme:</span> {plan.theme}
            </div>
            <div>
              <span className="font-medium">Skills:</span> {plan.skillArea.join(", ")}
            </div>
            <div>
              <span className="font-medium">Duration:</span> {plan.duration} min
            </div>
          </div>

          {plan.learningObjectives.length > 0 && (
            <div>
              <h4 className="text-sm font-medium mb-1">Learning Objectives</h4>
              <ul className="list-disc list-inside text-sm text-muted-foreground">
                {plan.learningObjectives.map((obj, i) => (
                  <li key={i}>{obj}</li>
                ))}
              </ul>
            </div>
          )}

          {plan.activities.length > 0 && (
            <div>
              <h4 className="text-sm font-medium mb-1">Activities</h4>
              <div className="space-y-2">
                {plan.activities.map((act) => (
                  <div key={act.id} className="rounded border p-3 text-sm">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-primary">{act.phase}</span>
                      <span className="text-xs text-muted-foreground">{act.duration} min</span>
                    </div>
                    <p className="text-muted-foreground">{act.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      )}
    </Card>
  )
}

function GeneratorForm({
  onGenerate,
  mode,
}: {
  onGenerate: (plan: LessonPlan) => void
  mode: "daily" | "weekly" | "monthly"
}) {
  const [yearGroup, setYearGroup] = useState<YearGroup>("Year 1")
  const [theme, setTheme] = useState<Theme>("World of Self, Family and Friends")
  const [topic, setTopic] = useState("")
  const [skillArea, setSkillArea] = useState<SkillArea>("Reading")

  const handleGenerate = () => {
    const plan = emptyPlan({
      yearGroup,
      theme,
      topic,
      skillArea: [skillArea],
      title: `${mode === "daily" ? "Daily" : mode === "weekly" ? "Weekly" : "Monthly"} Lesson Plan - ${topic || theme}`,
      ...(mode === "weekly" ? { weekNumber: 1 } : {}),
      ...(mode === "monthly" ? { month: new Date().toLocaleString("default", { month: "long" }) } : {}),
      activities: [
        {
          id: generateId(),
          phase: "Set Induction",
          description: `Engage students with a warm-up activity related to ${topic || theme}`,
          duration: 10,
          teacherRole: "Facilitator",
          studentRole: "Participant",
        },
        {
          id: generateId(),
          phase: "Lesson Development",
          description: `Main teaching and learning activities for ${topic || theme}`,
          duration: 35,
          teacherRole: "Instructor",
          studentRole: "Learner",
        },
        {
          id: generateId(),
          phase: "Closure",
          description: "Review and summarize key learning points",
          duration: 15,
          teacherRole: "Facilitator",
          studentRole: "Participant",
        },
      ],
      learningObjectives: [
        `By the end of the lesson, pupils will be able to ${skillArea.toLowerCase()} at least 3 items related to ${topic || theme}.`,
      ],
      successCriteria: ["Pupils can identify key vocabulary", "Pupils can respond to simple questions"],
      teachingAids: ["Whiteboard", "Worksheets", "Picture cards"],
      moralValues: ["Cooperation", "Respect"],
      cce: ["Language", "Creativity"],
    })
    onGenerate(plan)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">
          {mode === "daily"
            ? "Generate Daily Lesson Plan"
            : mode === "weekly"
              ? "Generate Weekly Lesson Plans"
              : "Generate Monthly Lesson Plans"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-1.5">
            <Label>Year Group</Label>
            <Select value={yearGroup} onValueChange={(v) => setYearGroup(v as YearGroup)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {yearGroups.map((y) => (
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
                {themes.map((t) => (
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
                {skillAreas.map((s) => (
                  <SelectItem key={s} value={s}>{s}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button onClick={handleGenerate} className="mt-4 w-full sm:w-auto">
          <Sparkles className="mr-2 h-4 w-4" />
          Generate {mode === "daily" ? "Lesson Plan" : mode === "weekly" ? "Weekly Plans" : "Monthly Plans"}
        </Button>
      </CardContent>
    </Card>
  )
}

export default function LessonPlansPage() {
  const pathname = usePathname()
  const router = useRouter()
  const { state, addLessonPlan, deleteLessonPlan } = useStore()

  const activeTab = pathname.endsWith("/weekly")
    ? "weekly"
    : pathname.endsWith("/monthly")
      ? "monthly"
      : "daily"

  const dailyPlans = state.lessonPlans.filter((p) => !p.weekNumber && !p.month)
  const weeklyPlans = state.lessonPlans.filter((p) => p.weekNumber)
  const monthlyPlans = state.lessonPlans.filter((p) => p.month && !p.weekNumber)

  const handleTabChange = (value: string) => {
    const path =
      value === "daily"
        ? "/lesson-plans"
        : `/lesson-plans/${value}`
    router.push(path)
  }

  const handleGenerate = (mode: "daily" | "weekly" | "monthly") => (plan: LessonPlan) => {
    addLessonPlan(plan)
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Lesson Plans</h1>
        <p className="mt-2 text-muted-foreground">
          Generate and manage your English lesson plans aligned with the DSKP curriculum.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-6">
        <TabsList>
          <TabsTrigger value="daily">Daily</TabsTrigger>
          <TabsTrigger value="weekly">Weekly</TabsTrigger>
          <TabsTrigger value="monthly">Monthly</TabsTrigger>
        </TabsList>

        <TabsContent value="daily" className="space-y-6">
          <GeneratorForm onGenerate={handleGenerate("daily")} mode="daily" />
          {dailyPlans.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">
              No daily lesson plans yet. Generate your first one above.
            </p>
          ) : (
            <div className="space-y-3">
              {dailyPlans.map((plan) => (
                <LessonPlanCard key={plan.id} plan={plan} onDelete={deleteLessonPlan} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="weekly" className="space-y-6">
          <GeneratorForm onGenerate={handleGenerate("weekly")} mode="weekly" />
          {weeklyPlans.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">
              No weekly lesson plans yet.
            </p>
          ) : (
            <div className="space-y-3">
              {weeklyPlans.map((plan) => (
                <LessonPlanCard key={plan.id} plan={plan} onDelete={deleteLessonPlan} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="monthly" className="space-y-6">
          <GeneratorForm onGenerate={handleGenerate("monthly")} mode="monthly" />
          {monthlyPlans.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">
              No monthly lesson plans yet.
            </p>
          ) : (
            <div className="space-y-3">
              {monthlyPlans.map((plan) => (
                <LessonPlanCard key={plan.id} plan={plan} onDelete={deleteLessonPlan} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
