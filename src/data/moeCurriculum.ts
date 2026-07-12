/* ============================================================
 * ERPH MoE — Malaysian MOE English Curriculum Seed Data
 * ============================================================
 * Complete DSKP Content & Learning Standards, textbook unit
 * mappings, and Scheme of Work outline for Years 1–6.
 *
 * Textbooks:
 *   Y1–Y2: Superminds (Cambridge University Press)
 *   Y3–Y4: Get Smart Plus 4 (MM Publications)
 *   Y5:    English Plus 1 (Oxford University Press)
 *   Y6:    Academy Stars (Macmillan Education)
 * ============================================================ */

import type {
  MoECurriculum,
  Textbook,
  TextbookUnit,
  UnitTopic,
  ContentStandard,
  LearningStandard,
  SoWEntry,
  PeriodDefinition,
  YearGroup,
  SkillArea,
  Theme,
  ContentStandardRef,
  LearningStandardRef,
} from "@/types/curriculum"

/* ──── Period Definitions (Standard Malaysian Primary) ─── */

export const periodDefinitions: PeriodDefinition[] = [
  { number: 1, label: "Period 1", defaultStartPart1: "07:45", defaultEndPart1: "08:15", defaultStartPart2: "", defaultEndPart2: "" },
  { number: 2, label: "Period 2", defaultStartPart1: "08:15", defaultEndPart1: "09:15", defaultStartPart2: "11:05", defaultEndPart2: "11:35" },
  { number: 3, label: "Period 3", defaultStartPart1: "09:15", defaultEndPart1: "10:15", defaultStartPart2: "11:35", defaultEndPart2: "12:05" },
  { number: 4, label: "Period 4", defaultStartPart1: "10:15", defaultEndPart1: "10:45", defaultStartPart2: "12:05", defaultEndPart2: "12:35" },
  { number: 5, label: "Period 5", defaultStartPart1: "10:45", defaultEndPart1: "11:45", defaultStartPart2: "12:35", defaultEndPart2: "13:05" },
  { number: 6, label: "Period 6", defaultStartPart1: "11:45", defaultEndPart1: "12:45", defaultStartPart2: "13:05", defaultEndPart2: "13:35" },
]

/* ──── Textbooks ──────────────────────────────────────── */

export const textbooks: Textbook[] = [
  {
    id: "superminds-1",
    title: "Superminds",
    subtitle: "Student's Book 1",
    publisher: "Cambridge University Press",
    yearPublished: 2012,
    isbn: "978-1-107-69696-7",
    yearGroups: ["Year 1"],
  },
  {
    id: "superminds-2",
    title: "Superminds",
    subtitle: "Student's Book 2",
    publisher: "Cambridge University Press",
    yearPublished: 2013,
    isbn: "978-1-107-69698-1",
    yearGroups: ["Year 2"],
  },
  {
    id: "get-smart-plus-3",
    title: "Get Smart Plus 3",
    subtitle: "Student's Book",
    publisher: "MM Publications",
    yearPublished: 2018,
    isbn: "978-960-573-887-3",
    yearGroups: ["Year 3"],
  },
  {
    id: "get-smart-plus-4",
    title: "Get Smart Plus 4",
    subtitle: "Student's Book",
    publisher: "MM Publications",
    yearPublished: 2019,
    isbn: "978-960-573-888-0",
    yearGroups: ["Year 4"],
  },
  {
    id: "english-plus-1",
    title: "English Plus 1",
    subtitle: "Student's Book (2nd Edition)",
    publisher: "Oxford University Press",
    yearPublished: 2016,
    isbn: "978-0-19-420159-1",
    yearGroups: ["Year 5"],
  },
  {
    id: "academy-stars-1",
    title: "Academy Stars",
    subtitle: "Student's Book 1",
    publisher: "Macmillan Education",
    yearPublished: 2017,
    isbn: "978-1-380-00652-7",
    yearGroups: ["Year 6"],
  },
]

/* ──── Content Standards (DSKP) ───────────────────────── */
/* These span across years; each year applies a subset.    */

export const contentStandards: ContentStandard[] = [
  // ── Listening ──
  {
    id: "cs-1.1",
    code: "1.1",
    description: "Recognise and reproduce target language sounds",
    skillArea: "Listening",
    category: "Sounds and Pronunciation",
    learningStandards: [],
  },
  {
    id: "cs-1.2",
    code: "1.2",
    description: "Understand meaning in a variety of familiar contexts",
    skillArea: "Listening",
    category: "Understanding Meaning",
    learningStandards: [],
  },
  {
    id: "cs-1.3",
    code: "1.3",
    description: "Recognise and understand key information in spoken texts",
    skillArea: "Listening",
    category: "Understanding Meaning",
    learningStandards: [],
  },
  // ── Speaking ──
  {
    id: "cs-2.1",
    code: "2.1",
    description: "Communicate simple information clearly",
    skillArea: "Speaking",
    category: "Communication",
    learningStandards: [],
  },
  {
    id: "cs-2.2",
    code: "2.2",
    description: "Communicate appropriately in formal and informal situations",
    skillArea: "Speaking",
    category: "Communication",
    learningStandards: [],
  },
  {
    id: "cs-2.3",
    code: "2.3",
    description: "Speak with appropriate pronunciation, rhythm and intonation",
    skillArea: "Speaking",
    category: "Communication",
    learningStandards: [],
  },
  // ── Reading ──
  {
    id: "cs-3.1",
    code: "3.1",
    description: "Recognise words in linear and non-linear texts",
    skillArea: "Reading",
    category: "Reading Comprehension",
    learningStandards: [],
  },
  {
    id: "cs-3.2",
    code: "3.2",
    description: "Read and understand simple texts",
    skillArea: "Reading",
    category: "Reading Comprehension",
    learningStandards: [],
  },
  {
    id: "cs-3.3",
    code: "3.3",
    description: "Read and understand a variety of texts",
    skillArea: "Reading",
    category: "Reading Comprehension",
    learningStandards: [],
  },
  // ── Writing ──
  {
    id: "cs-4.1",
    code: "4.1",
    description: "Form letters and words in neat legible print",
    skillArea: "Writing",
    category: "Writing Conventions",
    learningStandards: [],
  },
  {
    id: "cs-4.2",
    code: "4.2",
    description: "Write using appropriate language and format",
    skillArea: "Writing",
    category: "Writing Conventions",
    learningStandards: [],
  },
  {
    id: "cs-4.3",
    code: "4.3",
    description: "Write with guidance for different purposes",
    skillArea: "Writing",
    category: "Writing Conventions",
    learningStandards: [],
  },
  // ── Language Arts ──
  {
    id: "cs-5.1",
    code: "5.1",
    description: "Enjoy and appreciate rhymes, poems and songs",
    skillArea: "Language Arts",
    category: "Creative Expression",
    learningStandards: [],
  },
  {
    id: "cs-5.2",
    code: "5.2",
    description: "Respond imaginatively to literary texts",
    skillArea: "Language Arts",
    category: "Creative Expression",
    learningStandards: [],
  },
  {
    id: "cs-5.3",
    code: "5.3",
    description: "Appreciate and respond to stories and poems",
    skillArea: "Language Arts",
    category: "Critical Response",
    learningStandards: [],
  },
]

/* ──── Learning Standards (DSKP) ─────────────────────── */
/* Each learning standard is tagged with applicable years  */

