import { useState, useRef, useCallback, useEffect } from 'react'
import TimerCircle from './TimerCircle'
import useAudioPlayer from './useAudioPlayer'

import imgUrl from '../../img/img-imports'

import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
// import AudioPlayer from './PlayAudio'

function WorkoutTimer({ totalTime = 5, intervalTimes = [1, 2, 1] }) {
  const navigate = useNavigate()

  const workout = useSelector((state) => state.workout)
  const { workoutTimerData: intervals } = workout

  const [intervalIndex, setIntervalIndex] = useState(0)
  const [timeLeft, setTimeLeft] = useState(
    intervals.length > 0 ? intervals[0].time : 0
  )
  const [isRunning, setIsRunning] = useState(false)
  const timerRef = useRef(null)

  const [onStart, setOnStart] = useState(false)
  const [onStop, setOnStop] = useState(false)
  const [onReset, setOnReset] = useState(false)

  const startCountdown = useCallback(() => {
    setIsRunning(true)
    setOnStart(true)
    setOnStop(false)
    setOnReset(false)
    timerRef.current = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timerRef.current)
          setIsRunning(false)
          setTimeLeft(0)
          return 0
          // }
        }

        return prevTime - 1
      })
    }, 1000)
  }, [])

  function stopCountdown() {
    setIsRunning(false)
    setOnStart(false)
    setOnStop(true)
    setOnReset(false)
    clearInterval(timerRef.current)
  }

  const resetCountdown = useCallback(() => {
    setIsRunning(false)
    setOnStart(false)
    setOnStop(false)
    setOnReset(true)
    clearInterval(timerRef.current)
    setTimeLeft(intervals[0].time)
    setIntervalIndex(0)
  }, [intervals])

  useEffect(() => {
    if (intervals.length === 0) {
      navigate('/')
    } else {
      if (onStop) {
        stopCountdown()
      } else if (onReset) {
        resetCountdown()
      } else {
        if (timeLeft === 0 && intervalIndex < intervals.length - 1) {
          const nextIntervalIndex = (intervalIndex + 1) % intervals.length
          setIntervalIndex(nextIntervalIndex)
          setTimeLeft(intervals[nextIntervalIndex].time)
          setIsRunning(true)
          startCountdown()
        } else {
          startCountdown()
        }
      }
      return () => stopCountdown()
    }
  }, [
    intervalIndex,
    intervals,
    navigate,
    onReset,
    onStop,
    resetCountdown,
    startCountdown,
    timeLeft,
  ])

  useEffect(() => {
    if (intervals.length > 0 && intervals[intervalIndex].type === 'complete') {
      setTimeout(() => {
        navigate('/workoutstop')
      }, 2000)
    }
  }, [intervalIndex, intervals, navigate])

  useAudioPlayer(
    intervals.length > 0 ? intervals[intervalIndex].time : 0,
    timeLeft,
    intervals.length > 0 && intervals[intervalIndex].type
  )

  return (
    intervals.length > 0 && (
      <div
        className='workout-timer'
        // onClick={isRunning ? stopCountdown : startCountdown}
        // disabled={isRunning ? isRunning : !isRunning}
      >
        {isRunning ? (
          <button
            className='start-btn'
            onClick={stopCountdown}
            disabled={!isRunning}
          >
            Pause
          </button>
        ) : (
          <div className='btns-two'>
            <button
              id='btn-timer-continue'
              className='start-btn'
              onClick={startCountdown}
              disabled={isRunning}
            >
              Continue
            </button>
            {/* <button onClick={resetCountdown} disabled={isRunning}>
          Reset
        </button> */}
            {/* <Link to='/'> */}
            <button
              id='btn-timer-end'
              className='start-btn'
              onClick={() => navigate('/')}
            >
              End
            </button>
            {/* </Link> */}
          </div>
        )}
        <>
          {/* <AudioPlayer initialTime={intervals[intervalIndex].time} timeleft /> */}
          <div>
            {/* <p disabled>Time left: {timeLeft}</p> */}
            {/* {isPlaying && <p disabled>Playing audio...</p>} */}
          </div>
          <p>
            Exercises{' '}
            <strong>
              {intervals[intervalIndex].exerciseNum === 0
                ? intervals[intervals.length - 2].exerciseNum
                : intervals[intervalIndex].exerciseNum}{' '}
              of {intervals[intervals.length - 2].exerciseNum}
            </strong>
          </p>
          <h1>{intervals[intervalIndex].name}</h1>
          <p>
            Sets{' '}
            <strong>
              {intervals[intervalIndex].set} of{' '}
              {intervals[intervals.length - 1].set}
            </strong>
          </p>
        </>

        <TimerCircle
          initialTime={intervals[intervalIndex].time}
          exerciseImg={imgUrl[intervals[intervalIndex].id]} // TODO Change to exerciseImg
          timeLeftInput={timeLeft}
          start={onStart}
          stop={onStop}
          reset={onReset}
        />
        <h1>
          {intervals[intervalIndex].type === 'complete'
            ? 'Well Done'
            : Number(timeLeft)}
        </h1>
      </div>
    )
  )
}

export default WorkoutTimer
