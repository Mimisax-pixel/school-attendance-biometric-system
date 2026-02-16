import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Student from '../models/students.js';
import Classes from '../models/class.js';
import { processCheckIn } from '../services/checkinService.js';

// load backend .env explicitly
dotenv.config({ path: new URL('../.env', import.meta.url).pathname });

// fallback: if DB string still undefined, parse .env manually
import fs from 'fs';
if (!process.env.DB_CONNECTION_STRING) {
  try {
    const envText = fs.readFileSync(new URL('../.env', import.meta.url), 'utf8');
    const match = envText.match(/^DB_CONNECTION_STRING\s*=\s*(.*)$/m);
    if (match) {
      let val = match[1].trim();
      // strip optional wrapping quotes
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.substring(1, val.length - 1);
      }
      process.env.DB_CONNECTION_STRING = val;
    }
  } catch (err) {
    console.warn('Failed to read .env fallback:', err.message);
  }
}

async function main(){
  try{
    await mongoose.connect(process.env.DB_CONNECTION_STRING);
    console.log('Connected to DB');

    const student = await Student.findOne().lean();
    const classDoc = await Classes.findOne().lean();

    if(!student){
      console.error('No student found in DB');
      process.exit(1);
    }
    if(!classDoc){
      console.error('No class found in DB');
      process.exit(1);
    }

    console.log('Using student:', student._id, student.matricNumber);
    console.log('Using class:', classDoc._id, classDoc.courseCode);

    const result = await processCheckIn(student._id.toString(), classDoc._id.toString());
    console.log('Check-in result:', result);
      // show attendance records for this student and class
      const { attendance } = await import('../models/students.js');
      const possibleIds = [];
      if (student.matricNumber) possibleIds.push(student.matricNumber);
      if (student._id) possibleIds.push(student._id.toString());
      const docs = await attendance.find({ studentId: { $in: possibleIds }, classId: classDoc._id.toString() }).lean();
      console.log('Attendance docs for this student/class:', docs.length, docs);

        // Invoke the student attendance controller directly to see its output
        const { getStudentAttendanceRecords } = await import('../controllers/students/studentDataController.js');
        const fakeReq = { user: { id: student._id.toString() } };
        const fakeRes = {
          status(code) {
            this._status = code;
            return this;
          },
          json(payload) {
            console.log('Controller response status:', this._status || 200);
            console.log('Controller response payload:', JSON.stringify(payload, null, 2));
            return payload;
          },
        };

        await getStudentAttendanceRecords(fakeReq, fakeRes);
      process.exit(0);
  }catch(err){
    console.error('Error running test checkin:', err);
    process.exit(1);
  }
}

main();
