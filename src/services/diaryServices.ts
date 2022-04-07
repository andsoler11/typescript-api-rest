import { NonSensitiveDiaryEntry, DiaryEntry, NewDiaryEntry } from '../types'
import diaryData from './diaries.json'

// toca decirle que el json que viene lleva el tipo especificado en la interfaz
const diaries: DiaryEntry[] = diaryData as DiaryEntry[]

export const getEntries = (): DiaryEntry[] => diaries

export const findByID = (id: number): NonSensitiveDiaryEntry | undefined => {
  const entry = diaries.find(d => d.id === id)
  if (entry != null) {
    const { comment, ...restOfDiary } = entry
    return restOfDiary
  }

  return undefined
}

export const getEntriesWithoutSensitiveInfo = (): NonSensitiveDiaryEntry[] => {
  return diaries.map(({ id, date, weather, visibility }) => {
    return {
      id,
      date,
      weather,
      visibility
    }
  })
}

export const addDiary = (newDiaryEntry: NewDiaryEntry): DiaryEntry => {
  const newDiary = {
    id: Math.max(...diaries.map(d => d.id)) + 1,
    ...newDiaryEntry
  }

  diaries.push(newDiary)
  return newDiary
}
