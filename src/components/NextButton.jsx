export default function NextButton({ dispatch, answer }) {
  if (answer === null) return;

  return (
    // <div style={{ display: `${answer ? "block" : "none"}` }}>NextButton</div>
    <button
      className="btn btn-ui"
      onClick={() => dispatch({ type: "nextQuestion" })}
    >
      Next Button
    </button>
  );
}
