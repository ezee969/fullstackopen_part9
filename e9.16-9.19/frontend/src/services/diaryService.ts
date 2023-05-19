import axios from 'axios';
import { API_URL } from '../utils/API_URL';
import { NewDiaryEntry, DiaryEntry } from '../types/types';

const getAllEntries = async (): Promise<DiaryEntry[]> => {
  const response = await axios.get<DiaryEntry[]>(`${API_URL}/diaries`);
  return response.data;
};

const postNewEntry = async (newEntry: NewDiaryEntry): Promise<DiaryEntry> => {
  const response = await axios.post<DiaryEntry>(`${API_URL}/diaries`, newEntry);
  return response.data;
};

export const diaryService = { getAllEntries, postNewEntry };
