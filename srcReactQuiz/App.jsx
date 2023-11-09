import { useEffect, useReducer } from "react";
// As one component rerenders - all his child components will rerender as well
import Header from "./components/Header.jsx";
import DateCounter from "./components/DateCounter.jsx";
import Location from "./components/Location.jsx";
import Main from "./components/Main.jsx";
import StartScreen from "./components/StartScreen.jsx";
import Question from "./components/Question.jsx";
import NextButton from "./components/NextButton.jsx";
import Progress from "./components/Progress.jsx";
import Loader from "./components/Loader.jsx";
import Error from "./components/Error.jsx";
import FinishScreen from "./components/FinishScreen.jsx";
import Timer from "./components/Timer.jsx";
import Footer from "./components/Footer.jsx";
import "./App.css";

const SECS_PER_QUESTION = 30;

const initialState = {
  // using the different statuses to decide what will be display in the main part of the app
  // a bit like a flow -'loading', 'error', 'ready', 'active', 'finished'
  status: "loading",
  questions: [],
  index: 0,
  // try to use the initial state
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
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
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      };
    case "newAnswer":
      // eslint-disable-next-line no-case-declarations
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + Number(question.points)
            : state.points,
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "finish":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case "restart":
      return { ...initialState, questions: state.questions, status: "ready" };
    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };
    default:
      throw new Error("Action unknown");
  }
}

export default function App() {
  const [
    { questions, status, index, answer, points, highscore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);

  // derived state - we can just computed it from other elements
  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce(
    (prev, cur) => prev + cur.points,
    0
  );

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
          <StartScreen dispatch={dispatch} numQuestions={numQuestions} />
        )}
        {status === "active" && (
          <>
            <Progress
              answer={answer}
              index={index}
              numQuestions={numQuestions}
              points={points}
              maxPossiblePoints={maxPossiblePoints}
            />
            <Question
              dispatch={dispatch}
              answer={answer}
              question={questions[index]}
            />
            {/* component composition */}
            <Footer>
              <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
              <NextButton
                dispatch={dispatch}
                answer={answer}
                index={index}
                numQuestions={numQuestions}
              />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <FinishScreen
            dispatch={dispatch}
            points={points}
            maxPossiblePoints={maxPossiblePoints}
            highscore={highscore}
          />
        )}
      </Main>
      <DateCounter />/
      <Location />
    </div>
  );
}

// copy of package.json with ESLint - config is in the data folder
// {
//   "name": "usegeoloction",
//   "private": true,
//   "version": "0.0.0",
//   "type": "module",
//   "scripts": {
//     "dev": "vite",
//     "build": "vite build",
//     "lint": "eslint . --ext js,jsx --report-unused-disable-directives --max-warnings 0",
//     "preview": "vite preview",
//     "server": "json-server --watch data/questions.json --port 8000"
//   },
//   "dependencies": {
//     "json-server": "^0.17.4",
//     "react": "^18.2.0",
//     "react-dom": "^18.2.0"
//   },
//   "devDependencies": {
//     "@types/react": "^18.2.15",
//     "@types/react-dom": "^18.2.7",
//     "@vitejs/plugin-react": "^4.0.3",
//     "eslint": "^8.45.0",
//     "eslint-plugin-react": "^7.32.2",
//     "eslint-plugin-react-hooks": "^4.6.0",
//     "eslint-plugin-react-refresh": "^0.4.3",
//     "vite": "^4.4.5"
//   }
// }