export const learningStandards: LearningStandard[] = [
  // ── 1.1 Recognise and reproduce target language sounds ──
  { id: "ls-1.1.1", code: "1.1.1", description: "Recognise and reproduce with support a limited range of high-frequency target language phonemes", contentStandardCode: "1.1", skillArea: "Listening", yearGroups: ["Year 1", "Year 2"] },
  { id: "ls-1.1.2", code: "1.1.2", description: "Listen and respond to simple questions", contentStandardCode: "1.1", skillArea: "Listening", yearGroups: ["Year 1", "Year 2", "Year 3"] },
  { id: "ls-1.1.3", code: "1.1.3", description: "Recognise and reproduce with support a wide range of target language phonemes", contentStandardCode: "1.1", skillArea: "Listening", yearGroups: ["Year 3", "Year 4"] },
  // ── 1.2 Understand meaning in a variety of familiar contexts ──
  { id: "ls-1.2.1", code: "1.2.1", description: "Listen to and respond to simple spoken texts", contentStandardCode: "1.2", skillArea: "Listening", yearGroups: ["Year 1", "Year 2"] },
  { id: "ls-1.2.2", code: "1.2.2", description: "Follow simple instructions", contentStandardCode: "1.2", skillArea: "Listening", yearGroups: ["Year 1", "Year 2", "Year 3"] },
  { id: "ls-1.2.3", code: "1.2.3", description: "Give accurate instructions to others", contentStandardCode: "1.2", skillArea: "Listening", yearGroups: ["Year 4", "Year 5", "Year 6"] },
  { id: "ls-1.2.4", code: "1.2.4", description: "Understand longer sequences of spoken instructions", contentStandardCode: "1.2", skillArea: "Listening", yearGroups: ["Year 4", "Year 5", "Year 6"] },
  // ── 1.3 Recognise and understand key information in spoken texts ──
  { id: "ls-1.3.1", code: "1.3.1", description: "Listen to and understand key information in short spoken texts", contentStandardCode: "1.3", skillArea: "Listening", yearGroups: ["Year 3", "Year 4"] },
  { id: "ls-1.3.2", code: "1.3.2", description: "Identify main ideas in short spoken texts", contentStandardCode: "1.3", skillArea: "Listening", yearGroups: ["Year 3", "Year 4", "Year 5"] },
  { id: "ls-1.3.3", code: "1.3.3", description: "Listen to and understand longer spoken texts", contentStandardCode: "1.3", skillArea: "Listening", yearGroups: ["Year 5", "Year 6"] },
  { id: "ls-1.3.4", code: "1.3.4", description: "Identify supporting details in spoken texts", contentStandardCode: "1.3", skillArea: "Listening", yearGroups: ["Year 5", "Year 6"] },
  // ── 2.1 Communicate simple information clearly ──
  { id: "ls-2.1.1", code: "2.1.1", description: "Give simple personal details using basic statements", contentStandardCode: "2.1", skillArea: "Speaking", yearGroups: ["Year 1", "Year 2"] },
  { id: "ls-2.1.2", code: "2.1.2", description: "Find out about personal details using basic questions", contentStandardCode: "2.1", skillArea: "Speaking", yearGroups: ["Year 1", "Year 2"] },
  { id: "ls-2.1.3", code: "2.1.3", description: "Express simple feelings and emotions", contentStandardCode: "2.1", skillArea: "Speaking", yearGroups: ["Year 1", "Year 2", "Year 3"] },
  // ── 2.2 Communicate appropriately in formal and informal situations ──
  { id: "ls-2.2.1", code: "2.2.1", description: "Ask for and give simple clarifications", contentStandardCode: "2.2", skillArea: "Speaking", yearGroups: ["Year 2", "Year 3"] },
  { id: "ls-2.2.2", code: "2.2.2", description: "Describe people and objects using simple language", contentStandardCode: "2.2", skillArea: "Speaking", yearGroups: ["Year 2", "Year 3"] },
  { id: "ls-2.2.3", code: "2.2.3", description: "Give reasons for simple opinions", contentStandardCode: "2.2", skillArea: "Speaking", yearGroups: ["Year 3", "Year 4", "Year 5"] },
  { id: "ls-2.2.4", code: "2.2.4", description: "Participate in simple discussions", contentStandardCode: "2.2", skillArea: "Speaking", yearGroups: ["Year 4", "Year 5", "Year 6"] },
  // ── 2.3 Speak with appropriate pronunciation, rhythm and intonation ──
  { id: "ls-2.3.1", code: "2.3.1", description: "Speak clearly with guidance", contentStandardCode: "2.3", skillArea: "Speaking", yearGroups: ["Year 3", "Year 4"] },
  { id: "ls-2.3.2", code: "2.3.2", description: "Express opinions about familiar topics", contentStandardCode: "2.3", skillArea: "Speaking", yearGroups: ["Year 3", "Year 4", "Year 5"] },
  { id: "ls-2.3.3", code: "2.3.3", description: "Give detailed descriptions and opinions", contentStandardCode: "2.3", skillArea: "Speaking", yearGroups: ["Year 5", "Year 6"] },
  { id: "ls-2.3.4", code: "2.3.4", description: "Present ideas and opinions coherently", contentStandardCode: "2.3", skillArea: "Speaking", yearGroups: ["Year 6"] },
  // ── 3.1 Recognise words in linear and non-linear texts ──
  { id: "ls-3.1.1", code: "3.1.1", description: "Identify and distinguish the letters of the alphabet", contentStandardCode: "3.1", skillArea: "Reading", yearGroups: ["Year 1"] },
  { id: "ls-3.1.2", code: "3.1.2", description: "Recognise high-frequency words", contentStandardCode: "3.1", skillArea: "Reading", yearGroups: ["Year 1", "Year 2"] },
  { id: "ls-3.1.3", code: "3.1.3", description: "Read and recognise a range of familiar words", contentStandardCode: "3.1", skillArea: "Reading", yearGroups: ["Year 2", "Year 3"] },
  // ── 3.2 Read and understand simple texts ──
  { id: "ls-3.2.1", code: "3.2.1", description: "Read simple fiction and non-fiction texts", contentStandardCode: "3.2", skillArea: "Reading", yearGroups: ["Year 2", "Year 3"] },
  { id: "ls-3.2.2", code: "3.2.2", description: "Understand the main idea of simple texts", contentStandardCode: "3.2", skillArea: "Reading", yearGroups: ["Year 2", "Year 3"] },
  { id: "ls-3.2.3", code: "3.2.3", description: "Read and understand simple paragraphs", contentStandardCode: "3.2", skillArea: "Reading", yearGroups: ["Year 3", "Year 4"] },
  // ── 3.3 Read and understand a variety of texts ──
  { id: "ls-3.3.1", code: "3.3.1", description: "Understand a variety of text types", contentStandardCode: "3.3", skillArea: "Reading", yearGroups: ["Year 4", "Year 5"] },
  { id: "ls-3.3.2", code: "3.3.2", description: "Locate information from non-fiction texts", contentStandardCode: "3.3", skillArea: "Reading", yearGroups: ["Year 4", "Year 5"] },
  { id: "ls-3.3.3", code: "3.3.3", description: "Understand implied meaning in texts", contentStandardCode: "3.3", skillArea: "Reading", yearGroups: ["Year 5", "Year 6"] },
  { id: "ls-3.3.4", code: "3.3.4", description: "Evaluate information critically from different sources", contentStandardCode: "3.3", skillArea: "Reading", yearGroups: ["Year 6"] },
  // ── 4.1 Form letters and words in neat legible print ──
  { id: "ls-4.1.1", code: "4.1.1", description: "Write letters of the alphabet in clear and legible print", contentStandardCode: "4.1", skillArea: "Writing", yearGroups: ["Year 1"] },
  { id: "ls-4.1.2", code: "4.1.2", description: "Copy simple words and phrases", contentStandardCode: "4.1", skillArea: "Writing", yearGroups: ["Year 1", "Year 2"] },
  { id: "ls-4.1.3", code: "4.1.3", description: "Write simple sentences with guidance", contentStandardCode: "4.1", skillArea: "Writing", yearGroups: ["Year 2", "Year 3"] },
  // ── 4.2 Write using appropriate language and format ──
  { id: "ls-4.2.1", code: "4.2.1", description: "Complete simple texts with missing words", contentStandardCode: "4.2", skillArea: "Writing", yearGroups: ["Year 2", "Year 3"] },
  { id: "ls-4.2.2", code: "4.2.2", description: "Write short simple texts with guidance", contentStandardCode: "4.2", skillArea: "Writing", yearGroups: ["Year 3", "Year 4"] },
  { id: "ls-4.2.3", code: "4.2.3", description: "Use basic punctuation correctly", contentStandardCode: "4.2", skillArea: "Writing", yearGroups: ["Year 3", "Year 4", "Year 5"] },
  // ── 4.3 Write with guidance for different purposes ──
  { id: "ls-4.3.1", code: "4.3.1", description: "Write simple paragraphs with guidance", contentStandardCode: "4.3", skillArea: "Writing", yearGroups: ["Year 4", "Year 5"] },
  { id: "ls-4.3.2", code: "4.3.2", description: "Use appropriate vocabulary in writing", contentStandardCode: "4.3", skillArea: "Writing", yearGroups: ["Year 4", "Year 5", "Year 6"] },
  { id: "ls-4.3.3", code: "4.3.3", description: "Write coherent paragraphs using appropriate tenses", contentStandardCode: "4.3", skillArea: "Writing", yearGroups: ["Year 5", "Year 6"] },
  { id: "ls-4.3.4", code: "4.3.4", description: "Write extended texts using organisational structure", contentStandardCode: "4.3", skillArea: "Writing", yearGroups: ["Year 6"] },
  // ── 5.1 Enjoy and appreciate rhymes, poems and songs ──
  { id: "ls-5.1.1", code: "5.1.1", description: "Demonstrate appreciation through non-verbal responses to simple rhymes and songs", contentStandardCode: "5.1", skillArea: "Language Arts", yearGroups: ["Year 1", "Year 2"] },
  { id: "ls-5.1.2", code: "5.1.2", description: "Participate in action songs and rhymes", contentStandardCode: "5.1", skillArea: "Language Arts", yearGroups: ["Year 1", "Year 2"] },
  // ── 5.2 Respond imaginatively to literary texts ──
  { id: "ls-5.2.1", code: "5.2.1", description: "Respond to simple stories with guidance", contentStandardCode: "5.2", skillArea: "Language Arts", yearGroups: ["Year 2", "Year 3"] },
  { id: "ls-5.2.2", code: "5.2.2", description: "Act out characters in simple stories", contentStandardCode: "5.2", skillArea: "Language Arts", yearGroups: ["Year 2", "Year 3"] },
  // ── 5.3 Appreciate and respond to stories and poems ──
  { id: "ls-5.3.1", code: "5.3.1", description: "Respond to stories and poems creatively", contentStandardCode: "5.3", skillArea: "Language Arts", yearGroups: ["Year 3", "Year 4"] },
  { id: "ls-5.3.2", code: "5.3.2", description: "Perform simple role-plays", contentStandardCode: "5.3", skillArea: "Language Arts", yearGroups: ["Year 3", "Year 4"] },
  { id: "ls-5.3.3", code: "5.3.3", description: "Analyse and appreciate literary works", contentStandardCode: "5.3", skillArea: "Language Arts", yearGroups: ["Year 4", "Year 5"] },
  { id: "ls-5.3.4", code: "5.3.4", description: "Create simple literary works", contentStandardCode: "5.3", skillArea: "Language Arts", yearGroups: ["Year 5", "Year 6"] },
  { id: "ls-5.3.5", code: "5.3.5", description: "Analyse themes and messages in literary texts", contentStandardCode: "5.3", skillArea: "Language Arts", yearGroups: ["Year 6"] },
]

/* ──── Helper: assign learning standards to CS objects ── */

function attachLearningStandards(csList: ContentStandard[], lsList: LearningStandard[]): ContentStandard[] {
  return csList.map((cs) => ({
    ...cs,
    learningStandards: lsList.filter((ls) => ls.contentStandardCode === cs.code),
  }))
}

/* ──── Helper: build learning standard references for a topic ── */

function lsRefs(yearGroup: YearGroup, skillArea: SkillArea, ...codes: string[]): LearningStandardRef[] {
  const all = learningStandards.filter(
    (ls) =>
      codes.includes(ls.code) &&
      ls.yearGroups.includes(yearGroup) &&
      ls.skillArea === skillArea,
  )
  return all.map((ls) => ({
    code: ls.code,
    description: ls.description,
    contentStandardCode: ls.contentStandardCode,
  }))
}

