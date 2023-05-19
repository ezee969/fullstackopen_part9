interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const calculateExercises = (data: Array<number>, target: number): Result => {
  const totalExerciseTime = data.reduce((total, item) => {
    return total + item;
  }, 0);
  const exercisedDays = data.filter((day) => day > 0);
  const averageExerciseTime = totalExerciseTime / 7;
  const numberOfDays = data.length;
  const numberOfExercisedDays = exercisedDays.length;
  const targetReached = averageExerciseTime >= target;
  const rating = () => {
    switch (true) {
      case averageExerciseTime < target:
        return 1;
      case averageExerciseTime === target:
        return 2;
      case averageExerciseTime > target:
        return 3;
      default:
        return 0;
    }
  };
  const ratingDescription = () => {
    switch (rating()) {
      case 1:
        return 'You need to exercise more';
      case 2:
        return 'You are doing great';
      case 3:
        return 'You are doing great';
      default:
        return 'err';
    }
  };

  return {
    periodLength: numberOfDays,
    trainingDays: numberOfExercisedDays,
    success: targetReached,
    rating: rating(),
    ratingDescription: ratingDescription(),
    target: target,
    average: averageExerciseTime,
  };
};

const data: Array<number> = process.argv
  .slice(2, process.argv.length - 1)
  .map((item) => Number(item));

const target: number = Number(process.argv[process.argv.length - 1]);

console.log(calculateExercises(data, target));
