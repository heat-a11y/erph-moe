"use client"

import { useState } from "react"
import { BookOpen, Search, BookText, Map, GitBranch } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import moeCurriculum, {
  textbooks,
  units,
  csWithLS,
  learningStandards,
  lookup,
  exampleUnitStandards,
  themesByYear,
  sow,
} from "@/data/moeCurriculum"
import type { YearGroup, SkillArea, ContentStandard, LearningStandard, TextbookUnit, SoWEntry } from "@/types"

const yearGroups: YearGroup[] = ["Year 1", "Year 2", "Year 3", "Year 4", "Year 5", "Year 6"]
const skillAreas: SkillArea[] = ["Listening", "Speaking", "Reading", "Writing", "Language Arts"]

function TextbookCard({ yearGroup }: { yearGroup: YearGroup }) {
  const tb = lookup.getTextbookForYear(yearGroup)
  if (!tb) return null

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <BookText className="h-5 w-5 text-primary" />
          <CardTitle className="text-lg">{tb.title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-1 text-sm">
        <p><span className="font-medium">Subtitle:</span> {tb.subtitle}</p>
        <p><span className="font-medium">Publisher:</span> {tb.publisher} ({tb.yearPublished})</p>
        <p><span className="font-medium">ISBN:</span> {tb.isbn}</p>
        <p><span className="font-medium">Years:</span> {tb.yearGroups.join(", ")}</p>
      </CardContent>
    </Card>
  )
}