function csRefs(...codes: string[]): ContentStandardRef[] {
  const csMap = new Map(contentStandards.map((cs) => [cs.code, cs]))
  return codes.map((code) => {
    const cs = csMap.get(code)
    return { code, description: cs?.description ?? code }
  })
}

/* ──── Units by Year ────────────────────────────────── */

/* Shared topic factory */
function topic(
  id: string,
  title: string,
  skillAreas: SkillArea[],
  lsCodes: string[],
  yearGroup: YearGroup,
): UnitTopic {
  const allLS = learningStandards.filter(
    (ls) => lsCodes.includes(ls.code) && ls.yearGroups.includes(yearGroup),
  )
  const uniqueCS = new Set(allLS.map((ls) => ls.contentStandardCode))

  return {
    id,
    title,
    skillAreas,
    learningStandardRefs: allLS.map((ls) => ({
      code: ls.code,
      description: ls.description,
      contentStandardCode: ls.contentStandardCode,
    })),
  }
}

/* ──── YEAR 1: Superminds ───────────────────────────── */

const year1Units: TextbookUnit[] = [
  {
    id: "y1-u1", textbookId: "superminds-1", unitNumber: 1,
    title: "At School", theme: "World of Self, Family and Friends",
    yearGroup: "Year 1", coreVocabulary: ["book", "pen", "pencil", "ruler", "bag", "teacher", "friend"],
    languageFocus: ["What's this?", "It's a ...", "Imperatives (stand up, sit down)"],
    pageRange: { start: 4, end: 15 },
    topics: [
      topic("y1-u1-t1", "Classroom Objects", ["Listening", "Speaking"], ["1.1.1", "1.1.2", "2.1.1"], "Year 1"),
      topic("y1-u1-t2", "Classroom Instructions", ["Listening", "Speaking"], ["1.2.2", "2.1.1"], "Year 1"),
      topic("y1-u1-t3", "Alphabet A–M", ["Reading", "Writing"], ["3.1.1", "4.1.1"], "Year 1"),
    ],
  },
  {
    id: "y1-u2", textbookId: "superminds-1", unitNumber: 2,
    title: "Let's Play!", theme: "World of Self, Family and Friends",
    yearGroup: "Year 1", coreVocabulary: ["ball", "doll", "car", "train", "puzzle", "kite", "bike"],
    languageFocus: ["It's a (ball)", "Is it a (doll)?", "Yes/No short answers"],
    pageRange: { start: 16, end: 27 },
    topics: [
      topic("y1-u2-t1", "Toys Vocabulary", ["Listening", "Speaking"], ["1.1.1", "2.1.1"], "Year 1"),
      topic("y1-u2-t2", "Questions and Answers", ["Listening", "Speaking", "Reading"], ["1.1.2", "2.1.2", "3.1.1"], "Year 1"),
      topic("y1-u2-t3", "Alphabet N–Z", ["Reading", "Writing"], ["3.1.1", "4.1.1", "4.1.2"], "Year 1"),
    ],
  },
  {
    id: "y1-u3", textbookId: "superminds-1", unitNumber: 3,
    title: "Pet Show", theme: "World of Knowledge",
    yearGroup: "Year 1", coreVocabulary: ["cat", "dog", "hamster", "bird", "fish", "rabbit", "tortoise"],
    languageFocus: ["I've got a ...", "Have you got a ...?", "Yes, I have / No, I haven't"],
    pageRange: { start: 28, end: 39 },
    topics: [
      topic("y1-u3-t1", "Pet Names", ["Listening", "Speaking"], ["1.1.1", "2.1.1"], "Year 1"),
      topic("y1-u3-t2", "Describing Pets", ["Speaking", "Reading"], ["2.1.3", "3.1.2"], "Year 1"),
      topic("y1-u3-t3", "Short Sentences", ["Reading", "Writing"], ["3.1.2", "4.1.2"], "Year 1"),
    ],
  },
  {
    id: "y1-u4", textbookId: "superminds-1", unitNumber: 4,
    title: "Lunchtime", theme: "World of Self, Family and Friends",
    yearGroup: "Year 1", coreVocabulary: ["banana", "sandwich", "apple", "biscuit", "cake", "milk", "juice"],
    languageFocus: ["I've got ... / I haven't got ...", "Have you got ...?", "Numbers 1–10"],
    pageRange: { start: 40, end: 51 },
    topics: [
      topic("y1-u4-t1", "Food Vocabulary", ["Listening", "Speaking"], ["1.1.1", "2.1.1"], "Year 1"),
      topic("y1-u4-t2", "Expressing Likes", ["Speaking", "Reading"], ["2.1.3", "3.1.2"], "Year 1"),
      topic("y1-u4-t3", "Numbers", ["Reading", "Writing"], ["3.1.1", "4.1.1", "4.1.2"], "Year 1"),
    ],
  },
  {
    id: "y1-u5", textbookId: "superminds-1", unitNumber: 5,
    title: "Free Time", theme: "World of Self, Family and Friends",
    yearGroup: "Year 1", coreVocabulary: ["run", "jump", "swim", "dance", "sing", "clap", "stamp"],
    languageFocus: ["Can you ...?", "Yes, I can / No, I can't", "I can ..."],
    pageRange: { start: 52, end: 63 },
    topics: [
      topic("y1-u5-t1", "Action Verbs", ["Listening", "Speaking"], ["1.1.1", "2.1.1"], "Year 1"),
      topic("y1-u5-t2", "Expressing Ability", ["Speaking", "Reading"], ["2.1.3", "3.1.2"], "Year 1"),
      topic("y1-u5-t3", "Action Song", ["Language Arts"], ["5.1.1", "5.1.2"], "Year 1"),
    ],
  },
  {
    id: "y1-u6", textbookId: "superminds-1", unitNumber: 6,
    title: "The Old House", theme: "World of Stories",
    yearGroup: "Year 1", coreVocabulary: ["house", "door", "window", "roof", "kitchen", "bedroom", "garden"],
    languageFocus: ["Where's ...?", "It's in / on / under", "Prepositions of place"],
    pageRange: { start: 64, end: 75 },
    topics: [
      topic("y1-u6-t1", "Parts of a House", ["Listening", "Speaking"], ["1.1.1", "2.1.1"], "Year 1"),
      topic("y1-u6-t2", "Where Is It?", ["Listening", "Speaking", "Reading"], ["1.2.2", "2.1.2", "3.1.2"], "Year 1"),
      topic("y1-u6-t3", "A Story", ["Reading", "Language Arts"], ["3.1.2", "5.1.1"], "Year 1"),
    ],
  },
  {
    id: "y1-u7", textbookId: "superminds-1", unitNumber: 7,
    title: "Get Dressed!", theme: "World of Self, Family and Friends",
    yearGroup: "Year 1", coreVocabulary: ["T-shirt", "shorts", "skirt", "dress", "shoes", "hat", "socks"],
    languageFocus: ["I'm wearing ...", "He's/She's wearing ...", "Colours"],
    pageRange: { start: 76, end: 87 },
    topics: [
      topic("y1-u7-t1", "Clothes Vocabulary", ["Listening", "Speaking"], ["1.1.1", "2.1.1"], "Year 1"),
      topic("y1-u7-t2", "Describing Clothes", ["Speaking", "Reading", "Writing"], ["2.1.3", "3.1.2", "4.1.2"], "Year 1"),
      topic("y1-u7-t3", "Colours and Clothes", ["Reading", "Writing"], ["3.1.1", "4.1.1"], "Year 1"),
    ],
  },
  {
    id: "y1-u8", textbookId: "superminds-1", unitNumber: 8,
    title: "The Robot", theme: "World of Stories",
    yearGroup: "Year 1", coreVocabulary: ["head", "arms", "legs", "hands", "feet", "eyes", "mouth"],
    languageFocus: ["I've got ...", "Have you got ...?", "Body parts"],
    pageRange: { start: 88, end: 99 },
    topics: [
      topic("y1-u8-t1", "Body Parts", ["Listening", "Speaking"], ["1.1.1", "2.1.1"], "Year 1"),
      topic("y1-u8-t2", "Describing a Robot", ["Speaking", "Reading", "Writing"], ["2.1.3", "3.1.2", "4.1.2"], "Year 1"),
      topic("y1-u8-t3", "Songs and Action Rhymes", ["Language Arts"], ["5.1.1", "5.1.2"], "Year 1"),
    ],
  },
  {
    id: "y1-u9", textbookId: "superminds-1", unitNumber: 9,
    title: "At the Beach", theme: "World of Knowledge",
    yearGroup: "Year 1", coreVocabulary: ["sea", "sand", "shell", "sun", "crab", "towel", "bucket"],
    languageFocus: ["Let's ...", "What's this?", "It's a ...", "Plural -s"],
    pageRange: { start: 100, end: 111 },
    topics: [
      topic("y1-u9-t1", "Beach Vocabulary", ["Listening", "Speaking"], ["1.1.1", "2.1.1"], "Year 1"),
      topic("y1-u9-t2", "Making Suggestions", ["Speaking"], ["2.1.2", "2.1.3"], "Year 1"),
      topic("y1-u9-t3", "Beach Scene Story", ["Reading", "Language Arts"], ["3.1.2", "5.1.1"], "Year 1"),
    ],
  },
]

/* ──── YEAR 2: Superminds ───────────────────────────── */

