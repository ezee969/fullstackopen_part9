import React from 'react';

interface ErrorProps {
  msg: string;
}

const Error = ({ msg }: ErrorProps) => {
  return (
    <h4
      style={{
        color: 'red',
      }}
    >
      {msg}
    </h4>
  );
};

export default Error;
