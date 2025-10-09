import React from 'react'
import Index from './Components/Index'
import AlertsPage from './Components/Admin/AlertsPage'
import Attendance from './Components/Admin/Attendance'
import StudentsGrades from './Components/Students/StudentsGrades'

function App() {
  return (
    <>
      < Index/>
      <AlertsPage />
      <Attendance />
      <StudentsGrades />
    </>
  )
}

export default App
