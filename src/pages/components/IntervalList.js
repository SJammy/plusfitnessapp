// IntervalList.js

import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import exercises from '../../data/exercisesData.json'
import { startWorkout, resetWorkout } from '../../actions/workoutActions'

const IntervalList = ({ intervalListItems = exercises }) => {
  const [selectedItems, setSelectedItems] = useState([])
  const [intervalsQty, setIntervalsQty] = useState(5)
  // const [intervalTime, setIntervalTime] = useState(30)
  const [intervalTime, setIntervalTime] = useState(25)
  const [timeGap, setTimeGap] = useState(3)
  const [qtyOfSets, setQtyOfSets] = useState(3)
  const [workoutTimerData, setWorkoutTimerData] = useState([])

  const [settingsMode, setSettingsMode] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const workout = useSelector((state) => state.workout)
  const {
    selectedItems: selectedItemsReducer,
    workoutSettings: workoutSettingsReducer,
    // workoutTimerData: workoutTimerDataReducer,
  } = workout

  const workoutSettings = {
    intervalsQty,
    intervalTime,
    timeGap,
    qtyOfSets,
  }

  // Selects Random Exercises for Workout - Amount === intervalsQty
  const selectRandomItems = useCallback(() => {
    let items = []
    while (items.length < intervalsQty) {
      const randomIndex = Math.floor(Math.random() * intervalListItems.length)
      if (!items.includes(intervalListItems[randomIndex])) {
        items.push(intervalListItems[randomIndex])
      }
    }
    setSelectedItems(items)
  }, [intervalListItems, intervalsQty])

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
    let seconds = time % 60

    if (seconds < 10) {
      seconds = `0${seconds}`
    }

    return `${minutes}:${seconds}`
  }

  const workoutTime = formatTime(
    (intervalTime * intervalsQty + timeGap * intervalsQty) * qtyOfSets +
      (qtyOfSets - 1) * 20
  )

  const produceWorkoutTimerData = useCallback(() => {
    // intervalsQty,
    // intervalTime,
    // timeGap,
    // qtyOfSets,
    const dataList = []

    for (let i = 0; i < qtyOfSets; i++) {
      selectedItems.map((selectedItem, index) => {
        const { type, id, name } = selectedItem
        const itemGap = {
          exerciseNum: index + 1,
          time: timeGap,
          set: i + 1,

          type: 'gap',
          id,
          name: `Next: ${name}`,
        }
        const itemRest = {
          exerciseNum: 0,
          time: 20,
          set: i + 1,

          type: 'rest',
          id: 'rest',
          name: 'Rest',
        }

        const itemExercise = {
          exerciseNum: index + 1,
          time: intervalTime,
          set: i + 1,

          type,
          id,
          name,
        }

        dataList.push(itemGap)
        dataList.push(itemExercise)
        if (index === selectedItems.length - 1 && i < qtyOfSets - 1) {
          dataList.push(itemRest)
        }
        return dataList
      })
      if (i === qtyOfSets - 1) {
        const itemComplete = {
          exerciseNum: 0,
          time: 0,
          set: qtyOfSets,
          type: 'complete',
          id: 'complete',
          name: 'Workout Complete',
        }
        dataList.push(itemComplete)
      }
    }
    return setWorkoutTimerData(dataList)
  }, [intervalTime, qtyOfSets, selectedItems, timeGap])

  useEffect(() => {
    if (selectedItemsReducer.length > 0) {
      setSelectedItems(selectedItemsReducer)
      setIntervalsQty(workoutSettingsReducer.intervalsQty)
      setIntervalTime(workoutSettingsReducer.intervalTime)
      setTimeGap(workoutSettingsReducer.timeGap)
      setQtyOfSets(workoutSettingsReducer.qtyOfSets)
      dispatch(resetWorkout())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Trigger selectRandomItems on component mount and when intervalsQty prop changes
  useEffect(() => {
    // if (selectedItemsReducer.length !== 0) {
    selectRandomItems()
    // }
  }, [intervalsQty, selectRandomItems])

  useEffect(() => {
    produceWorkoutTimerData()
  }, [
    selectedItems,
    intervalsQty,
    intervalTime,
    timeGap,
    qtyOfSets,
    produceWorkoutTimerData,
  ])

  const handleStartWorkout = () => {
    dispatch(startWorkout({ selectedItems, workoutSettings, workoutTimerData }))

    navigate('/workout')
  }

  function handleQtyIncrease() {
    if (intervalsQty < 10) {
      setIntervalsQty((prevQty) => prevQty + 1)
    }
  }

  function handleQtyDecrease() {
    // if (intervalsQty > 5) {
    if (intervalsQty > 2) {
      setIntervalsQty((prevQty) => prevQty - 1)
    }
  }

  function handleTimeIncrease() {
    if (intervalTime < 40) {
      setIntervalTime((prevTime) => prevTime + 1) // add 1 minute
    }
  }

  function handleTimeDecrease() {
    // if (intervalTime > 20) {
    if (intervalTime > 10) {
      // minimum interval time is 1 minute
      setIntervalTime((prevTime) => prevTime - 1) // subtract 1 minute
    }
  }

  function handleQtyOfSetsIncrease() {
    if (qtyOfSets < 10) {
      setQtyOfSets((prevQty) => prevQty + 1)
    }
  }

  function handleQtyOfSetsDecrease() {
    if (qtyOfSets > 1) {
      setQtyOfSets((prevQty) => prevQty - 1)
    }
  }

  function handleTimeGapIncrease() {
    if (timeGap < 5) {
      setTimeGap((prevTime) => prevTime + 1) // add 1 minute
    }
  }

  function handleTimeGapDecrease() {
    if (timeGap > 1) {
      // minimum interval time is 1 minute
      setTimeGap((prevTime) => prevTime - 1) // subtract 1 minute
    }
  }

  return (
    <div className='interval-list-screen'>
      {/* IntervalList */}
      {/* <button className='start-btn' onClick={handleStartWorkout}>
        START WORKOUT
      </button> */}
      <div>
        <button className='start-btn' onClick={handleStartWorkout}>
          START WORKOUT
        </button>
      </div>

      {/* <div className='join-group'> */}
      {/* <h1 className='join-group-item'>
          Exercises:
          <span className=''> {selectedItems.length}</span>
        </h1> */}
      <h1>Workout Time: {workoutTime}</h1>
      {/* </div> */}

      {/* Settings Mode Display & Buttons */}
      <ul className='interval-list-ul'>
        {/* Edit Settings button */}
        <div className='btn-modes-title'>
          <span>Settings</span>
          <button
            className='btn-modes-type'
            onClick={() => setSettingsMode(!settingsMode)}
          >
            Edit Settings
          </button>
        </div>
        {/* INTERVAL TIME & GAPTIME */}
        <li className='interval-list'>
          <div className='interval-list-item'>
            <p className='join-group-item'>
              Interval time 0:{intervalTime}
              {settingsMode && ( // TODO Change to settingsMode
                <span className='join-group-item'>
                  <button onClick={handleTimeIncrease}>+</button>
                  <button onClick={handleTimeDecrease}>-</button>
                  {/* <span>{formatTime(intervalTime)}</span> */}
                </span>
              )}
            </p>
            
          </div>
        </li>
        <li className='interval-list'>
          <div className='interval-list-item'>
            
            <p className='join-group-item'>
              Gap time 0:0{timeGap}
              {settingsMode && ( // TODO Change to settingsMode
                <span className='join-group-item'>
                  <button onClick={handleTimeGapIncrease}>+</button>
                  <button onClick={handleTimeGapDecrease}>-</button>
                  {/* <span>{formatTime(timeGap)}</span> */}
                </span>
              )}
            </p>
          </div>
        </li>
<br/>
        {/* EXERCISES & SETS */}
        <li className='interval-list'>
          <div className='interval-list-item '>
          {/* <div className='interval-list-settings'> */}
            <div className='join-group-item '>
              Exercises {intervalsQty}
              {settingsMode && ( // TODO Change to settingsMode
                <span className='join-group-item'>
                  <button onClick={handleQtyIncrease}>+</button>
                  <button onClick={handleQtyDecrease}>-</button>
                  {/* <span>{intervalsQty}</span> */}{' '}
                </span>
              )}
            </div>
            {/* </div> */}
            
          </div>
        </li>
        <li className='interval-list'>
          <div className='interval-list-item '>
            {/* <div className='interval-list-settings'> */}
              <div className='join-group-item '>
                Sets {qtyOfSets}
                {settingsMode && ( // TODO Change to settingsMode
                  <span className='join-group-item'>
                    <button onClick={handleQtyOfSetsIncrease}>+</button>
                    <button onClick={handleQtyOfSetsDecrease}>-</button>
                    {/* <span>{qtyOfSets}</span> */}{' '}
                  </span>
                )}
              </div>
            {/* </div> */}
          </div>
        </li>

        {/* <li className='interval-list'> */}
        {/* <div className='interval-list-item'> */}
        {/* Refresh List button */}
        {/* <button className='refresh-btn' onClick={selectRandomItems}> */}
        {/* Refresh List */}
        {/* </button> */}
        {/* Edit Settings button */}
        {/* <button */}
        {/* className='refresh-btn' */}
        {/* onClick={() => setSettingsMode(!settingsMode)} */}
        {/* > */}
        {/* Edit Settings */}
        {/* </button> */}
        {/* </div> */}
        {/* </li> */}
        <br />

        <br />
        <div className='btn-modes-title'>
          <span>Exercise List</span>
          {/* Refresh List button */}

          <button className='btn-modes-type' onClick={selectRandomItems}>
            Refresh List
          </button>
        </div>
        {/* DISPLAY EXERCISES LIST */}
        {selectedItems.map((item, index) => (
          <li key={index} className='interval-list'>
            <div className='interval-list-item'>{item.name}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default IntervalList
