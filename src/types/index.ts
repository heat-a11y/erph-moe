export type YearGroup = "Year 1" | "Year 2" | "Year 3" | "Year 4" | "Year 5" | "Year 6"

export type Subject = "English"

export type Theme =
  | "World of Self, Family and Friends"
  | "World of Stories"
  | "World of Knowledge"
  | "World of Arts"

export type Unit = {
  id: string
  name: string
  theme: Theme
  yearGroup: YearGroup
}

export type Topic = {
  id: string
  name: string
  unitId: string
  contentStandards: string[]
  learningStandards: string[]
}

export type SkillArea = "Listening" | "Speaking" | "Reading" | "Writing" | "Language Arts"

export type LessonPlan = {
  id: string
  title: string
  yearGroup: YearGroup
  subject: Subject
  theme: Theme
  topic: string
  skillArea: SkillArea[]
  date: string
  duration: number
  learningObjectives: string[]
  successCriteria: string[]
  teachingAids: string[]
  activities: Activity[]
  moralValues: string[]
  cce: string[]
  reflection?: string
  weekNumber?: number
  month?: string
}

export type Activity = {
  id: string
  phase: "Set Induction" | "Pre-lesson" | "Lesson Development" | "Post-lesson" | "Closure"
  description: string
  duration: number
  teacherRole: string
  studentRole: string
}

export type TimetableSlot = {
  id: string
  day: DayOfWeek
  period: number
  startTime: string
  endTime: string
  yearGroup: YearGroup
  subject: Subject
}

export type DayOfWeek = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday"

export type CurriculumStandard = {
  id: string
  code: string
  description: string
  yearGroup: YearGroup
  skillArea: SkillArea
  type: "Content Standard" | "Learning Standard"
}

export type DSKP = {
  id: string
  yearGroup: YearGroup
  skillArea: SkillArea
  contentStandards: string[]
  learningStandards: string[]
}

export interface StoreState {
  timetable: TimetableSlot[]
  lessonPlans: LessonPlan[]
  curriculumDSKP: DSKP[]
  settings: {
    schoolName: string
    teacherName: string
    defaultDuration: number
  }
}
