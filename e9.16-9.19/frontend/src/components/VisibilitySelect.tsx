import { Visibility } from '../types/types';

interface VisibilitySelectProps {
  value: Visibility;
  onChange: (value: Visibility) => void;
}

function VisibilitySelect({ value, onChange }: VisibilitySelectProps) {
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value as Visibility);
  };

  const visibilityOptions: Record<string, string> = Visibility;

  return (
    <select value={value} onChange={handleSelectChange}>
      {Object.keys(visibilityOptions).map((visibilityKey) => (
        <option key={visibilityKey} value={visibilityOptions[visibilityKey]}>
          {visibilityOptions[visibilityKey]}
        </option>
      ))}
    </select>
  );
}

export default VisibilitySelect;
