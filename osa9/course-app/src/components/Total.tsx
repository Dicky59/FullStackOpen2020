import React from 'react'

interface TotalProps {
  totalExercisesCount: number;
}

const Total: React.FC<TotalProps> = ({ totalExercisesCount }) => {
  return (
    <div>
      Number of Exercises:{" "}
      {totalExercisesCount}
    </div>
  )
};

export default Total;