import React, { useState, useEffect } from "react";
import "../style/TimerCircle.css";

// import plankImg from '../../img/plank-front.png'
// const imageURL = '../../img/plank-front.png';


/**
 * TimerCircle component that displays a circular countdown timer.
 *
 * @param {number} initialTime - The initial time to start the timer from, in seconds.
 * @param {boolean} start - A boolean indicating whether the timer should be running.
 * @param {boolean} stop - A boolean indicating whether the timer should be paused.
 * @param {boolean} reset - A boolean indicating whether the timer should be reset.
 * @returns {JSX.Element} The TimerCircle component.
 */
function TimerCircle({ initialTime = 5, exerciseImg, timeLeftInput, start = true, stop, reset }) {
  // const [timeLeft, setTimeLeft] = useState(initialTime);
  const timeLeft = timeLeftInput
  const [remainingPathColorTime, setRemainingPathColorTime] = useState("");
  const FULL_DASH_ARRAY = 283;

  useEffect(() => {
    let timerInterval;

    /**
     * Calculates the time fraction for the current time and the initial time.
     *
     * @returns {number} The time fraction.
     */
    const calculateTimeFraction = () => {
      const rawTimeFraction = timeLeft / initialTime;
      return rawTimeFraction - (1 / initialTime) * (1 - rawTimeFraction);
    };

    /**
     * Sets the remaining path color of the timer based on the time left.
     *
     * @param {number} timeLeft - The time left in seconds.
     */
    const setRemainingPathColor = (timeLeft) => {
      if (timeLeft <= initialTime / 2) {
        setRemainingPathColorTime("red");
      } else if (timeLeft <= initialTime * (2 / 3)) {
        setRemainingPathColorTime("orange");
      } else {
        setRemainingPathColorTime("green");
      }
    };

    // /**
    //  * Starts the timer.
    //  */
    // const startTimer = () => {
    //   timerInterval = setInterval(() => {
    //     setTimeLeft((timeLeft) => timeLeft - 1);
    //   }, 1000);
    // };

    // /**
    //  * Stops the timer.
    //  */
    // const stopTimer = () => {
    //   clearInterval(timerInterval);
    // };

    // /**
    //  * Resets the timer to the initial time.
    //  */
    // const resetTimer = () => {
    //   setTimeLeft(initialTime);
    // };

    // if (start) {
    //   startTimer();
    // }

    // if (stop || timeLeft === 0) {
    //   stopTimer();
    // }

    // if (reset) {
    //   resetTimer();
    // }

    const circleDasharray = `${(
      calculateTimeFraction() * FULL_DASH_ARRAY
    ).toFixed(0)} 283`;
    document
      .getElementById("base-timer-path-remaining")
      .setAttribute("stroke-dasharray", circleDasharray);

    setRemainingPathColor(timeLeft);

    return () => clearInterval(timerInterval);
  }, [initialTime, start, stop, reset, timeLeft]);

  /**
   * Formats the time into a string of minutes and seconds.
   *
   * @param {number} time - The time in seconds.
   * @returns {string} The time formatted as a string.
   */
  // const formatTime = (time) => {
  //   const minutes = Math.floor(time / 60);
  //   let seconds = time % 60;

  //   if (seconds < 10) {
  //     seconds = `0${seconds}`;
  //   }

  //   return `${minutes}:${seconds}`;
  // };

  return (
    <div className="base-timer">
            <svg
        className="base-timer__svg"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g className="base-timer__circle">
          <circle className="base-timer__path-elapsed" cx="50" cy="50" r="45" />
          <path
            id="base-timer-path-remaining"
            strokeDasharray="283"
            className={`base-timer__path-remaining ${remainingPathColorTime}`}
            d="
              M 50, 50
              m -45, 0
              a 45,45 0 1,0 90,0
              a 45,45 0 1,0 -90,0
            "
          ></path>
        </g>
      </svg>
      <span id="base-timer-label" className="base-timer__label">
        {/* {formatTime(timeLeft)} */}
        
        <div className='workout-img-box'>
          {/* GO */}
      {/* <img className='workout-img' src={exerciseImg} alt='' /> */}
      {/* <img src="/src/img/plank-front.png" alt="Plank" /> */}
      <img src={exerciseImg} alt="Go!" />

        </div>
      </span>
    </div>
  );
}

export default TimerCircle;

