import React from 'react'
// import { Link } from 'react-router-dom'
// import plankImg from '../img/plank-front.png'

// import TimerCircle from './components/TimerCircle'
import WorkoutTimer from './components/WorkoutTimer'

const WorkoutScreen = () => {
  return (
    <div>
      WorkoutScreen
      {/* <Link to='/workoutstop'>
        <button className='start-btn'>PAUSE WORKOUT</button>
      </Link> */}
      <div className='workout-box'>
        {/* <p>1 of 10</p>
        <p>Plank</p> */}
        {/* <div className='workout-img-box'>
          EXERCISE ICON
          <img className='workout-img' src={plankImg} alt='' />
        </div> */}
        <WorkoutTimer />
      </div>
    </div>
  )
}

export default WorkoutScreen
