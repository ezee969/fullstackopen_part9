import React, { useEffect, useState } from 'react';
import { DiaryEntry, NewDiaryEntry } from './types/types';
import './App.css';
import { newDiaryEmpty } from './utils/newDiaryEmpty';
import { diaryService } from './services/diaryService';
import AddDiaryForm from './components/AddDiaryForm';
import Error from './components/Error';
import axios from 'axios';

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [newDiary, setNewDiary] = useState<NewDiaryEntry>(newDiaryEmpty);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    try {
      const response: DiaryEntry = await diaryService.postNewEntry(newDiary);
      const newDiaries: DiaryEntry[] = diaries.concat(response);
      setDiaries(newDiaries);
      setNewDiary(newDiaryEmpty);
      setError(null);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.data);
        setError(error.response?.data);
      } else {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    const getDiaries = async () => {
      const fetchedDiaries = await diaryService.getAllEntries();
      setDiaries(fetchedDiaries);
    };

    getDiaries();
  }, []);

  return (
    <div className="App">
      <h1>Diary entries</h1>
      {error && <Error msg={error} />}
      {diaries.map((diary) => (
        <div key={diary.id}>
          <h3>Date: {diary.date}</h3>
          <p>Comment: {diary.comment}</p>
          <p>Visibility: {diary.visibility}</p>
          <p>Weather: {diary.weather}</p>
        </div>
      ))}

      <AddDiaryForm
        newDiary={newDiary}
        setNewDiary={setNewDiary}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}

export default App;
