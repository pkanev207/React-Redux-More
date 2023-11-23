import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchOrder() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    // console.log("Searching...");
    if (!query) return;
    navigate(`/order/${query}`);
    setQuery("");
  }

  return (
    // a nice trick to auto submit this input by wrapping it in form el - just press enter
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Search order #"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </form>
  );
}
