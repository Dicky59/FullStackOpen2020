interface BmiArgs {
  value1: number;
  value2: number;
}

const parseArguments = (args: Array<string>): BmiArgs => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      value1: Number(args[2]),
      value2: Number(args[3])
    }
  } else {
    throw new Error('Provided values were not numbers!');
  }
}

const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / (height / 100) ** 2;

  if (bmi < 18) return 'Low';
  else if (bmi <= 25) return 'Normal (healthy weight)';
  else if (bmi <= 30) return 'High';
  else return 'Very high';
}

try {
  const { value1, value2 } = parseArguments(process.argv);
  calculateBmi(value1, value2);
} catch (e) {
  console.log('Error, something bad happened, message: ', e.message);
}

console.log(calculateBmi(180, 74));