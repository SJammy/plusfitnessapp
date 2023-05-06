import React, { useState, useEffect } from 'react'
import '../style/TimerCircle.css'

// TimerCircle component that displays a circular countdown timer.
function TimerCircle({
  initialTime = 5,
  exerciseImg,
  timeLeftInput,
  start = true,
  stop,
  reset,
}) {
  const timeLeft = timeLeftInput
  const [remainingPathColorTime, setRemainingPathColorTime] = useState('')
  const FULL_DASH_ARRAY = 283

  useEffect(() => {
    let timerInterval

    //  Calculates the time fraction for the current time and the initial time.
    const calculateTimeFraction = () => {
      const rawTimeFraction = timeLeft / initialTime
      return rawTimeFraction - (1 / initialTime) * (1 - rawTimeFraction)
    }

    const setRemainingPathColor = (timeLeft) => {
      if (timeLeft <= initialTime / 2) {
        setRemainingPathColorTime('red')
      } else if (timeLeft <= initialTime * (2 / 3)) {
        setRemainingPathColorTime('orange')
      } else {
        setRemainingPathColorTime('green')
      }
    }

    const circleDasharray = `${(
      calculateTimeFraction() * FULL_DASH_ARRAY
    ).toFixed(0)} 283`
    document
      .getElementById('base-timer-path-remaining')
      .setAttribute('stroke-dasharray', circleDasharray)

    setRemainingPathColor(timeLeft)

    return () => clearInterval(timerInterval)
  }, [initialTime, start, stop, reset, timeLeft])

  return (
    <div className='base-timer'>
      <svg
        className='base-timer__svg'
        viewBox='0 0 100 100'
        xmlns='http://www.w3.org/2000/svg'
      >
        <g className='base-timer__circle'>
          <circle className='base-timer__path-elapsed' cx='50' cy='50' r='45' />
          <path
            id='base-timer-path-remaining'
            strokeDasharray='283'
            className={`base-timer__path-remaining ${remainingPathColorTime}`}
            d='
              M 50, 50
              m -45, 0
              a 45,45 0 1,0 90,0
              a 45,45 0 1,0 -90,0
            '
          ></path>
        </g>
      </svg>
      <span id='base-timer-label' className='base-timer__label'>
        <div className='workout-img-box'>
          {/* GO */}
          <img src={exerciseImg} alt='Go!' />
        </div>
      </span>
    </div>
  )
}

export default TimerCircle
