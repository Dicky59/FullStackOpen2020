import React from 'react';
import Content from "./components/Content";
import Header from './components/Header';
import Total from "./components/Total";
import { CoursePart } from './types';

const App: React.FC = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev"
    },
    {
      name: "Money for Nothing",
      exerciseCount: 9,
      description: "Chicks for free",
      artist: "Dire Straits"
    }
  ];

  const totalExercises: number = courseParts.reduce((acc, part) => acc += part.exerciseCount , 0)

  return (
    <div>

      <Header title={courseName} />

      <Content courseParts={courseParts} />

      <Total totalExercisesCount={totalExercises} />
      
    </div>
  );

};

export default App;