import React from 'react'
import StudentsAttendance from '../Components/StudentsAttendance'
import Sidebar from '../Components/Sidebar'

const BiometricAttendance = () => {
  return (
    <div className='flex justify-end'>
      <Sidebar></Sidebar>
      <StudentsAttendance/>
    </div>
  )
}

export default BiometricAttendance
