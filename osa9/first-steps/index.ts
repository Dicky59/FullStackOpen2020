import express from 'express';
import {calculateBmi} from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  if (!weight || !height) {
    res.json({
      error: 'malformatted parameters'
    });
    return;
  }

  res.json({
    weight,
    height,
    bmi: calculateBmi(height, weight)
  });
});

interface RequestBody {
  daily_exercises: Array<number>,
  target: number
}

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const data: RequestBody = req.body;
  if (!data.daily_exercises || !data.target) {
    res.json({
      error:'parameters missing'
    });
  }
  if(!Array.isArray(data.daily_exercises) || !data.daily_exercises.every(v => !isNaN(Number(v)))) {
    res.json({
      error: 'malformatted parameters'
    });
  }

  const result = calculateExercises(data.daily_exercises, data.target);
    res.json(result);
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});