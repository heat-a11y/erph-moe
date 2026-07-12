"use client"

import { useState } from "react"
import { BookOpen, Search } from "lucide-react"
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
import type { YearGroup, SkillArea } from "@/types"

const yearGroups: YearGroup[] = ["Year 1", "Year 2", "Year 3", "Year 4", "Year 5", "Year 6"]
const skillAreas: SkillArea[] = ["Listening", "Speaking", "Reading", "Writing", "Language Arts"]

const curriculumData: Record<YearGroup, Record<SkillArea, { cs: string[]; ls: string[] }>> = {
  "Year 1": {
    Listening: {
      cs: ["1.1 Recognise and reproduce target language sounds"],
      ls: [
        "1.1.1 Recognise and reproduce with support a limited range of high-frequency target language phonemes",
        "1.1.2 Listen and respond to simple questions",
      ],
    },
    Speaking: {
      cs: ["2.1 Communicate simple information clearly"],
      ls: [
        "2.1.1 Give simple personal details using basic statements",
        "2.1.2 Find out about personal details using basic questions",
      ],
    },
    Reading: {
      cs: ["3.1 Recognise words in linear and non-linear texts"],
      ls: [
        "3.1.1 Identify and distinguish the letters of the alphabet",
        "3.1.2 Recognise high-frequency words",
      ],
    },
    Writing: {
      cs: ["4.1 Form letters and words in neat legible print"],
      ls: [
        "4.1.1 Write letters of the alphabet in clear and legible print",
        "4.1.2 Copy simple words and phrases",
      ],
    },
    "Language Arts": {
      cs: ["5.1 Enjoy and appreciate rhymes, poems and songs"],
      ls: [
        "5.1.1 Demonstrate appreciation through non-verbal responses to simple rhymes and songs",
        "5.1.2 Participate in action songs and rhymes",
      ],
    },
  },
  "Year 2": {
    Listening: {
      cs: ["1.2 Understand meaning in a variety of familiar contexts"],
      ls: [
        "1.2.1 Listen to and respond to simple spoken texts",
        "1.2.2 Follow simple instructions",
      ],
    },
    Speaking: {
      cs: ["2.2 Communicate appropriately in formal and informal situations"],
      ls: [
        "2.2.1 Ask for and give simple clarifications",
        "2.2.2 Describe people and objects using simple language",
      ],
    },
    Reading: {
      cs: ["3.2 Read and understand simple texts"],
      ls: [
        "3.2.1 Read simple fiction and non-fiction texts",
        "3.2.2 Understand the main idea of simple texts",
      ],
    },
    Writing: {
      cs: ["4.2 Write using appropriate language and format"],
      ls: [
        "4.2.1 Write simple sentences with guidance",
        "4.2.2 Complete simple texts with missing words",
      ],
    },
    "Language Arts": {
      cs: ["5.2 Respond imaginatively to literary texts"],
      ls: [
        "5.2.1 Respond to simple stories with guidance",
        "5.2.2 Act out characters in simple stories",
      ],
    },
  },
  "Year 3": {
    Listening: {
      cs: ["1.3 Recognise and understand key information in spoken texts"],
      ls: [
        "1.3.1 Listen to and understand key information in short spoken texts",
        "1.3.2 Identify main ideas in short spoken texts",
      ],
    },
    Speaking: {
      cs: ["2.3 Speak with appropriate pronunciation and intonation"],
      ls: [
        "2.3.1 Speak clearly with guidance",
        "2.3.2 Express opinions about familiar topics",
      ],
    },
    Reading: {
      cs: ["3.3 Read and understand a variety of texts"],
      ls: [
        "3.3.1 Read and understand simple paragraphs",
        "3.3.2 Use context clues to understand word meanings",
      ],
    },
    Writing: {
      cs: ["4.3 Write with guidance for different purposes"],
      ls: [
        "4.3.1 Write short simple texts with guidance",
        "4.3.2 Use basic punctuation correctly",
      ],
    },
    "Language Arts": {
      cs: ["5.3 Appreciate and respond to stories and poems"],
      ls: [
        "5.3.1 Respond to stories and poems creatively",
        "5.3.2 Perform simple role-plays",
      ],
    },
  },
  "Year 4": {
    Listening: {
      cs: ["1.4 Understand longer spoken texts and identify main ideas"],
      ls: [
        "1.4.1 Listen to and understand longer spoken texts",
        "1.4.2 Identify supporting details in spoken texts",
      ],
    },
    Speaking: {
      cs: ["2.4 Communicate with confidence in formal and informal contexts"],
      ls: [
        "2.4.1 Participate in simple discussions",
        "2.4.2 Give reasons for simple opinions",
      ],
    },
    Reading: {
      cs: ["3.4 Read and understand a wide range of texts"],
      ls: [
        "3.4.1 Understand a variety of text types",
        "3.4.2 Locate information from non-fiction texts",
      ],
    },
    Writing: {
      cs: ["4.4 Write with guidance to create short texts"],
      ls: [
        "4.4.1 Write simple paragraphs with guidance",
        "4.4.2 Use appropriate vocabulary in writing",
      ],
    },
    "Language Arts": {
      cs: ["5.4 Analyse and appreciate literary works"],
      ls: [
        "5.4.1 Identify characters and settings in stories",
        "5.4.2 Sequence events in stories",
      ],
    },
  },
  "Year 5": {
    Listening: {
      cs: ["1.5 Understand and respond to a range of spoken texts"],
      ls: [
        "1.5.1 Understand main ideas and details in spoken texts",
        "1.5.2 Make inferences from spoken texts",
      ],
    },
    Speaking: {
      cs: ["2.5 Speak fluently and confidently in various situations"],
      ls: [
        "2.5.1 Give detailed descriptions and opinions",
        "2.5.2 Justify opinions and preferences",
      ],
    },
    Reading: {
      cs: ["3.5 Read and interpret a wide range of texts critically"],
      ls: [
        "3.5.1 Understand implied meaning in texts",
        "3.5.2 Compare and contrast information from different sources",
      ],
    },
    Writing: {
      cs: ["4.5 Write for various purposes using appropriate language"],
      ls: [
        "4.5.1 Write coherent paragraphs using appropriate tenses",
        "4.5.2 Draft and revise simple compositions",
      ],
    },
    "Language Arts": {
      cs: ["5.5 Respond critically and creatively to literary texts"],
      ls: [
        "5.5.1 Analyse story elements in literary texts",
        "5.5.2 Create simple literary works",
      ],
    },
  },
  "Year 6": {
    Listening: {
      cs: ["1.6 Understand and respond to complex spoken texts"],
      ls: [
        "1.6.1 Understand implied and explicit information in spoken texts",
        "1.6.2 Summarise information from spoken texts",
      ],
    },
    Speaking: {
      cs: ["2.6 Speak effectively in a range of formal and informal contexts"],
      ls: [
        "2.6.1 Present ideas and opinions coherently",
        "2.6.2 Participate in formal discussions and debates",
      ],
    },
    Reading: {
      cs: ["3.6 Read and evaluate a variety of texts independently"],
      ls: [
        "3.6.1 Evaluate information critically from different sources",
        "3.6.2 Draw conclusions from reading materials",
      ],
    },
    Writing: {
      cs: ["4.6 Write independently for various purposes"],
      ls: [
        "4.6.1 Write extended texts using organisational structure",
        "4.6.2 Edit and improve written work independently",
      ],
    },
    "Language Arts": {
      cs: ["5.6 Appreciate and respond critically to a range of literary texts"],
      ls: [
        "5.6.1 Analyse themes and messages in literary texts",
        "5.6.2 Produce creative literary works independently",
      ],
    },
  },
}

