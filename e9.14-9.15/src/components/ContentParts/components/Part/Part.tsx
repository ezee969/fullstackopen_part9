import React from 'react';
import { CoursePart } from '../../../../types';
import { assertNever } from '../../../../utils/assertNever';

interface PartProps {
  partData: CoursePart;
}

const Part = ({ partData }: PartProps) => {
  const PartData = () => {
    switch (partData.kind) {
      case 'basic':
        return (
          <>
            <p>{partData.description}</p>
          </>
        );
      case 'background':
        return (
          <>
            <p>{partData.description}</p>
            <p>{partData.backgroundMaterial}</p>
          </>
        );
      case 'group':
        return (
          <>
            <p>{partData.groupProjectCount}</p>
          </>
        );
      case 'special':
        return (
          <>
            <p>{partData.description}</p>
            <p>{partData.requirements}</p>
          </>
        );
      default:
        assertNever(partData);
    }
  };

  return (
    <div>
      <p>Name:{partData.name}</p>
      {PartData()}
      <p>Ex count:{partData.exerciseCount}</p>
    </div>
  );
};

export default Part;
