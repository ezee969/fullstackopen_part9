import React from 'react';
import type { CoursePart } from '../../types';
import { Part } from './components';

interface ContentPartsProps {
  courseParts: CoursePart[];
}

const ContentParts = ({ courseParts }: ContentPartsProps) => {
  return (
    <div>
      {courseParts.map((part, i) => (
        <Part partData={part} key={i} />
      ))}
    </div>
  );
};

export default ContentParts;