function CurriculumView({ yearGroup }: { yearGroup: YearGroup }) {
  const data = curriculumData[yearGroup]

  return (
    <div className="space-y-4">
      {skillAreas.map((skill) => (
        <Card key={skill}>
          <CardHeader>
            <CardTitle className="text-sm">{skill}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                Content Standards
              </h4>
              <ul className="space-y-1">
                {data[skill].cs.map((c, i) => (
                  <li key={i} className="text-sm pl-3 border-l-2 border-primary/30">
                    {c}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                Learning Standards
              </h4>
              <ul className="space-y-1">
                {data[skill].ls.map((l, i) => (
                  <li key={i} className="text-sm pl-3 border-l-2 border-primary/30">
                    {l}
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default function CurriculumPage() {
  const [yearGroup, setYearGroup] = useState<YearGroup>("Year 1")
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Curriculum Reference</h1>
        <p className="mt-2 text-muted-foreground">
          Browse the DSKP Content and Learning Standards for the Malaysian primary English curriculum.
        </p>
      </div>

      <Card>
        <CardContent className="flex flex-col sm:flex-row gap-4 pt-6">
          <div className="flex-1 space-y-1.5">
            <Label>Year Group</Label>
            <Select
              value={yearGroup}
              onValueChange={(v) => setYearGroup(v as YearGroup)}
            >
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
            <Label>Search</Label>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search standards..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <CurriculumView yearGroup={yearGroup} />
    </div>
  )
}
