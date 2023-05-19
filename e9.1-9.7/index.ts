import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
import { Request, Response } from 'express';

const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});
app.get('/bmi', (req: Request, res: Response) => {
  const { height, weight } = req.query;
  const numberHeight: number = Number(height);
  const numberWeight: number = Number(weight);

  if (isNaN(numberHeight) || isNaN(numberWeight)) {
    res.status(400).send({ error: 'malformatted parameters' });
  }

  const bmiResult: string = calculateBmi(numberHeight, numberWeight);

  res.send({ height, weight, bmiResult });
});
app.post('/exercises', (req: Request, res: Response) => {
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || !target) {
    res.status(400).send({ error: 'parameters missing' });
  }

  const numberTarget: number = Number(target);
  const numberDailyExercises: Array<number> = daily_exercises.map((item: string) =>
    Number(item)
  );

  if (
    isNaN(numberTarget) ||
    numberDailyExercises.some((item: number) => isNaN(item))
  ) {
    res.status(400).send({ error: 'malformatted parameters' });
  }

  const exerciseResult = calculateExercises(numberDailyExercises, numberTarget);

  res.send(exerciseResult);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
