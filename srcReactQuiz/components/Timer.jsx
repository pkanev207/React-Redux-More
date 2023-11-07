import { useEffect } from "react";

export default function Timer({ dispatch, secondsRemaining }) {
  // pretty standard stuff
  const mins = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;

  // we have to place this effect in one of the components that mounts
  // when the game starts, not tha app
  useEffect(
    function () {
      const id = setInterval(() => {
        dispatch({ type: "tick" });
      }, 1000);

      // if we don't clean up - there are many timers, reducing the time fast
      return () => clearInterval(id);
    },
    [dispatch]
  );
  return (
    <div className="timer">
      {mins < 10 && "0"}
      {mins}:{seconds < 10 && "0"}
      {seconds}
    </div>
  );
}