function UnitList({ yearGroup }: { yearGroup: YearGroup }) {
  const yearUnits = lookup.getUnitsForYear(yearGroup)
  const [expandedUnit, setExpandedUnit] = useState<string | null>(null)

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
        Units ({yearUnits.length})
      </h3>
      {yearUnits.map((unit) => (
        <Card
          key={unit.id}
          className="cursor-pointer transition-colors hover:border-primary/30"
          onClick={() => setExpandedUnit(expandedUnit === unit.id ? null : unit.id)}
        >
          <CardHeader className="py-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-sm">
                  Unit {unit.unitNumber}: {unit.title}
                </CardTitle>
                <p className="text-xs text-muted-foreground mt-0.5">{unit.theme}</p>
              </div>
              <span className="rounded bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                pp. {unit.pageRange?.start}–{unit.pageRange?.end}
              </span>
            </div>
          </CardHeader>
          {expandedUnit === unit.id && (
            <CardContent className="space-y-3 pt-0">
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                  Core Vocabulary
                </h4>
                <div className="flex flex-wrap gap-1">
                  {unit.coreVocabulary.map((v) => (
                    <span key={v} className="rounded bg-secondary px-2 py-0.5 text-xs">
                      {v}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                  Language Focus
                </h4>
                <ul className="list-disc list-inside text-xs text-muted-foreground space-y-0.5">
                  {unit.languageFocus.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                  Topics
                </h4>
                <div className="space-y-2">
                  {unit.topics.map((topic) => (
                    <div key={topic.id} className="rounded border p-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium">{topic.title}</span>
                        <div className="flex gap-1">
                          {topic.skillAreas.map((s) => (
                            <span
                              key={s}
                              className="rounded bg-primary/5 px-1.5 py-0.5 text-[10px] text-primary"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="mt-1 flex flex-wrap gap-1">
                        {topic.learningStandardRefs.map((ref) => (
                          <span
                            key={ref.code}
                            className="rounded bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground"
                            title={ref.description}
                          >
                            {ref.code}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          )}
        </Card>
      ))}
    </div>
  )
}

function ContentStandardsView({ yearGroup, searchQuery }: { yearGroup: YearGroup; searchQuery: string }) {
  const yearLS = learningStandards.filter((ls) => ls.yearGroups.includes(yearGroup))
  const grouped = csWithLS
    .map((cs) => ({
      ...cs,
      learningStandards: cs.learningStandards.filter((ls) =>
        ls.yearGroups.includes(yearGroup),
      ),
    }))
    .filter((cs) => cs.learningStandards.length > 0)

  const filtered = searchQuery
    ? grouped.filter(
        (cs) =>
          cs.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
          cs.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          cs.learningStandards.some(
            (ls) =>
              ls.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
              ls.description.toLowerCase().includes(searchQuery.toLowerCase()),
          ),
      )
    : grouped

  return (
    <div className="space-y-4">
      {skillAreas.map((skill) => {
        const skillCS = filtered.filter((cs) => cs.skillArea === skill)
        if (skillCS.length === 0) return null

        return (
          <Card key={skill}>
            <CardHeader>
              <CardTitle className="text-sm">{skill}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {skillCS.map((cs) => (
                <div key={cs.id}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="rounded bg-primary/10 px-2 py-0.5 text-xs font-mono font-medium text-primary">
                      {cs.code}
                    </span>
                    <span className="text-sm">{cs.description}</span>
                  </div>
                  <div className="ml-4 space-y-0.5">
                    {cs.learningStandards.map((ls) => (
                      <div
                        key={ls.id}
                        className={`flex items-start gap-2 text-sm ${
                          searchQuery &&
                          (ls.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            ls.description.toLowerCase().includes(searchQuery.toLowerCase()))
                            ? "bg-yellow-50 dark:bg-yellow-950/20 rounded px-1 -mx-1"
                            : ""
                        }`}
                      >
                        <span className="font-mono text-xs text-muted-foreground min-w-[4.5rem]">
                          {ls.code}
                        </span>
                        <span className="text-muted-foreground">{ls.description}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

function SoWView({ yearGroup }: { yearGroup: YearGroup }) {
  const yearSow = lookup.getSoWForYear(yearGroup)

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
        Scheme of Work — {yearSow.length} weeks planned
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-left">
              <th className="px-3 py-2 font-medium">Week</th>
              <th className="px-3 py-2 font-medium">Unit</th>
              <th className="px-3 py-2 font-medium">Learning Standards</th>
              <th className="px-3 py-2 font-medium">Content Standards</th>
            </tr>
          </thead>
          <tbody>
            {yearSow.map((entry) => {
              const unit = units.find((u) => u.id === entry.textbookUnitId)
              return (
                <tr key={entry.id} className="border-b last:border-0 hover:bg-muted/50">
                  <td className="px-3 py-2 font-mono text-xs">W{entry.week}</td>
                  <td className="px-3 py-2 font-medium">{unit?.title ?? entry.textbookUnitId}</td>
                  <td className="px-3 py-2">
                    <div className="flex flex-wrap gap-1">
                      {entry.learningStandardCodes.map((code) => (
                        <span
                          key={code}
                          className="rounded bg-primary/5 px-1.5 py-0.5 text-[10px] text-primary font-mono"
                        >
                          {code}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-3 py-2">
                    <div className="flex flex-wrap gap-1">
                      {entry.contentStandardCodes.map((code) => (
                        <span
                          key={code}
                          className="rounded bg-secondary px-1.5 py-0.5 text-[10px] text-muted-foreground font-mono"
                        >
                          {code}
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function ExampleMapping() {
  const { unit, contentStandards, learningStandards, sowWeekRange } = exampleUnitStandards

  return (
    <Card className="border-primary/20 bg-primary/5">
      <CardHeader>
        <div className="flex items-center gap-2">
          <GitBranch className="h-5 w-5 text-primary" />
          <CardTitle className="text-base">
            Example: Year 3, Unit 5 — "{unit.title}"
          </CardTitle>
        </div>
        <p className="text-xs text-muted-foreground">
          How a textbook unit maps to DSKP Content Standards and Learning Standards
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
              Unit Details
            </h4>
            <div className="space-y-1 text-sm">
              <p><span className="font-medium">Theme:</span> {unit.theme}</p>
              <p><span className="font-medium">Year Group:</span> {unit.yearGroup}</p>
              <p><span className="font-medium">SoW Weeks:</span> {sowWeekRange.weekStart}–{sowWeekRange.weekEnd}</p>
            </div>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
              Topics &amp; Standards
            </h4>
            {unit.topics.map((topic) => (
              <div key={topic.id} className="mb-2 rounded border bg-background p-2">
                <p className="text-sm font-medium">{topic.title}</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {topic.learningStandardRefs.map((ref) => (
                    <span
                      key={ref.code}
                      className="rounded bg-primary/10 px-1.5 py-0.5 text-[10px] text-primary font-mono"
                      title={`${ref.code}: ${ref.description}`}
                    >
                      {ref.code}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
            Standard Descriptions
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {contentStandards.map((cs) => (
              <div key={cs.code} className="rounded border bg-background p-2">
                <span className="rounded bg-primary/10 px-1.5 py-0.5 text-[10px] font-mono text-primary">
                  {cs.code}
                </span>
                <span className="ml-2 text-sm text-muted-foreground">{cs.description}</span>
                <div className="mt-1 space-y-0.5">
                  {learningStandards
                    .filter((ls) => ls.contentStandardCode === cs.code)
                    .map((ls) => (
                      <div key={ls.code} className="pl-4 text-xs text-muted-foreground">
                        <span className="font-mono">{ls.code}</span> — {ls.description}
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function CurriculumPage() {
  const [yearGroup, setYearGroup] = useState<YearGroup>("Year 3")
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Curriculum Reference</h1>
        <p className="mt-2 text-muted-foreground">
          Complete DSKP Content &amp; Learning Standards, textbook unit mappings, and
          Scheme of Work for the Malaysian primary English curriculum (Years 1–6).
        </p>
      </div>

      <Card>
        <CardContent className="flex flex-col sm:flex-row gap-4 pt-6">
          <div className="flex-1 space-y-1.5">
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
          <div className="flex-1 space-y-1.5">
            <Label>Search Standards</Label>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by code or description..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <TextbookCard yearGroup={yearGroup} />

      <Tabs defaultValue="standards" className="space-y-6">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="standards" className="gap-2">
            <BookOpen className="h-4 w-4" />
            DSKP Standards
          </TabsTrigger>
          <TabsTrigger value="units" className="gap-2">
            <BookText className="h-4 w-4" />
            Textbook Units
          </TabsTrigger>
          <TabsTrigger value="sow" className="gap-2">
            <Map className="h-4 w-4" />
            Scheme of Work
          </TabsTrigger>
        </TabsList>

        <TabsContent value="standards" className="space-y-6">
          <ContentStandardsView yearGroup={yearGroup} searchQuery={searchQuery} />
        </TabsContent>

        <TabsContent value="units" className="space-y-6">
          <UnitList yearGroup={yearGroup} />
        </TabsContent>

        <TabsContent value="sow" className="space-y-6">
          <SoWView yearGroup={yearGroup} />
        </TabsContent>
      </Tabs>

      <ExampleMapping />
    </div>
  )
}
