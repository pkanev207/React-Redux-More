import Options from "./Options.jsx";
import { useQuiz } from "../contexts/QuizContext.jsx";

export default function Question() {
  const { questions, index } = useQuiz();
  const question = questions[index];

  return (
    <div>
      <h4>{question?.question || "Some nice Header"}</h4>
      <Options question={question} />
    </div>
  );
}