const year2Units: TextbookUnit[] = [
  {
    id: "y2-u1", textbookId: "superminds-2", unitNumber: 1,
    title: "It's a Long Story!", theme: "World of Stories",
    yearGroup: "Year 2", coreVocabulary: ["once upon a time", "castle", "prince", "princess", "dragon", "magic", "story"],
    languageFocus: ["Past simple (was/were)", "Story sequencing (first, then, finally)"],
    pageRange: { start: 4, end: 15 },
    topics: [
      topic("y2-u1-t1", "Story Characters", ["Listening", "Speaking"], ["1.1.2", "2.1.1", "2.1.2"], "Year 2"),
      topic("y2-u1-t2", "Story Sequencing", ["Reading", "Writing"], ["3.2.1", "4.1.3"], "Year 2"),
      topic("y2-u1-t3", "Acting Out Stories", ["Language Arts"], ["5.2.1", "5.2.2"], "Year 2"),
    ],
  },
  {
    id: "y2-u2", textbookId: "superminds-2", unitNumber: 2,
    title: "Life at the Beach", theme: "World of Knowledge",
    yearGroup: "Year 2", coreVocabulary: ["swim", "surf", "dive", "snorkel", "coral", "fish", "turtle"],
    languageFocus: ["Present continuous", "What are you doing?", "I'm (swimming)"],
    pageRange: { start: 16, end: 27 },
    topics: [
      topic("y2-u2-t1", "Beach Activities", ["Listening", "Speaking"], ["1.2.1", "2.1.1"], "Year 2"),
      topic("y2-u2-t2", "Present Continuous", ["Reading", "Writing"], ["3.2.1", "4.1.3", "4.2.1"], "Year 2"),
      topic("y2-u2-t3", "Beach Safety", ["Listening", "Reading"], ["1.2.2", "3.2.2"], "Year 2"),
    ],
  },
  {
    id: "y2-u3", textbookId: "superminds-2", unitNumber: 3,
    title: "Where Are You From?", theme: "World of Self, Family and Friends",
    yearGroup: "Year 2", coreVocabulary: ["Malaysia", "England", "Japan", "India", "Australia", "China", "country", "flag"],
    languageFocus: ["Where are you from?", "I'm from ...", "Countries and nationalities"],
    pageRange: { start: 28, end: 39 },
    topics: [
      topic("y2-u3-t1", "Countries", ["Listening", "Speaking"], ["1.2.1", "2.1.1", "2.1.2"], "Year 2"),
      topic("y2-u3-t2", "Nationalities", ["Speaking", "Reading"], ["2.2.1", "3.2.1"], "Year 2"),
      topic("y2-u3-t3", "Describing People", ["Reading", "Writing"], ["3.2.2", "4.1.3"], "Year 2"),
    ],
  },
  {
    id: "y2-u4", textbookId: "superminds-2", unitNumber: 4,
    title: "I Am From ...", theme: "World of Self, Family and Friends",
    yearGroup: "Year 2", coreVocabulary: ["hello", "goodbye", "please", "thank you", "sorry", "welcome"],
    languageFocus: ["Greetings and introductions", "Polite expressions"],
    pageRange: { start: 40, end: 51 },
    topics: [
      topic("y2-u4-t1", "Greetings", ["Listening", "Speaking"], ["1.2.1", "2.1.1"], "Year 2"),
      topic("y2-u4-t2", "Introducing Myself", ["Speaking", "Writing"], ["2.2.2", "4.1.3"], "Year 2"),
      topic("y2-u4-t3", "Polite Conversations", ["Listening", "Speaking"], ["1.2.2", "2.2.1"], "Year 2"),
    ],
  },
  {
    id: "y2-u5", textbookId: "superminds-2", unitNumber: 5,
    title: "Let's Have Fun!", theme: "World of Self, Family and Friends",
    yearGroup: "Year 2", coreVocabulary: ["play", "game", "fun", "park", "ride", "slide", "swing"],
    languageFocus: ["Let's ...", "Can we ...?", "Suggestions and invitations"],
    pageRange: { start: 52, end: 63 },
    topics: [
      topic("y2-u5-t1", "Playground Activities", ["Listening", "Speaking"], ["1.2.1", "2.1.1"], "Year 2"),
      topic("y2-u5-t2", "Making Invitations", ["Speaking", "Reading"], ["2.2.1", "3.2.1"], "Year 2"),
      topic("y2-u5-t3", "Having Fun Song", ["Language Arts"], ["5.1.1", "5.1.2"], "Year 2"),
    ],
  },
  {
    id: "y2-u6", textbookId: "superminds-2", unitNumber: 6,
    title: "My House", theme: "World of Self, Family and Friends",
    yearGroup: "Year 2", coreVocabulary: ["living room", "bedroom", "kitchen", "bathroom", "dining room", "stairs", "garden"],
    languageFocus: ["There's / There are", "Prepositions (in, on, under, behind)"],
    pageRange: { start: 64, end: 75 },
    topics: [
      topic("y2-u6-t1", "Rooms in a House", ["Listening", "Speaking"], ["1.2.1", "2.1.1"], "Year 2"),
      topic("y2-u6-t2", "Describing a House", ["Speaking", "Reading", "Writing"], ["2.2.2", "3.2.2", "4.2.1"], "Year 2"),
      topic("y2-u6-t3", "There's / There are", ["Reading", "Writing"], ["3.2.1", "4.1.3"], "Year 2"),
    ],
  },
  {
    id: "y2-u7", textbookId: "superminds-2", unitNumber: 7,
    title: "My Day", theme: "World of Self, Family and Friends",
    yearGroup: "Year 2", coreVocabulary: ["wake up", "breakfast", "school", "lunch", "dinner", "sleep", "clock", "time"],
    languageFocus: ["Telling time", "Present simple", "Daily routines"],
    pageRange: { start: 76, end: 87 },
    topics: [
      topic("y2-u7-t1", "Daily Routines", ["Listening", "Speaking"], ["1.2.1", "2.1.1"], "Year 2"),
      topic("y2-u7-t2", "Telling the Time", ["Listening", "Reading"], ["1.2.2", "3.2.1"], "Year 2"),
      topic("y2-u7-t3", "Writing About My Day", ["Writing"], ["4.1.3", "4.2.1"], "Year 2"),
    ],
  },
  {
    id: "y2-u8", textbookId: "superminds-2", unitNumber: 8,
    title: "I Like ...", theme: "World of Self, Family and Friends",
    yearGroup: "Year 2", coreVocabulary: ["like", "don't like", "food", "drink", "sport", "colour", "animal"],
    languageFocus: ["I like / I don't like", "Do you like ...?", "Expressing preferences"],
    pageRange: { start: 88, end: 99 },
    topics: [
      topic("y2-u8-t1", "Expressing Likes and Dislikes", ["Listening", "Speaking"], ["1.2.1", "2.1.3"], "Year 2"),
      topic("y2-u8-t2", "Asking About Preferences", ["Speaking", "Reading"], ["2.2.1", "3.2.1"], "Year 2"),
      topic("y2-u8-t3", "Poem About Likes", ["Language Arts", "Writing"], ["5.2.1", "4.2.1"], "Year 2"),
    ],
  },
]

/* ──── YEAR 3: Get Smart Plus 3 ─────────────────────── */

