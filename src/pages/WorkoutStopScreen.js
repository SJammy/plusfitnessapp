import React from 'react'
import { Link } from 'react-router-dom'

const WorkoutStopScreen = () => {
  return (
    <div>
      WorkoutStopScreen
      <Link to='/workout'>
        <button className='start-btn'>Continue WORKOUT</button>
      </Link>
      <Link to='/'>
        <button className='start-btn'>STOP WORKOUT</button>
      </Link>
    </div>
  )
}

export default WorkoutStopScreen
