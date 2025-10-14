import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Welcome to the School Attendance Biometric System API');
}); 

app.post('/api/v1/register/student', (req, res) => {
    // Logic to handle student registration
    let studentData = req.body;
    console.log(studentData);
  // Logic to handle attendance data
    res.send('Attendance data received');
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})    