const year3Units: TextbookUnit[] = [
  {
    id: "y3-u1", textbookId: "get-smart-plus-3", unitNumber: 1,
    title: "Welcome!", theme: "World of Self, Family and Friends",
    yearGroup: "Year 3", coreVocabulary: ["hello", "goodbye", "name", "age", "from", "happy", "sad"],
    languageFocus: ["To be (am, is, are)", "Personal pronouns", "Wh-questions"],
    pageRange: { start: 4, end: 13 },
    topics: [
      topic("y3-u1-t1", "Introductions", ["Listening", "Speaking"], ["1.1.2", "2.1.1", "2.1.2"], "Year 3"),
      topic("y3-u1-t2", "Personal Information", ["Speaking", "Reading", "Writing"], ["2.1.3", "3.1.3", "4.1.3"], "Year 3"),
      topic("y3-u1-t3", "Welcome Song", ["Language Arts"], ["5.1.1", "5.1.2"], "Year 3"),
    ],
  },
  {
    id: "y3-u2", textbookId: "get-smart-plus-3", unitNumber: 2,
    title: "Everyday", theme: "World of Self, Family and Friends",
    yearGroup: "Year 3", coreVocabulary: ["get up", "go to school", "have breakfast", "brush teeth", "wash face", "get dressed"],
    languageFocus: ["Present simple (I/you/we/they)", "Adverbs of frequency"],
    pageRange: { start: 14, end: 23 },
    topics: [
      topic("y3-u2-t1", "Daily Routines Vocabulary", ["Listening", "Speaking"], ["1.1.2", "2.1.1"], "Year 3"),
      topic("y3-u2-t2", "Present Simple", ["Reading", "Writing"], ["3.1.3", "4.1.3", "4.2.1"], "Year 3"),
      topic("y3-u2-t3", "My Day Poem", ["Language Arts"], ["5.3.1", "5.3.2"], "Year 3"),
    ],
  },
  {
    id: "y3-u3", textbookId: "get-smart-plus-3", unitNumber: 3,
    title: "Right Now", theme: "World of Self, Family and Friends",
    yearGroup: "Year 3", coreVocabulary: ["reading", "writing", "eating", "drinking", "sitting", "standing", "playing"],
    languageFocus: ["Present continuous", "Now / at the moment"],
    pageRange: { start: 24, end: 33 },
    topics: [
      topic("y3-u3-t1", "Actions Now", ["Listening", "Speaking"], ["1.1.2", "2.1.1", "2.1.3"], "Year 3"),
      topic("y3-u3-t2", "Present Continuous", ["Listening", "Reading", "Writing"], ["1.3.1", "3.3.1", "4.2.2"], "Year 3"),
      topic("y3-u3-t3", "Role Play: What's Happening?", ["Language Arts", "Speaking"], ["5.3.2", "2.3.1"], "Year 3"),
    ],
  },
  {
    id: "y3-u4", textbookId: "get-smart-plus-3", unitNumber: 4,
    title: "Year In, Year Out", theme: "World of Knowledge",
    yearGroup: "Year 3", coreVocabulary: ["spring", "summer", "autumn", "winter", "weather", "hot", "cold", "rainy"],
    languageFocus: ["Seasons and weather", "Present simple (he/she/it -s)", "When ...?"],
    pageRange: { start: 34, end: 43 },
    topics: [
      topic("y3-u4-t1", "Seasons and Weather", ["Listening", "Speaking"], ["1.1.2", "2.1.1", "2.1.3"], "Year 3"),
      topic("y3-u4-t2", "Third Person -s", ["Reading", "Writing"], ["3.1.3", "4.2.1"], "Year 3"),
      topic("y3-u4-t3", "Weather Poems", ["Language Arts"], ["5.3.1", "5.3.2"], "Year 3"),
    ],
  },
  {
    id: "y3-u5", textbookId: "get-smart-plus-3", unitNumber: 5,
    title: "My New House", theme: "World of Self, Family and Friends",
    yearGroup: "Year 3", coreVocabulary: ["house", "flat", "stairs", "garage", "garden", "fence", "balcony", "roof"],
    languageFocus: ["There's / There are", "Some / any", "Prepositions of place"],
    pageRange: { start: 44, end: 53 },
    topics: [
      topic("y3-u5-t1", "Homes Vocabulary", ["Listening", "Speaking"], ["1.1.3", "2.1.1", "2.1.3"], "Year 3"),
      topic("y3-u5-t2", "Describing My House", ["Speaking", "Reading", "Writing"], ["2.3.1", "3.2.3", "4.2.2"], "Year 3"),
      topic("y3-u5-t3", "There's / There are Practice", ["Reading", "Writing"], ["3.2.3", "4.2.1", "4.2.2"], "Year 3"),
      topic("y3-u5-t4", "My Dream House Project", ["Writing", "Language Arts"], ["4.2.2", "5.3.1"], "Year 3"),
    ],
  },
  {
    id: "y3-u6", textbookId: "get-smart-plus-3", unitNumber: 6,
    title: "Food, Please!", theme: "World of Knowledge",
    yearGroup: "Year 3", coreVocabulary: ["rice", "noodles", "bread", "egg", "chicken", "fish", "vegetable", "fruit"],
    languageFocus: ["Countable / uncountable nouns", "Some / any / a / an", "Would you like ...?"],
    pageRange: { start: 54, end: 63 },
    topics: [
      topic("y3-u6-t1", "Food and Drinks", ["Listening", "Speaking"], ["1.1.3", "2.1.1"], "Year 3"),
      topic("y3-u6-t2", "Ordering Food", ["Speaking", "Reading"], ["2.3.2", "3.2.3"], "Year 3"),
      topic("y3-u6-t3", "Countable / Uncountable", ["Reading", "Writing"], ["3.1.3", "4.2.1", "4.2.2"], "Year 3"),
    ],
  },
  {
    id: "y3-u7", textbookId: "get-smart-plus-3", unitNumber: 7,
    title: "Out and About", theme: "World of Knowledge",
    yearGroup: "Year 3", coreVocabulary: ["park", "shop", "cinema", "library", "hospital", "bus stop", "market"],
    languageFocus: ["Prepositions of movement", "Imperatives (directions)", "Can for ability"],
    pageRange: { start: 64, end: 73 },
    topics: [
      topic("y3-u7-t1", "Places in Town", ["Listening", "Speaking"], ["1.1.3", "2.1.1", "2.1.3"], "Year 3"),
      topic("y3-u7-t2", "Giving Directions", ["Listening", "Speaking", "Reading"], ["1.2.2", "2.3.1", "3.2.3"], "Year 3"),
      topic("y3-u7-t3", "Can for Ability", ["Reading", "Writing"], ["3.1.3", "4.2.1"], "Year 3"),
    ],
  },
  {
    id: "y3-u8", textbookId: "get-smart-plus-3", unitNumber: 8,
    title: "Where Were You Yesterday?", theme: "World of Knowledge",
    yearGroup: "Year 3", coreVocabulary: ["yesterday", "last week", "last night", "at home", "at school", "sick", "tired"],
    languageFocus: ["Past simple (was/were)", "Yes/No questions in past"],
    pageRange: { start: 74, end: 83 },
    topics: [
      topic("y3-u8-t1", "Past Simple: Was/Were", ["Listening", "Speaking", "Reading"], ["1.3.1", "2.3.2", "3.2.3"], "Year 3"),
      topic("y3-u8-t2", "Talking About Yesterday", ["Speaking", "Writing"], ["2.3.1", "4.2.2"], "Year 3"),
      topic("y3-u8-t3", "A Story About the Past", ["Reading", "Writing", "Language Arts"], ["3.2.3", "4.2.2", "5.3.1"], "Year 3"),
    ],
  },
  {
    id: "y3-u9", textbookId: "get-smart-plus-3", unitNumber: 9,
    title: "On Holiday", theme: "World of Knowledge",
    yearGroup: "Year 3", coreVocabulary: ["holiday", "beach", "mountain", "city", "camp", "hotel", "ticket"],
    languageFocus: ["Going to (future)", "Plans and intentions"],
    pageRange: { start: 84, end: 93 },
    topics: [
      topic("y3-u9-t1", "Holiday Vocabulary", ["Listening", "Speaking"], ["1.1.3", "2.1.1"], "Year 3"),
      topic("y3-u9-t2", "Future Plans", ["Speaking", "Writing"], ["2.3.2", "4.2.2"], "Year 3"),
      topic("y3-u9-t3", "Holiday Postcard", ["Writing", "Language Arts"], ["4.2.2", "5.3.1"], "Year 3"),
    ],
  },
  {
    id: "y3-u10", textbookId: "get-smart-plus-3", unitNumber: 10,
    title: "The World Around Us", theme: "World of Knowledge",
    yearGroup: "Year 3", coreVocabulary: ["sun", "moon", "star", "tree", "flower", "river", "mountain", "ocean"],
    languageFocus: ["Superlative adjectives", "Comparative adjectives"],
    pageRange: { start: 94, end: 103 },
    topics: [
      topic("y3-u10-t1", "Natural World", ["Listening", "Speaking"], ["1.1.3", "2.1.1", "2.1.3"], "Year 3"),
      topic("y3-u10-t2", "Comparatives and Superlatives", ["Reading", "Writing"], ["3.2.3", "4.2.2"], "Year 3"),
      topic("y3-u10-t3", "Nature Poem", ["Language Arts"], ["5.3.1", "5.3.2"], "Year 3"),
    ],
  },
]

/* ──── YEAR 4: Get Smart Plus 4 ──────────────────────── */

