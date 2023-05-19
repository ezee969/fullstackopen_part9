import express from 'express';
import cors from 'cors';
import diagnosesRouter from './routes/diagnoses';
import patientsRouter from './routes/patients';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors()); // eslint-disable-line @typescript-eslint/no-unsafe-call
// app.use('/api/diagnoses', (req, _res,next) => {
//   console.log(req.method);
//   console.log(req.body);
//   next();

// });
// logger
app.use((req, _res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});
app.use('/api/diagnoses', diagnosesRouter);
app.use('/api/patients', patientsRouter);

app.listen(PORT, () => {
  console.log(`Server runing on port ${PORT}`);
});
