/* eslint-disable react/prop-types */
import { useState } from "react";

function SlowComponent() {
  // If this is too slow on your machine, reduce the `length`
  // const words = Array.from({ length: 100_000 }, () => "WORD");
  const words = Array.from({ length: 100_00 }, () => "WORD");
  return (
    <ul>
      {words.map((word, i) => (
        <li key={i}>
          {i}: {word}
        </li>
      ))}
    </ul>
  );
}

// The Slow Component does not need the state, but it has been
// rerender nonetheless every time the state changes. So we split them
// by passing the SlowComponent as children
function Counter({ children }) {
  const [count, setCount] = useState(0);
  return (
    <div>
      <h1>Slow counter?!?</h1>
      <button onClick={() => setCount((c) => c + 1)}>Increase: {count}</button>
      {children}
    </div>
  );
}

export default function Test() {
  // const [count, setCount] = useState(0);
  // return (
  //   <div>
  //     <h1>Slow counter?!?</h1>
  //     <button onClick={() => setCount((c) => c + 1)}>Increase: {count}</button>

  //     <SlowComponent />
  //   </div>
  // );

  return (
    <div>
      <Counter>
        <SlowComponent />
      </Counter>
    </div>
  );
}