const year4Units: TextbookUnit[] = [
  {
    id: "y4-u1", textbookId: "get-smart-plus-4", unitNumber: 1,
    title: "Where Are You From?", theme: "World of Self, Family and Friends",
    yearGroup: "Year 4", coreVocabulary: ["nationality", "country", "language", "capital", "culture", "custom"],
    languageFocus: ["To be review", "Wh-questions", "Present simple for facts"],
    pageRange: { start: 4, end: 13 },
    topics: [
      topic("y4-u1-t1", "Countries and Nationalities", ["Listening", "Speaking"], ["1.2.3", "2.2.4", "2.3.1"], "Year 4"),
      topic("y4-u1-t2", "Facts About Countries", ["Reading", "Writing"], ["3.3.1", "3.3.2", "4.2.2"], "Year 4"),
    ],
  },
  {
    id: "y4-u2", textbookId: "get-smart-plus-4", unitNumber: 2,
    title: "My Week", theme: "World of Self, Family and Friends",
    yearGroup: "Year 4", coreVocabulary: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "always", "sometimes", "never"],
    languageFocus: ["Adverbs of frequency", "Present simple (all persons)"],
    pageRange: { start: 14, end: 23 },
    topics: [
      topic("y4-u2-t1", "Days of the Week", ["Listening", "Speaking"], ["1.2.3", "2.2.4"], "Year 4"),
      topic("y4-u2-t2", "Weekly Routines", ["Reading", "Writing"], ["3.3.2", "4.2.2", "4.2.3"], "Year 4"),
    ],
  },
  {
    id: "y4-u3", textbookId: "get-smart-plus-4", unitNumber: 3,
    title: "In the Past", theme: "World of Knowledge",
    yearGroup: "Year 4", coreVocabulary: ["past", "history", "long ago", "invented", "discovered", "ancient"],
    languageFocus: ["Past simple (regular verbs)", "Past time expressions"],
    pageRange: { start: 24, end: 33 },
    topics: [
      topic("y4-u3-t1", "Past Simple Regular Verbs", ["Listening", "Speaking", "Reading"], ["1.3.2", "2.2.3", "3.3.1"], "Year 4"),
      topic("y4-u3-t2", "Writing About the Past", ["Writing"], ["4.3.1", "4.3.2"], "Year 4"),
    ],
  },
  {
    id: "y4-u4", textbookId: "get-smart-plus-4", unitNumber: 4,
    title: "Be Safe", theme: "World of Knowledge",
    yearGroup: "Year 4", coreVocabulary: ["safe", "danger", "help", "emergency", "road", "cross", "careful"],
    languageFocus: ["Modals (must / mustn't)", "Imperatives"],
    pageRange: { start: 34, end: 43 },
    topics: [
      topic("y4-u4-t1", "Safety Rules", ["Listening", "Speaking"], ["1.2.3", "1.2.4", "2.2.4"], "Year 4"),
      topic("y4-u4-t2", "Must / Mustn't", ["Reading", "Writing"], ["3.3.1", "4.3.1", "4.3.2"], "Year 4"),
    ],
  },
  {
    id: "y4-u5", textbookId: "get-smart-plus-4", unitNumber: 5,
    title: "Eating Right", theme: "World of Knowledge",
    yearGroup: "Year 4", coreVocabulary: ["healthy", "unhealthy", "nutrition", "vitamin", "protein", "carbohydrate"],
    languageFocus: ["Countable / uncountable nouns", "How much / How many", "Quantifiers"],
    pageRange: { start: 44, end: 53 },
    topics: [
      topic("y4-u5-t1", "Healthy Eating", ["Listening", "Speaking"], ["1.2.4", "2.2.4", "2.3.1"], "Year 4"),
      topic("y4-u5-t2", "Food Quantities", ["Reading", "Writing"], ["3.3.2", "4.3.1", "4.3.2"], "Year 4"),
    ],
  },
  {
    id: "y4-u6", textbookId: "get-smart-plus-4", unitNumber: 6,
    title: "Getting Around", theme: "World of Knowledge",
    yearGroup: "Year 4", coreVocabulary: ["transport", "bus", "train", "plane", "taxi", "bicycle", "ferry"],
    languageFocus: ["Comparatives", "Transport vocabulary", "How do you go to ...?"],
    pageRange: { start: 54, end: 63 },
    topics: [
      topic("y4-u6-t1", "Transport Vocabulary", ["Listening", "Speaking"], ["1.1.3", "2.2.4", "2.3.1"], "Year 4"),
      topic("y4-u6-t2", "Comparing Transport", ["Reading", "Writing"], ["3.3.1", "4.3.1"], "Year 4"),
    ],
  },
  {
    id: "y4-u7", textbookId: "get-smart-plus-4", unitNumber: 7,
    title: "Helping Out", theme: "World of Self, Family and Friends",
    yearGroup: "Year 4", coreVocabulary: ["help", "chores", "wash", "clean", "cook", "tidy", "look after"],
    languageFocus: ["Present continuous for future arrangements", "Can for requests"],
    pageRange: { start: 64, end: 73 },
    topics: [
      topic("y4-u7-t1", "Household Chores", ["Listening", "Speaking"], ["1.2.4", "2.2.3", "2.3.1"], "Year 4"),
      topic("y4-u7-t2", "Making Requests", ["Speaking", "Reading", "Writing"], ["2.2.4", "3.3.2", "4.2.3"], "Year 4"),
    ],
  },
  {
    id: "y4-u8", textbookId: "get-smart-plus-4", unitNumber: 8,
    title: "Amazing Animals", theme: "World of Knowledge",
    yearGroup: "Year 4", coreVocabulary: ["mammal", "reptile", "amphibian", "bird", "fish", "habitat", "endangered"],
    languageFocus: ["Superlatives", "Can / can't for ability"],
    pageRange: { start: 74, end: 83 },
    topics: [
      topic("y4-u8-t1", "Animal Classification", ["Listening", "Reading"], ["1.3.1", "3.3.1", "3.3.2"], "Year 4"),
      topic("y4-u8-t2", "Amazing Animal Facts", ["Speaking", "Writing"], ["2.2.4", "4.3.1", "4.3.2"], "Year 4"),
    ],
  },
  {
    id: "y4-u9", textbookId: "get-smart-plus-4", unitNumber: 9,
    title: "Get Active!", theme: "World of Self, Family and Friends",
    yearGroup: "Year 4", coreVocabulary: ["sport", "exercise", "team", "match", "score", "win", "lose"],
    languageFocus: ["Can / can't", "Adverbs of manner (well, quickly)"],
    pageRange: { start: 84, end: 93 },
    topics: [
      topic("y4-u9-t1", "Sports Vocabulary", ["Listening", "Speaking"], ["1.1.3", "2.1.1", "2.2.4"], "Year 4"),
      topic("y4-u9-t2", "Describing Sports", ["Reading", "Writing"], ["3.3.1", "4.3.1"], "Year 4"),
    ],
  },
  {
    id: "y4-u10", textbookId: "get-smart-plus-4", unitNumber: 10,
    title: "What's the Matter?", theme: "World of Self, Family and Friends",
    yearGroup: "Year 4", coreVocabulary: ["headache", "stomach ache", "cold", "fever", "cough", "sore throat"],
    languageFocus: ["Should / shouldn't", "Giving advice"],
    pageRange: { start: 94, end: 103 },
    topics: [
      topic("y4-u10-t1", "Health Problems", ["Listening", "Speaking"], ["1.2.4", "2.2.4", "2.3.1"], "Year 4"),
      topic("y4-u10-t2", "Giving Advice", ["Reading", "Writing"], ["3.3.1", "4.3.1", "4.2.3"], "Year 4"),
    ],
  },
]

/* ──── YEAR 5: English Plus 1 ────────────────────────── */

const year5Units: TextbookUnit[] = [
  {
    id: "y5-u1", textbookId: "english-plus-1", unitNumber: 1,
    title: "Towns and Cities", theme: "World of Knowledge",
    yearGroup: "Year 5", coreVocabulary: ["town", "city", "village", "capital", "population", "tourist", "landmark"],
    languageFocus: ["There is / There are review", "Quantifiers (a lot of, some, any)", "Prepositions"],
    pageRange: { start: 4, end: 15 },
    topics: [
      topic("y5-u1-t1", "Places in Town", ["Listening", "Speaking"], ["1.3.2", "2.3.2", "2.3.3"], "Year 5"),
      topic("y5-u1-t2", "Describing a City", ["Reading", "Writing"], ["3.3.1", "3.3.3", "4.3.3"], "Year 5"),
    ],
  },
  {
    id: "y5-u2", textbookId: "english-plus-1", unitNumber: 2,
    title: "Days", theme: "World of Self, Family and Friends",
    yearGroup: "Year 5", coreVocabulary: ["daily", "weekly", "monthly", "routine", "schedule", "appointment"],
    languageFocus: ["Present simple", "Adverbs of frequency", "Time expressions"],
    pageRange: { start: 16, end: 27 },
    topics: [
      topic("y5-u2-t1", "Talking About Routines", ["Listening", "Speaking"], ["1.3.2", "2.3.2", "2.3.3"], "Year 5"),
      topic("y5-u2-t2", "Writing About Schedules", ["Reading", "Writing"], ["3.3.2", "4.3.1", "4.3.2"], "Year 5"),
    ],
  },
  {
    id: "y5-u3", textbookId: "english-plus-1", unitNumber: 3,
    title: "Wild Life", theme: "World of Knowledge",
    yearGroup: "Year 5", coreVocabulary: ["wild", "habitat", "species", "endangered", "extinct", "conservation", "jungle"],
    languageFocus: ["Present simple for facts", "Comparatives and superlatives"],
    pageRange: { start: 28, end: 39 },
    topics: [
      topic("y5-u3-t1", "Wild Animals", ["Listening", "Speaking"], ["1.3.3", "2.3.3"], "Year 5"),
      topic("y5-u3-t2", "Animal Facts and Comparisons", ["Reading", "Writing"], ["3.3.2", "3.3.3", "4.3.3"], "Year 5"),
    ],
  },
  {
    id: "y5-u4", textbookId: "english-plus-1", unitNumber: 4,
    title: "Learning World", theme: "World of Self, Family and Friends",
    yearGroup: "Year 5", coreVocabulary: ["subject", "lesson", "homework", "exam", "project", "teacher", "classroom"],
    languageFocus: ["Present continuous for now", "Present simple vs continuous"],
    pageRange: { start: 40, end: 51 },
    topics: [
      topic("y5-u4-t1", "School Subjects", ["Listening", "Speaking"], ["1.3.3", "2.3.2", "2.3.3"], "Year 5"),
      topic("y5-u4-t2", "Comparing Tenses", ["Reading", "Writing"], ["3.3.3", "4.3.2", "4.3.3"], "Year 5"),
    ],
  },
  {
    id: "y5-u5", textbookId: "english-plus-1", unitNumber: 5,
    title: "Food and Health", theme: "World of Knowledge",
    yearGroup: "Year 5", coreVocabulary: ["diet", "nutrition", "ingredient", "recipe", "meal", "balanced", "portion"],
    languageFocus: ["Countable and uncountable nouns", "How much / How many", "Should / shouldn't"],
    pageRange: { start: 52, end: 63 },
    topics: [
      topic("y5-u5-t1", "Healthy Diet", ["Listening", "Speaking"], ["1.3.4", "2.3.3", "2.3.4"], "Year 5"),
      topic("y5-u5-t2", "Writing a Recipe", ["Reading", "Writing"], ["3.3.2", "4.3.1", "4.3.3"], "Year 5"),
    ],
  },
  {
    id: "y5-u6", textbookId: "english-plus-1", unitNumber: 6,
    title: "Sport", theme: "World of Self, Family and Friends",
    yearGroup: "Year 5", coreVocabulary: ["sport", "competition", "tournament", "champion", "training", "fitness"],
    languageFocus: ["Past simple (regular and irregular)", "Past time expressions"],
    pageRange: { start: 64, end: 75 },
    topics: [
      topic("y5-u6-t1", "Sports and Competitions", ["Listening", "Speaking"], ["1.3.3", "2.3.3"], "Year 5"),
      topic("y5-u6-t2", "Past Simple Narrative", ["Reading", "Writing"], ["3.3.3", "4.3.2", "4.3.3"], "Year 5"),
    ],
  },
  {
    id: "y5-u7", textbookId: "english-plus-1", unitNumber: 7,
    title: "Growing Up", theme: "World of Self, Family and Friends",
    yearGroup: "Year 5", coreVocabulary: ["grown up", "teenager", "adult", "childhood", "change", "responsibility"],
    languageFocus: ["Used to", "Past simple review"],
    pageRange: { start: 76, end: 87 },
    topics: [
      topic("y5-u7-t1", "Talking About the Past", ["Listening", "Speaking"], ["1.3.4", "2.3.3", "2.3.4"], "Year 5"),
      topic("y5-u7-t2", "Used to", ["Reading", "Writing"], ["3.3.3", "4.3.3"], "Year 5"),
    ],
  },
  {
    id: "y5-u8", textbookId: "english-plus-1", unitNumber: 8,
    title: "Going Away", theme: "World of Knowledge",
    yearGroup: "Year 5", coreVocabulary: ["travel", "trip", "journey", "destination", "souvenir", "luggage"],
    languageFocus: ["Future (going to / will)", "Holiday plans"],
    pageRange: { start: 88, end: 99 },
    topics: [
      topic("y5-u8-t1", "Travel Plans", ["Listening", "Speaking"], ["1.3.3", "2.3.2", "2.3.3"], "Year 5"),
      topic("y5-u8-t2", "Future Plans", ["Reading", "Writing"], ["3.3.2", "4.3.1", "4.3.3"], "Year 5"),
    ],
  },
]

