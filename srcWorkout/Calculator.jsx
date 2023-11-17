/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { memo, useEffect, useState, useCallback } from "react";
import clickSound from "../public/ClickSound.m4a";

function Calculator({ workouts, allowSound }) {
  const [number, setNumber] = useState(workouts.at(0).numExercises);
  const [sets, setSets] = useState(3);
  const [speed, setSpeed] = useState(90);
  const [durationBreak, setDurationBreak] = useState(5);
  // const duration = (number * sets * speed) / 60 + (sets - 1) * durationBreak;
  // the duration is derive state, but now we want to update it by clicking buttons
  // we can not put the formula in useState, because it would be only called at initializing
  const [duration, setDuration] = useState(0);
  // we want to update the duration each time some part of the formula updates
  // a perfect use case for the useEffect hook as there are so many variables involved
  // a classic example of useEffect updating state when another state updates
  // which is totally wrong 😂 cause useEffect only goes after
  // render happens => hence the second render... We should avoid this when we can

  // const playSound = useCallback(
  //   // the best strategy is to move function like this out of the component, here it won't work
  //   // other strategy is to move it in the effect, but we could not use it outside
  //   // we should memoize the function and it will not be recreated between renders
  //   function () {
  //     if (!allowSound) return;
  //     // just a Browser feature, but now playSound is reactive value, cause it uses another
  //     // reactive value - allowSound should place it in the useEffect
  //     const sound = new Audio(clickSound);
  //     sound.play();
  //   },
  //   // interesting consequence of the whole thing - now the disable sound button will play sound 🤣
  //   // playSound gets recreated every time allowSound changes, the new function triggers
  //   // the useEffect - resets our state, recalculates it
  //   [allowSound]
  // );

  // NB: Each useEffect should be responsible for one state / thing!!
  useEffect(
    function () {
      setDuration((number * sets * speed) / 60 + (sets - 1) * durationBreak);
      // playSound();
    },
    [number, sets, speed, durationBreak]
  );

  // way better to keep track only of the duration and play sound when it changes
  useEffect(() => {
    const playSound = () => {
      if (!allowSound) return;
      new Audio(clickSound).play();
    };

    playSound();
  }, [duration, allowSound]);

  // useEffect relies heavily on closures
  // any function first created and then not have been recreated
  // have access to the initial snapshot of state and props
  useEffect(
    function () {
      console.log(duration, sets);
      document.title = `Your ${number}-exercise workout`;
    },
    // empty array - a stale closure
    [number, duration, sets]
  );

  const mins = Math.floor(duration);
  const seconds = (duration - mins) * 60;

  function handleInc() {
    setDuration((duration) => Math.floor(duration) + 1);
    // playSound();
  }

  function handleDec() {
    setDuration((duration) => (duration > 1 ? Math.ceil(duration) - 1 : 0));
    // playSound();
  }

  return (
    <>
      <form>
        <div>
          <label>Type of workout</label>
          <select value={number} onChange={(e) => setNumber(+e.target.value)}>
            {workouts.map((workout) => (
              <option value={workout.numExercises} key={workout.name}>
                {workout.name} ({workout.numExercises} exercises)
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>How many sets?</label>
          <input
            type="range"
            min="1"
            max="5"
            value={sets}
            onChange={(e) => setSets(e.target.value)}
          />
          <span>{sets}</span>
        </div>
        <div>
          <label>How fast are you?</label>
          <input
            type="range"
            min="30"
            max="180"
            step="30"
            value={speed}
            onChange={(e) => setSpeed(e.target.value)}
          />
          <span>{speed} sec/exercise</span>
        </div>
        <div>
          <label>Break length</label>
          <input
            type="range"
            min="1"
            max="10"
            value={durationBreak}
            onChange={(e) => setDurationBreak(e.target.value)}
          />
          <span>{durationBreak} minutes/break</span>
        </div>
      </form>
      <section>
        <button onClick={handleDec}>-</button>
        <p>
          {mins < 10 && "0"}
          {mins}:{seconds < 10 && "0"}
          {seconds}
        </p>
        <button onClick={handleInc}>+</button>
      </section>
    </>
  );
}

export default memo(Calculator);
