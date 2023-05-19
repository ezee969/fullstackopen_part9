import { NewDiaryEntry, Visibility, Weather } from '../types/types';
export const newDiaryEmpty: NewDiaryEntry = {
  date: '',
  comment: '',
  visibility: Visibility.Ok,
  weather: Weather.Cloudy,
};
