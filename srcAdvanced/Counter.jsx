/* eslint-disable react/prop-types */

import { createContext, useContext, useState } from "react";
// How to create compound component - recipe:

// 1) Create a context - the greatest use case for contextApi!
const CounterContext = createContext();

// 2) Create the parent component
function Counter({ children }) {
  const [count, setCount] = useState(0);
  const increase = () => setCount((c) => c + 1);
  const decrease = () => setCount((c) => c - 1);

  return (
    <CounterContext.Provider value={{ count, increase, decrease }}>
      {/* Using a div will create a line break, so we are using spans - 
      to be even more flexible! If it is possible at all.. 🤯 
      The children will get access to the common context */}
      <span>{children}</span>
    </CounterContext.Provider>
  );
}

// 3) Create child components to help implement the common task
function Count() {
  const { count } = useContext(CounterContext);
  return <span>{count}</span>;
}
function Label({ children }) {
  return <span>{children}</span>;
}
function Increase({ icon }) {
  const { increase } = useContext(CounterContext);
  return <button onClick={increase}>{icon}</button>;
}
function Decrease({ icon }) {
  const { decrease } = useContext(CounterContext);
  return <button onClick={decrease}>{icon}</button>;
}

// 4) Add child components as properties to parent component (optional)
// T'is possible, cause t'is simply a function, so we can add properties! 😊
Counter.Count = Count;
Counter.Label = Label;
Counter.Increase = Increase;
Counter.Decrease = Decrease;
// 5) Export the parent and the rest will just work! 😎
export default Counter;

//   Compound components are a pattern in React, where several components are
// used together such that they share an implicit state that allows them to
// communicate with each other in the background. This pattern is used when
// multiple components work together to have a shared state and handle logic
// together
