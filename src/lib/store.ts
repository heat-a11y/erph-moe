"use client"

import { useState, useEffect, useCallback } from "react"
import type { StoreState, TimetableSlot, LessonPlan, DSKP } from "@/types"

const STORAGE_KEY = "erph-moe-store"

const initialState: StoreState = {
  timetable: [],
  lessonPlans: [],
  curriculumDSKP: [],
  settings: {
    schoolName: "",
    teacherName: "",
    defaultDuration: 60,
  },
}

export function useStore() {
  const [state, setState] = useState<StoreState>(initialState)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        setState({ ...initialState, ...parsed })
      }
    } catch {
      console.warn("Failed to load state from localStorage")
    }
    setLoaded(true)
  }, [])

  const persist = useCallback((newState: StoreState) => {
    setState(newState)
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newState))
    } catch {
      console.warn("Failed to persist state to localStorage")
    }
  }, [])

  const updateTimetable = useCallback(
    (timetable: TimetableSlot[]) => {
      persist({ ...state, timetable })
    },
    [state, persist],
  )

  const addLessonPlan = useCallback(
    (plan: LessonPlan) => {
      persist({ ...state, lessonPlans: [...state.lessonPlans, plan] })
    },
    [state, persist],
  )

  const updateLessonPlan = useCallback(
    (id: string, updates: Partial<LessonPlan>) => {
      persist({
        ...state,
        lessonPlans: state.lessonPlans.map((p) =>
          p.id === id ? { ...p, ...updates } : p,
        ),
      })
    },
    [state, persist],
  )

  const deleteLessonPlan = useCallback(
    (id: string) => {
      persist({
        ...state,
        lessonPlans: state.lessonPlans.filter((p) => p.id !== id),
      })
    },
    [state, persist],
  )

  const importDSKP = useCallback(
    (dskp: DSKP[]) => {
      persist({ ...state, curriculumDSKP: dskp })
    },
    [state, persist],
  )

  const resetAll = useCallback(() => {
    persist(initialState)
  }, [persist])

  return {
    state,
    loaded,
    updateTimetable,
    addLessonPlan,
    updateLessonPlan,
    deleteLessonPlan,
    importDSKP,
    resetAll,
  }
}
