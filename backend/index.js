import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Student from "./routes/students/register.js";
import loginStudent from "./routes/students/login.js";

dotenv.config();
mongoose.connect(process.env.DB_CONNECTION_STRING).then(() => {
  console.log("Connected to MongoDB");
}).catch((err) => {
  console.error("Error connecting to MongoDB", err);
})

const app = express();
const PORT = process.env.PORT || 5000;
let apiVersion = '/api/v1';

// Middleware

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(apiVersion, Student);
app.use(apiVersion, loginStudent);

// Basic route to check server status

app.get('/', (req, res) => {
  res.send('Welcome to the School Attendance Biometric System API');
}); 



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})    