/* ──── YEAR 6: Academy Stars ─────────────────────────── */

const year6Units: TextbookUnit[] = [
  {
    id: "y6-u1", textbookId: "academy-stars-1", unitNumber: 1,
    title: "It's an Emergency!", theme: "World of Knowledge",
    yearGroup: "Year 6", coreVocabulary: ["emergency", "accident", "ambulance", "fire", "police", "rescue", "help"],
    languageFocus: ["Past continuous", "Past simple vs past continuous"],
    pageRange: { start: 4, end: 15 },
    topics: [
      topic("y6-u1-t1", "Emergency Situations", ["Listening", "Speaking"], ["1.3.3", "2.3.3", "2.3.4"], "Year 6"),
      topic("y6-u1-t2", "Past Continuous Narrative", ["Reading", "Writing"], ["3.3.3", "3.3.4", "4.3.3"], "Year 6"),
    ],
  },
  {
    id: "y6-u2", textbookId: "academy-stars-1", unitNumber: 2,
    title: "Life in the Past", theme: "World of Knowledge",
    yearGroup: "Year 6", coreVocabulary: ["century", "generation", "ancestor", "tradition", "ancient", "medieval"],
    languageFocus: ["Used to review", "Past simple vs used to"],
    pageRange: { start: 16, end: 27 },
    topics: [
      topic("y6-u2-t1", "History and Traditions", ["Listening", "Speaking"], ["1.3.4", "2.3.4"], "Year 6"),
      topic("y6-u2-t2", "Comparing Past and Present", ["Reading", "Writing"], ["3.3.3", "3.3.4", "4.3.4"], "Year 6"),
    ],
  },
  {
    id: "y6-u3", textbookId: "academy-stars-1", unitNumber: 3,
    title: "Adventure Time", theme: "World of Stories",
    yearGroup: "Year 6", coreVocabulary: ["adventure", "explore", "discover", "journey", "expedition", "survive"],
    languageFocus: ["Present perfect (experience)", "Ever / never"],
    pageRange: { start: 28, end: 39 },
    topics: [
      topic("y6-u3-t1", "Adventures and Exploration", ["Listening", "Speaking"], ["1.3.4", "2.3.4"], "Year 6"),
      topic("y6-u3-t2", "Present Perfect", ["Reading", "Writing"], ["3.3.3", "4.3.3", "4.3.4"], "Year 6"),
    ],
  },
  {
    id: "y6-u4", textbookId: "academy-stars-1", unitNumber: 4,
    title: "Cool Jobs", theme: "World of Knowledge",
    yearGroup: "Year 6", coreVocabulary: ["career", "profession", "skill", "qualification", "salary", "employer"],
    languageFocus: ["Present perfect (for / since)", "Have you ever ...?"],
    pageRange: { start: 40, end: 51 },
    topics: [
      topic("y6-u4-t1", "Jobs and Careers", ["Listening", "Speaking"], ["1.3.3", "2.3.4"], "Year 6"),
      topic("y6-u4-t2", "Present Perfect with For/Since", ["Reading", "Writing"], ["3.3.3", "4.3.3", "4.3.4"], "Year 6"),
    ],
  },
  {
    id: "y6-u5", textbookId: "academy-stars-1", unitNumber: 5,
    title: "I Love the Weekend!", theme: "World of Self, Family and Friends",
    yearGroup: "Year 6", coreVocabulary: ["weekend", "leisure", "hobby", "relax", "entertainment", "socialise"],
    languageFocus: ["Present simple for routines", "Adverbs of frequency"],
    pageRange: { start: 52, end: 63 },
    topics: [
      topic("y6-u5-t1", "Weekend Activities", ["Listening", "Speaking"], ["1.3.3", "2.3.3"], "Year 6"),
      topic("y6-u5-t2", "Describing Routines", ["Reading", "Writing"], ["3.3.2", "4.3.2", "4.3.3"], "Year 6"),
    ],
  },
  {
    id: "y6-u6", textbookId: "academy-stars-1", unitNumber: 6,
    title: "How Is It Made?", theme: "World of Knowledge",
    yearGroup: "Year 6", coreVocabulary: ["manufacture", "process", "material", "produce", "factory", "natural", "synthetic"],
    languageFocus: ["Passive voice (present simple)", "Sequence connectors"],
    pageRange: { start: 64, end: 75 },
    topics: [
      topic("y6-u6-t1", "Materials and Processes", ["Listening", "Reading"], ["1.3.4", "3.3.4"], "Year 6"),
      topic("y6-u6-t2", "Passive Voice", ["Reading", "Writing"], ["3.3.3", "4.3.3", "4.3.4"], "Year 6"),
    ],
  },
  {
    id: "y6-u7", textbookId: "academy-stars-1", unitNumber: 7,
    title: "Music and Song", theme: "World of Arts",
    yearGroup: "Year 6", coreVocabulary: ["music", "song", "rhythm", "melody", "instrument", "concert", "performance"],
    languageFocus: ["Can / can't for ability", "Adverbs of manner"],
    pageRange: { start: 76, end: 87 },
    topics: [
      topic("y6-u7-t1", "Talking About Music", ["Listening", "Speaking"], ["1.3.3", "2.3.3", "2.3.4"], "Year 6"),
      topic("y6-u7-t2", "Expressing Ability", ["Reading", "Writing"], ["3.3.3", "4.3.3"], "Year 6"),
      topic("y6-u7-t3", "Creating a Song", ["Language Arts"], ["5.3.4", "5.3.5"], "Year 6"),
    ],
  },
  {
    id: "y6-u8", textbookId: "academy-stars-1", unitNumber: 8,
    title: "Tell Me a Story", theme: "World of Stories",
    yearGroup: "Year 6", coreVocabulary: ["plot", "character", "setting", "conflict", "resolution", "moral"],
    languageFocus: ["Story tenses (past simple, past continuous)", "Direct speech"],
    pageRange: { start: 88, end: 99 },
    topics: [
      topic("y6-u8-t1", "Story Elements", ["Listening", "Speaking"], ["1.3.4", "2.3.4"], "Year 6"),
      topic("y6-u8-t2", "Writing a Narrative", ["Writing", "Language Arts"], ["4.3.3", "4.3.4", "5.3.5"], "Year 6"),
    ],
  },
  {
    id: "y6-u9", textbookId: "academy-stars-1", unitNumber: 9,
    title: "What's Your Opinion?", theme: "World of Self, Family and Friends",
    yearGroup: "Year 6", coreVocabulary: ["opinion", "agree", "disagree", "believe", "think", "debate", "argument"],
    languageFocus: ["Expressing opinions", "Agreeing and disagreeing", "Modals (should, must)"],
    pageRange: { start: 100, end: 111 },
    topics: [
      topic("y6-u9-t1", "Giving Opinions", ["Listening", "Speaking"], ["1.3.4", "2.3.4"], "Year 6"),
      topic("y6-u9-t2", "Persuasive Writing", ["Reading", "Writing"], ["3.3.3", "3.3.4", "4.3.4"], "Year 6"),
    ],
  },
  {
    id: "y6-u10", textbookId: "academy-stars-1", unitNumber: 10,
    title: "It's a Mystery", theme: "World of Stories",
    yearGroup: "Year 6", coreVocabulary: ["mystery", "clue", "detective", "investigate", "solve", "suspect", "evidence"],
    languageFocus: ["Modal verbs of deduction (must be, can't be, might be)", "Present continuous for future"],
    pageRange: { start: 112, end: 123 },
    topics: [
      topic("y6-u10-t1", "Mysteries and Deduction", ["Listening", "Speaking", "Reading"], ["1.3.4", "2.3.4", "3.3.4"], "Year 6"),
      topic("y6-u10-t2", "Writing a Mystery Story", ["Writing", "Language Arts"], ["4.3.4", "5.3.5"], "Year 6"),
    ],
  },
]

/* ──── Assemble all units ────────────────────────────── */

export const units: TextbookUnit[] = [
  ...year1Units,
  ...year2Units,
  ...year3Units,
  ...year4Units,
  ...year5Units,
  ...year6Units,
]

/* ──── Scheme of Work (SoW) Entries ──────────────────── */
/* Each entry maps a week to a specific unit's topic      */

