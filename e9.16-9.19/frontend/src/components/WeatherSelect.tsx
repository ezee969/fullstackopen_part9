import { Weather } from '../types/types';

interface WeatherSelectProps {
  value: Weather;
  onChange: (value: Weather) => void;
}

function WeatherSelect({ value, onChange }: WeatherSelectProps) {
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value as Weather);
  };

  const weatherOptions: Record<string, string> = Weather;

  return (
    <select value={value} onChange={handleSelectChange}>
      {Object.keys(weatherOptions).map((weatherKey) => (
        <option key={weatherKey} value={weatherOptions[weatherKey]}>
          {weatherOptions[weatherKey]}
        </option>
      ))}
    </select>
  );
}

export default WeatherSelect;
