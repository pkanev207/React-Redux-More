/* eslint-disable no-case-declarations */
import { useEffect, useReducer } from "react";

import Header from "./components/Header.jsx";
// import DateCounter from "./components/DateCounter.jsx";
// import Location from "./components/Location.jsx";
import Main from "./components/Main.jsx";
import StartScreen from "./components/StartScreen.jsx";
import Question from "./components/Question.jsx";
import Loader from "./components/Loader.jsx";
import Error from "./components/Error.jsx";
import "./App.css";

const initialState = {
  // using the different statuses to decide what will be display in the main part of the app
  // a bit like a flow -'loading', 'error', 'ready', 'active', 'finished'
  status: "loading",
  questions: [],
  index: 0,
  answer: null,
  points: 0,
};

// whenever is possible we should put more of the logic for
// calculating next state - right into the reducer
function reducer(state, action) {
  // console.log(action.payload);
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      console.error(action.payload);
      return { ...state, status: "error" };
    case "start":
      return { ...state, status: "active" };
    case "newAnswer":
      const question = state.questions.at(state.index);

      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + Number(question.points)
            : state.points,
      };
    default:
      throw new Error("Action unknown");
  }
}

export default function App() {
  const [{ questions, status, index, answer }, dispatch] = useReducer(
    reducer,
    initialState
  );
  const numQuestions = questions.length;

  useEffect(function () {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      // basically we are creating data received event:
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((e) => dispatch({ type: "dataFailed", payload: e.message }));
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {/* status values are mutually exclusive, so we don't need ternary operators */}
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <Question
            question={questions[index]}
            dispatch={dispatch}
            answer={answer}
          />
        )}
        {/* <DateCounter /> */}
        {/* <Location /> */}
      </Main>
    </div>
  );
}