const sowWeekRanges: Record<YearGroup, { unitId: string; title: string; weekStart: number; weekEnd: number }[]> = {
  "Year 1": [
    { unitId: "y1-u1", title: "At School", weekStart: 1, weekEnd: 3 },
    { unitId: "y1-u2", title: "Let's Play!", weekStart: 4, weekEnd: 6 },
    { unitId: "y1-u3", title: "Pet Show", weekStart: 7, weekEnd: 9 },
    { unitId: "y1-u4", title: "Lunchtime", weekStart: 10, weekEnd: 12 },
    { unitId: "y1-u5", title: "Free Time", weekStart: 13, weekEnd: 15 },
    { unitId: "y1-u6", title: "The Old House", weekStart: 16, weekEnd: 18 },
    { unitId: "y1-u7", title: "Get Dressed!", weekStart: 19, weekEnd: 21 },
    { unitId: "y1-u8", title: "The Robot", weekStart: 22, weekEnd: 24 },
    { unitId: "y1-u9", title: "At the Beach", weekStart: 25, weekEnd: 27 },
  ],
  "Year 2": [
    { unitId: "y2-u1", title: "It's a Long Story!", weekStart: 1, weekEnd: 3 },
    { unitId: "y2-u2", title: "Life at the Beach", weekStart: 4, weekEnd: 6 },
    { unitId: "y2-u3", title: "Where Are You From?", weekStart: 7, weekEnd: 9 },
    { unitId: "y2-u4", title: "I Am From ...", weekStart: 10, weekEnd: 12 },
    { unitId: "y2-u5", title: "Let's Have Fun!", weekStart: 13, weekEnd: 15 },
    { unitId: "y2-u6", title: "My House", weekStart: 16, weekEnd: 18 },
    { unitId: "y2-u7", title: "My Day", weekStart: 19, weekEnd: 21 },
    { unitId: "y2-u8", title: "I Like ...", weekStart: 22, weekEnd: 24 },
  ],
  "Year 3": [
    { unitId: "y3-u1", title: "Welcome!", weekStart: 1, weekEnd: 2 },
    { unitId: "y3-u2", title: "Everyday", weekStart: 3, weekEnd: 5 },
    { unitId: "y3-u3", title: "Right Now", weekStart: 6, weekEnd: 8 },
    { unitId: "y3-u4", title: "Year In, Year Out", weekStart: 9, weekEnd: 11 },
    { unitId: "y3-u5", title: "My New House", weekStart: 12, weekEnd: 15 },
    { unitId: "y3-u6", title: "Food, Please!", weekStart: 16, weekEnd: 18 },
    { unitId: "y3-u7", title: "Out and About", weekStart: 19, weekEnd: 21 },
    { unitId: "y3-u8", title: "Where Were You Yesterday?", weekStart: 22, weekEnd: 24 },
    { unitId: "y3-u9", title: "On Holiday", weekStart: 25, weekEnd: 27 },
    { unitId: "y3-u10", title: "The World Around Us", weekStart: 28, weekEnd: 30 },
  ],
  "Year 4": [
    { unitId: "y4-u1", title: "Where Are You From?", weekStart: 1, weekEnd: 3 },
    { unitId: "y4-u2", title: "My Week", weekStart: 4, weekEnd: 6 },
    { unitId: "y4-u3", title: "In the Past", weekStart: 7, weekEnd: 9 },
    { unitId: "y4-u4", title: "Be Safe", weekStart: 10, weekEnd: 12 },
    { unitId: "y4-u5", title: "Eating Right", weekStart: 13, weekEnd: 15 },
    { unitId: "y4-u6", title: "Getting Around", weekStart: 16, weekEnd: 18 },
    { unitId: "y4-u7", title: "Helping Out", weekStart: 19, weekEnd: 21 },
    { unitId: "y4-u8", title: "Amazing Animals", weekStart: 22, weekEnd: 24 },
    { unitId: "y4-u9", title: "Get Active!", weekStart: 25, weekEnd: 27 },
    { unitId: "y4-u10", title: "What's the Matter?", weekStart: 28, weekEnd: 30 },
  ],
  "Year 5": [
    { unitId: "y5-u1", title: "Towns and Cities", weekStart: 1, weekEnd: 3 },
    { unitId: "y5-u2", title: "Days", weekStart: 4, weekEnd: 7 },
    { unitId: "y5-u3", title: "Wild Life", weekStart: 8, weekEnd: 11 },
    { unitId: "y5-u4", title: "Learning World", weekStart: 12, weekEnd: 15 },
    { unitId: "y5-u5", title: "Food and Health", weekStart: 16, weekEnd: 19 },
    { unitId: "y5-u6", title: "Sport", weekStart: 20, weekEnd: 23 },
    { unitId: "y5-u7", title: "Growing Up", weekStart: 24, weekEnd: 27 },
    { unitId: "y5-u8", title: "Going Away", weekStart: 28, weekEnd: 30 },
  ],
  "Year 6": [
    { unitId: "y6-u1", title: "It's an Emergency!", weekStart: 1, weekEnd: 3 },
    { unitId: "y6-u2", title: "Life in the Past", weekStart: 4, weekEnd: 6 },
    { unitId: "y6-u3", title: "Adventure Time", weekStart: 7, weekEnd: 9 },
    { unitId: "y6-u4", title: "Cool Jobs", weekStart: 10, weekEnd: 12 },
    { unitId: "y6-u5", title: "I Love the Weekend!", weekStart: 13, weekEnd: 15 },
    { unitId: "y6-u6", title: "How Is It Made?", weekStart: 16, weekEnd: 18 },
    { unitId: "y6-u7", title: "Music and Song", weekStart: 19, weekEnd: 21 },
    { unitId: "y6-u8", title: "Tell Me a Story", weekStart: 22, weekEnd: 24 },
    { unitId: "y6-u9", title: "What's Your Opinion?", weekStart: 25, weekEnd: 27 },
    { unitId: "y6-u10", title: "It's a Mystery", weekStart: 28, weekEnd: 30 },
  ],
}

/* Build SoW entries from week ranges */
function buildSoW(): SoWEntry[] {
  const entries: SoWEntry[] = []
  const allYearGroups: YearGroup[] = ["Year 1", "Year 2", "Year 3", "Year 4", "Year 5", "Year 6"]

  for (const yearGroup of allYearGroups) {
    const ranges = sowWeekRanges[yearGroup]
    for (const range of ranges) {
      const unit = units.find((u) => u.id === range.unitId)
      if (!unit) continue

      for (let week = range.weekStart; week <= range.weekEnd; week++) {
        const topic = unit.topics[(week - range.weekStart) % unit.topics.length]
        const lsCodes = topic.learningStandardRefs.map((ref) => ref.code)
        const csCodes = Array.from(new Set(topic.learningStandardRefs.map((ref) => ref.contentStandardCode)))

        entries.push({
          id: `sow-${yearGroup.toLowerCase().replace(" ", "-")}-w${week}-${unit.id}`,
          week,
          yearGroup,
          textbookUnitId: unit.id,
          topicId: topic.id,
          learningStandardCodes: lsCodes,
          contentStandardCodes: csCodes,
          suggestedActivities: [],
        })
      }
    }
  }
  return entries
}

/* ──── Attach learning standards to content standards ── */

export const csWithLS: ContentStandard[] = attachLearningStandards(contentStandards, learningStandards)

/* ──── Build full SoW ───────────────────────────────── */

export const sow: SoWEntry[] = buildSoW()

/* ──── Theme mapping by year ─────────────────────────── */

export const themesByYear: Record<YearGroup, Theme[]> = {
  "Year 1": ["World of Self, Family and Friends", "World of Stories", "World of Knowledge"],
  "Year 2": ["World of Self, Family and Friends", "World of Stories", "World of Knowledge"],
  "Year 3": ["World of Self, Family and Friends", "World of Knowledge"],
  "Year 4": ["World of Self, Family and Friends", "World of Knowledge"],
  "Year 5": ["World of Self, Family and Friends", "World of Knowledge"],
  "Year 6": ["World of Self, Family and Friends", "World of Stories", "World of Knowledge", "World of Arts"],
}

/* ──── Lookup helpers ────────────────────────────────── */

function getContentStandard(code: string): ContentStandard | undefined {
  return csWithLS.find((cs) => cs.code === code)
}

function getLearningStandard(code: string): LearningStandard | undefined {
  return learningStandards.find((ls) => ls.code === code)
}

function getUnitsForYear(yearGroup: YearGroup): TextbookUnit[] {
  return units.filter((u) => u.yearGroup === yearGroup)
}

function getTextbookForYear(yearGroup: YearGroup): Textbook | undefined {
  return textbooks.find((tb) => tb.yearGroups.includes(yearGroup))
}

function getSoWForYear(yearGroup: YearGroup): SoWEntry[] {
  return sow.filter((entry) => entry.yearGroup === yearGroup)
}

export const lookup = {
  getContentStandard,
  getLearningStandard,
  getUnitsForYear,
  getTextbookForYear,
  getSoWForYear,
}

/* ──── Example: Year 3 Unit 5 — My New House ──────────── */

export const exampleUnitStandards = {
  unit: {
    id: "y3-u5",
    title: "My New House",
    theme: "World of Self, Family and Friends" as Theme,
    yearGroup: "Year 3" as YearGroup,
    topics: [
      {
        id: "y3-u5-t3",
        title: "There's / There are Practice",
        skillAreas: ["Reading", "Writing"] as SkillArea[],
        learningStandardRefs: [
          { code: "3.2.3", description: "Read and understand simple paragraphs", contentStandardCode: "3.2" },
          { code: "4.2.1", description: "Complete simple texts with missing words", contentStandardCode: "4.2" },
          { code: "4.2.2", description: "Write short simple texts with guidance", contentStandardCode: "4.2" },
        ],
      },
    ],
  },
  contentStandards: [
    { code: "3.2", description: "Read and understand simple texts", skillArea: "Reading" as SkillArea },
    { code: "4.2", description: "Write using appropriate language and format", skillArea: "Writing" as SkillArea },
  ],
  learningStandards: [
    { id: "ls-3.2.3", code: "3.2.3", description: "Read and understand simple paragraphs", contentStandardCode: "3.2", skillArea: "Reading" as SkillArea, yearGroups: ["Year 3", "Year 4"] as YearGroup[] },
    { id: "ls-4.2.1", code: "4.2.1", description: "Complete simple texts with missing words", contentStandardCode: "4.2", skillArea: "Writing" as SkillArea, yearGroups: ["Year 2", "Year 3"] as YearGroup[] },
    { id: "ls-4.2.2", code: "4.2.2", description: "Write short simple texts with guidance", contentStandardCode: "4.2", skillArea: "Writing" as SkillArea, yearGroups: ["Year 3", "Year 4"] as YearGroup[] },
  ],
  sowWeekRange: { weekStart: 12, weekEnd: 15 },
}

/* ──── Full Curriculum Export ────────────────────────── */

const moeCurriculum: MoECurriculum = {
  textbooks,
  units,
  contentStandards: csWithLS,
  learningStandards,
  sow,
  periodDefinitions,
}

export default moeCurriculum
