import React from 'react';
import { NewDiaryEntry, Weather, Visibility } from '../types/types';
import WeatherSelect from './WeatherSelect';
import VisibilitySelect from './VisibilitySelect';
import DatePicker from './DatePicker';

interface AddDiaryFormProps {
  handleSubmit: (event: React.SyntheticEvent) => Promise<void>;
  newDiary: NewDiaryEntry;
  setNewDiary: React.Dispatch<React.SetStateAction<NewDiaryEntry>>;
}

const AddDiaryForm = ({
  handleSubmit,
  setNewDiary,
  newDiary,
}: AddDiaryFormProps) => {
  const handleWeatherChange = (value: Weather) => {
    setNewDiary({
      ...newDiary,
      weather: value,
    });
  };
  const handleVisibilityChange = (value: Visibility) => {
    setNewDiary({
      ...newDiary,
      visibility: value,
    });
  };
  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue: string = event.target.value;
    setNewDiary({ ...newDiary, comment: newValue });
  };
  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue: string = event.target.value;
    setNewDiary({ ...newDiary, date: newValue });
  };

  return (
    <div>
      <form>
        <input type="text" value={newDiary.comment} onChange={handleCommentChange} />
        <DatePicker value={newDiary.date} onChange={handleDateChange} />
        <label>
          Weather:
          <WeatherSelect value={newDiary.weather} onChange={handleWeatherChange} />
        </label>
        <label>
          Visibility:
          <VisibilitySelect
            value={newDiary.visibility}
            onChange={handleVisibilityChange}
          />
        </label>
        <button onClick={handleSubmit}>Create</button>
      </form>
    </div>
  );
};

export default AddDiaryForm;
