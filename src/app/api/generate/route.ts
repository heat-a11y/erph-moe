import { NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import { lookup } from "@/data/moeCurriculum"
import type { YearGroup, TimetableSlot } from "@/types"

/* ─── Request Schema ────────────────────────────────── */

interface GenerateRequest {
  yearGroup: YearGroup
  theme?: string
  topic?: string
  skillArea?: string[]
  mode: "daily" | "weekly" | "monthly"
  weekNumber?: number
  month?: string
  timetableSlots?: TimetableSlot[]
  unitId?: string
}

/* ─── Gold-Standard Example Prompt ───────────────────── */

const GOLD_STANDARD_EXAMPLE = `
--- BEGIN EXAMPLE ---

MINGGU: 13-15 | TAHUN: 3 | TEMA: World of Self, Family and Friends

HARI: Isnin        TARIKH: 14/07/2026      MASA: 8:15 - 9:15 (Part 1)
                                             11:05 - 11:35 (Part 2)
KELAS: 3 Cemerlang                            BIL. MURID: 30

UNIT: 5 - My New House            TOPIK: There's / There are Practice

STANDARD KANDUNGAN (Content Standards):
3.2  Read and understand simple texts
4.2  Write using appropriate language and format

STANDARD PEMBELAJARAN (Learning Standards):
3.2.3  Read and understand simple paragraphs
4.2.1  Complete simple texts with missing words
4.2.2  Write short simple texts with guidance

OBJEKTIF PEMBELAJARAN (Learning Objectives):
By the end of the lesson, pupils will be able to:
1. Read and identify at least 4 out of 6 items in a short paragraph about a house.
2. Complete a cloze passage about a house with at least 3 out of 5 missing words correctly.
3. Write 2-3 simple sentences describing their own house using "There's" or "There are" with guidance.

KRITERIA KEJAYAAN (Success Criteria):
1. I can read the paragraph and point to the furniture/rooms mentioned.
2. I can fill in the blanks with the correct words from the word bank.
3. I can write two sentences about my house using the correct structure.

--- PART 1 (8:15 - 9:15 | 60 min) ---

SET INDUCTION (10 min): "My House Song"
- Play a recording or sing together to the tune of "Frère Jacques" (Capo 3, chords: C, F, G7)
  Lyrics: "This is my house, this is my house / Kitchen, bedroom, living room / Bathroom and a garden / Come and see, come and see!"
- Show a picture of a house and elicit what rooms pupils can name.
- Teacher asks: "What rooms can you see in the picture?" and "What is your favourite room?"

PRE-LESSON (10 min): Vocabulary Flashcard Drill
- Show flashcards: living room, bedroom, kitchen, bathroom, dining room, garden.
- Choral repetition → individual repetition.
- Game: "What's Missing?" – remove one card, pupils guess the missing room.

LESSON DEVELOPMENT (25 min): Reading & Comprehension
[Differentiated Process]
- Advanced Group: Read a 5-sentence paragraph about a house independently and answer 4 comprehension questions (Wh-questions).
- Standard Group: Read the same paragraph with teacher guidance (choral reading) and answer 3 multiple-choice questions.
- Low-Readiness Group: Read 2-3 simplified sentences with picture support and match sentences to pictures.

- Pupils highlight key vocabulary (rooms, furniture) in the text.
- Pair work: Pupils ask and answer "Is there a ...?" / "Are there any ...?" based on the text.

POST-LESSON (15 min): There's / There are Worksheet
- Pupils complete a worksheet with two sections:
  Section A: Circle the correct word (There's / There are) to complete 5 sentences.
  Section B: Fill in the blanks using words from the word bank.

--- PART 2 (11:05 - 11:35 | 30 min) ---

LESSON DEVELOPMENT (20 min): Writing My Dream House
[Differentiated Product]
- Advanced Group: Write 4-5 sentences describing their dream house, including rooms and furniture. Use both "There's" and "There are".
- Standard Group: Complete 3 sentence starters about their house (e.g., "In my house, there's a ___").
- Low-Readiness Group: Draw and label 3 rooms in their house with teacher-provided word cards.
- Gallery Walk: Pupils display work and visit peers' desks to see their dream houses.

CLOSURE (10 min): "Hangman" Review Game
- Play Hangman using key vocabulary from the lesson (bedroom, garden, kitchen, etc.).
- Teacher asks: "What did we learn today?" and "What is your favourite room in your house?"
- Pupils complete exit ticket: "One new word I learned today is ______."
- Teacher notes: _______________________________ (reflection)

ALATAN / BANTUAN MENGAJAR (Teaching Aids):
1. Flashcards (rooms of the house)
2. Audio player and song lyrics
3. Reading comprehension worksheet (differentiated)
4. There's / There are practice worksheet
5. Coloured pencils and drawing paper
6. Word cards

NILAI MURNI (Moral Values):
1. Cooperation – pair and group work
2. Appreciation – respecting others' dream houses
3. Responsibility – completing tasks on time

EMK (Elemen Merentas Kurikulum / CCE):
1. Language – reading and writing skills
2. Creativity and Innovation – designing dream house
3. Science and Technology – understanding different types of houses

REFLEKSI GURU:
_________________________

--- END EXAMPLE ---
`

/* ─── Build Curriculum Context ───────────────────────── */

function buildCurriculumContext(yearGroup: YearGroup, topic?: string, unitId?: string): string {
  const textbook = lookup.getTextbookForYear(yearGroup)
  const units = lookup.getUnitsForYear(yearGroup)
  const sow = lookup.getSoWForYear(yearGroup)

  const lines: string[] = []
  lines.push(`=== CURRICULUM DATA ===`)
  lines.push(`Year Group: ${yearGroup}`)

  if (textbook) {
    lines.push(`Textbook: ${textbook.title} — ${textbook.subtitle} (${textbook.publisher})`)
  }

  lines.push(``)
  lines.push(`Available Units:`)
  for (const unit of units) {
    const isMatch = unitId ? unit.id === unitId : topic ? unit.title.toLowerCase().includes(topic.toLowerCase()) || unit.topics.some((t) => t.title.toLowerCase().includes(topic.toLowerCase())) : false
    lines.push(`  ${isMatch ? "→" : " "} Unit ${unit.unitNumber}: "${unit.title}" (Theme: ${unit.theme})`)
    for (const t of unit.topics) {
      const refs = t.learningStandardRefs.map((r) => r.code).join(", ")
      lines.push(`       - Topic: "${t.title}" | Skills: ${t.skillAreas.join(", ")} | LS: ${refs}`)
    }
  }

  lines.push(``)
  lines.push(`Scheme of Work (${yearGroup}):`)
  for (const entry of sow.slice(0, 5)) {
    const unit = units.find((u) => u.id === entry.textbookUnitId)
    const lsCodes = entry.learningStandardCodes.join(", ")
    const csCodes = entry.contentStandardCodes.join(", ")
    lines.push(`  Week ${entry.week}: ${unit?.title ?? "—"} | CS: ${csCodes} | LS: ${lsCodes}`)
  }

  lines.push(``)
  lines.push(`Content Standards & Learning Standards:`)
  const seen = new Set<string>()
  for (const unit of units) {
    for (const topic of unit.topics) {
      for (const ref of topic.learningStandardRefs) {
        if (!seen.has(ref.code)) {
          seen.add(ref.code)
          lines.push(`  ${ref.code}: ${ref.description} (CS: ${ref.contentStandardCode})`)
        }
      }
    }
  }

  return lines.join("\n")
}

/* ─── Build Timetable Context ────────────────────────── */

function buildTimetableContext(slots: TimetableSlot[], yearGroup: YearGroup): string {
  const filtered = slots.filter((s) => s.yearGroup === yearGroup)
  if (filtered.length === 0) return ""

  const grouped: Record<string, TimetableSlot[]> = {}
  for (const slot of filtered) {
    const key = `${slot.day} Period ${slot.period}`
    if (!grouped[key]) grouped[key] = []
    grouped[key].push(slot)
  }

  const lines: string[] = [``, `=== YOUR TIMETABLE FOR ${yearGroup.toUpperCase()} ===`]
  for (const [key, slots] of Object.entries(grouped)) {
    for (const slot of slots) {
      const part = slot.part ? `(Part ${slot.part})` : ""
      lines.push(`  ${key} ${part}: ${slot.startTime} - ${slot.endTime}`)
    }
  }

  return lines.join("\n")
}

/* ─── Route Handler ─────────────────────────────────── */

export async function POST(request: NextRequest) {
  try {
    const body: GenerateRequest = await request.json()

    const { yearGroup, theme, topic, skillArea, mode, weekNumber, month, timetableSlots, unitId } = body

    if (!yearGroup) {
      return NextResponse.json({ error: "yearGroup is required" }, { status: 400 })
    }

    const apiKey = process.env.OPENAI_API_KEY
    if (!apiKey) {
      return NextResponse.json(
        {
          error: "OPENAI_API_KEY is not configured. Add it to your .env.local file.",
          hint: "Get a key at https://platform.openai.com/api-keys",
        },
        { status: 500 },
      )
    }

    const curriculumContext = buildCurriculumContext(yearGroup, topic, unitId)
    const timetableContext = timetableSlots ? buildTimetableContext(timetableSlots, yearGroup) : ""

    const weekStr = weekNumber ? `Week ${weekNumber}` : ""
    const monthStr = month ?? ""
    const timeFrame = mode === "daily" ? "a single day" : mode === "weekly" ? `a week (${weekStr})` : `a month (${monthStr})`

    const userPrompt = [
      `Generate a ${mode} lesson plan for ${yearGroup} ${yearGroup} English class.`,
      topic ? `Topic or theme context: ${topic}` : "",
      theme ? `Theme: ${theme}` : "",
      skillArea ? `Skill focus: ${skillArea.join(", ")}` : "",
      monthStr ? `Month: ${monthStr}` : "",
      weekStr ? `Week: ${weekStr}` : "",
      ``,
      `The lesson plan is for ${timeFrame}.`,
      timetableContext ? `The class has the following timetable slots:${timetableContext}` : "",
      ``,
      `Use the curriculum data below to select appropriate Content Standards and Learning Standards.`,
      `Format the output in the exact style of the gold-standard example provided in the system prompt.`,
      `Include interactive elements, differentiated activities for advanced/standard/low-readiness groups, and a closure game.`,
    ]
      .filter(Boolean)
      .join("\n")

    const fullSystemPrompt = `You are an expert Malaysian Primary School English Lesson Plan Generator. Your task is to output highly structured, professional ${mode} lesson plans based exactly on the provided Malaysian MOE DSKP, Scheme of Work (SoW), and standard textbooks (Superminds Y1/Y2, Get Smart Plus Y3/Y4, English Plus 1 Y5, Academy Stars Y6).

Strict Layout Requirements:
1. Header Info: Day, Date, Time (reflecting splits accurately), Class, Topic (Unit & Title), Content Standards, and Learning Standards.
2. Learning Objectives: Must be measurable and criteria-based (e.g., "at least 3 out of 5").
3. Learning Activities:
   - Creative Element / Hook: Include interactive elements such as songs complete with guitar chords (e.g., Capo 2, G, D, Em, Cadd9) matching the unit theme if applicable.
   - Part 1 & Part 2 Breakdowns: Split activities explicitly according to the user's daily timetable time blocks.
   - Differentiation Strategy: Explicitly label tiered tasks with \`[Differentiated Process]\` or \`[Differentiated Product]\` for advanced, standard, and low-readiness groups.
   - Closure & Reflection: Include an interactive wrap-up game (e.g., Hangman) and a blank markdown line for teacher reflection.

Use the following sample as your gold-standard benchmark for formatting, tone, and depth:
${GOLD_STANDARD_EXAMPLE}

${curriculumContext}

IMPORTANT: Output the lesson plan in Markdown format. Use headings, bullet points, and bold text for structure. Include the blank reflection line at the end.`

    const { text } = await generateText({
      model: openai("gpt-4o"),
      system: fullSystemPrompt,
      prompt: userPrompt,
      temperature: 0.7,
    })

    return NextResponse.json({ markdown: text })
  } catch (error) {
    console.error("Generate API error:", error)

    if (error instanceof SyntaxError) {
      return NextResponse.json({ error: "Invalid JSON in request body" }, { status: 400 })
    }

    const message = error instanceof Error ? error.message : "Unknown error"
    return NextResponse.json(
      {
        error: "Failed to generate lesson plan",
        detail: message,
      },
      { status: 500 },
    )
  }
}
