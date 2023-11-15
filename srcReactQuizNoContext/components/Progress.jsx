export default function Progress({
  index,
  numQuestions,
  points,
  maxPossiblePoints,
  answer,
}) {
  return (
    <header className="progress">
      {/* The actual index, not index + 1 as below */}
      {/* A nice trick!!! */}
      <progress max={numQuestions} value={index + Number(answer !== null)} />
      <p>
        Question <strong>{index + 1}</strong> / {numQuestions}
      </p>
      <p>
        <strong>{points}</strong> / {maxPossiblePoints}
      </p>
    </header>
  );
}
