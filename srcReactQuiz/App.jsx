// As one component rerenders - all his child components will rerender as well!!!
import Header from "./components/Header.jsx";
// import DateCounter from "./components/DateCounter.jsx";
// import Location from "./components/Location.jsx";
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
import { useQuiz } from "./contexts/QuizContext.jsx";
import "./App.css";

export default function App() {
  const { status } = useQuiz();

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <StartScreen />}
        {status === "active" && (
          <>
            <Progress />
            <Question />
            <Footer>
              <Timer />
              <NextButton />
            </Footer>
          </>
        )}
        {status === "finished" && <FinishScreen />}
      </Main>
      {/* <DateCounter />/ */}
      {/* <Location /> */}
    </div>
  );
}
