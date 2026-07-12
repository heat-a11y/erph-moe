/* ============================================================
 * ERPH MoE — Malaysian MOE English Curriculum Data Model
 * ============================================================
 * Accurately maps the DSKP Content & Learning Standards,
 * Textbook units (Superminds, Get Smart Plus, English Plus 1,
 * Academy Stars), Scheme of Work, and timetable structure
 * for Years 1–6.
 * ============================================================ */

/* ──── Core Enums / Literals ──────────────────────────── */

export type YearGroup =
  | "Year 1"
  | "Year 2"
  | "Year 3"
  | "Year 4"
  | "Year 5"
  | "Year 6"

export type SkillArea =
  | "Listening"
  | "Speaking"
  | "Reading"
  | "Writing"
  | "Language Arts"

export type Theme =
  | "World of Self, Family and Friends"
  | "World of Stories"
  | "World of Knowledge"
  | "World of Arts"

export type DayOfWeek = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday"

export type ContentStandardCategory =
  | "Sounds and Pronunciation"
  | "Understanding Meaning"
  | "Communication"
  | "Reading Comprehension"
  | "Writing Conventions"
  | "Creative Expression"
  | "Critical Response"

/* ──── Textbook ──────────────────────────────────────── */

export interface Textbook {
  id: string
  title: string
  subtitle: string
  publisher: string
  yearPublished: number
  isbn: string
  yearGroups: YearGroup[]
  imageUrl?: string
}

/* ──── Textbook Unit ─────────────────────────────────── */

export interface TextbookUnit {
  id: string
  textbookId: string
  unitNumber: number
  title: string
  subtitle?: string
  theme: Theme
  yearGroup: YearGroup
  pageRange?: { start: number; end: number }
  coreVocabulary: string[]
  languageFocus: string[]
  topics: UnitTopic[]
}

/* ──── Unit Topic ────────────────────────────────────── */

export interface UnitTopic {
  id: string
  title: string
  skillAreas: SkillArea[]
  learningStandardRefs: LearningStandardRef[]
}

/* ──── Standard References ───────────────────────────── */

export interface ContentStandardRef {
  code: string
  description: string
}

export interface LearningStandardRef {
  code: string
  description: string
  contentStandardCode: string
}

/* ──── Full Content Standard ─────────────────────────── */

export interface ContentStandard {
  id: string
  code: string
  description: string
  skillArea: SkillArea
  category: ContentStandardCategory
  learningStandards: LearningStandard[]
}

/* ──── Full Learning Standard ────────────────────────── */

export interface LearningStandard {
  id: string
  code: string
  description: string
  contentStandardCode: string
  skillArea: SkillArea
  yearGroups: YearGroup[]
}

/* ──── Scheme of Work ───────────────────────────────── */

export interface SoWWeekRange {
  weekStart: number
  weekEnd: number
  unitId: string
  unitTitle: string
}

export interface SoWEntry {
  id: string
  week: number
  yearGroup: YearGroup
  textbookUnitId: string
  topicId: string
  learningStandardCodes: string[]
  contentStandardCodes: string[]
  suggestedActivities: string[]
  notes?: string
}

/* ──── Timetable (Split-Slot Support) ───────────────── */

export interface PeriodDefinition {
  number: number
  label: string
  defaultStartPart1: string
  defaultEndPart1: string
  defaultStartPart2: string
  defaultEndPart2: string
}

export type SessionPart = 1 | 2

export interface TimetableSlot {
  id: string
  day: DayOfWeek
  period: number
  part: SessionPart
  startTime: string
  endTime: string
  yearGroup: YearGroup
  subject: string
}

/* ──── Year-Level Curriculum Bundle ─────────────────── */

export interface YearCurriculum {
  yearGroup: YearGroup
  textbook: Textbook
  units: TextbookUnit[]
  themes: Theme[]
  contentStandards: ContentStandard[]
  learningStandards: LearningStandard[]
  sowWeekRanges: SoWWeekRange[]
  sow: SoWEntry[]
}

/* ──── Complete Curriculum Database ─────────────────── */

export interface MoECurriculum {
  textbooks: Textbook[]
  units: TextbookUnit[]
  contentStandards: ContentStandard[]
  learningStandards: LearningStandard[]
  sow: SoWEntry[]
  periodDefinitions: PeriodDefinition[]
}

/* ──── Lookup Helpers ───────────────────────────────── */

export interface UnitWithStandards {
  unit: TextbookUnit
  contentStandards: ContentStandard[]
  learningStandards: LearningStandard[]
}

export interface StandardLookup {
  getContentStandard(code: string, yearGroup: YearGroup): ContentStandard | undefined
  getLearningStandard(code: string): LearningStandard | undefined
  getStandardsForUnit(unitId: string): UnitWithStandards | undefined
  getStandardsForYear(yearGroup: YearGroup): ContentStandard[]
  getSoWForYear(yearGroup: YearGroup): SoWEntry[]
}
