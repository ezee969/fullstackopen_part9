export const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / (height * height);

  if (bmi <= 18.5) {
    return 'underweight';
  } else if (bmi > 18.5 && bmi < 25) {
    return 'healty weight';
  } else if (bmi >= 25 && bmi < 30) {
    return 'overweight';
  }

  return 'obese';
};

const height: number = Number(process.argv[2]);
const weight: number = Number(process.argv[3]);

console.log(calculateBmi(height, weight));
