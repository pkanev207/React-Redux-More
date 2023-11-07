/* eslint-disable react/prop-types */
import Options from "./Options.jsx";
export default function Question({ question, dispatch, answer }) {
  return (
    <div>
      <h4>{question?.question || "Some nice Header"}</h4>
      <Options question={question} dispatch={dispatch} answer={answer} />
    </div>
  );
}
