import React from 'react';
import { Header, Total, ContentParts } from './components';
import { courseParts } from './utils/courseParts';

const App = () => {
  const courseName = 'Half Stack application development';

  return (
    <div>
      <Header courseName={courseName} />
      <ContentParts courseParts={courseParts} />
      <Total courseParts={courseParts} />
    </div>
  );
};

export default App;
