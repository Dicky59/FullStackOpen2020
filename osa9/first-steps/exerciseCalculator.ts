interface Result {
  trainingDays: number,
  periodLength: number,
  target: number,
  average: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
}

interface InputArgs {
  exercises: Array<number>,
  target: number
}

const parseArgs = (args: Array<string>):InputArgs => {
  if (args.length < 4) throw new Error('Not enough arguments');
  const target = Number(args[2]);
  const exercises = args.slice(3).map(value => Number(value));
  if (exercises.find(value => isNaN(value)) !== undefined) {
    throw new Error('Provided values were not numbers!');
  }
  return {
    exercises,
    target
  };
};

export const calculateExercises = (hours: Array<number>, target: number): Result => {
  const periodLength = hours.length;
  const average = hours.reduce((a, b) => a + b) / periodLength;
  let rating = 0;
  let ratingsDescription = '';
  
  if (average >= target) {rating = 3; ratingsDescription = 'excellent';}
  else if (average/target >= 0.7) {rating = 2; ratingsDescription = 'not too bad but could be better';}
  else if (average/target < 0.7) {rating = 1; ratingsDescription = 'lazy monkey';}


  return {
    trainingDays: hours.filter((hour) => hour !== 0).length,
    periodLength: periodLength,
    target: target,
    average: average,
    success: average >= target,
    rating: rating,
    ratingDescription: ratingsDescription,
  };
};
try {
  const { exercises, target } = parseArgs(process.argv);
  console.log(calculateExercises(exercises, target));
} catch (e) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  console.log('Error, something happened, message: ', e.message);
}