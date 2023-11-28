/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { useRef, useLayoutEffect, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import TooltipContainer from "./TooltipContainer.js";

export default function Tooltip({ children, targetRect }) {
  const ref = useRef(null);
  const [tooltipHeight, setTooltipHeight] = useState(0);

  useLayoutEffect(() => {
    const { height } = ref.current.getBoundingClientRect();
    setTooltipHeight(height);
  }, []);

  let tooltipX = 0;
  let tooltipY = 0;
  if (targetRect !== null) {
    tooltipX = targetRect.left;
    tooltipY = targetRect.top - tooltipHeight;
    if (tooltipY < 0) {
      // It doesn't fit above, so place below.
      tooltipY = targetRect.bottom;
    }
  }

  return createPortal(
    <TooltipContainer x={tooltipX} y={tooltipY} contentRef={ref}>
      {children}
    </TooltipContainer>,
    document.body,
  );
}

// useMovies.js
// import { useState, useEffect } from "react";

const KEY = "f84fc31d";

export function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(
    function () {
      const controller = new AbortController();

      async function fetchMovies() {
        try {
          setIsLoading(true);
          setError("");

          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
            { signal: controller.signal },
          );

          if (!res.ok)
            throw new Error("Something went wrong with fetching movies");

          const data = await res.json();
          if (data.Response === "False") throw new Error("Movie not found");

          setMovies(data.Search);
          setError("");
        } catch (err) {
          if (err.name !== "AbortError") {
            console.log(err.message);
            setError(err.message);
          }
        } finally {
          setIsLoading(false);
        }
      }

      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }

      fetchMovies();

      return function () {
        controller.abort();
      };
    },
    [query],
  );

  return { movies, isLoading, error };
}

// You can use custom hook to wrap mutation:
// eslint-disable-next-line no-undef
const { useMyMutation } = dataHandlerApi;

const timeout = 5000;

export const useMyMutationWithTimeout = () => {
  const [trigger, data] = useMyMutation();

  const triggerWithTimeout = (args) => {
    const request = trigger(args);

    setTimeout(() => request?.abort(), timeout);
  };

  return [triggerWithTimeout, data];
};

// const [avgRating, setAvgRating] = useState(0);

// eslint-disable-next-line no-unused-vars
function handleAdd() {
  const newWatchedMovie = {
    imdbID: selectedId,
    title,
    year,
    poster,
    imdbRating: Number(imdbRating),
    runtime: Number(runtime.split(" ").at(0)),
    userRating,
    countRatingDecisions: countRef.current,
  };

  onAddWatched(newWatchedMovie);
  onCloseMovie();

  // using callback to tackle stale state:
  // setAvgRating(Number(imdbRating));
  // setAvgRating((avgRating) => (avgRating + userRating) / 2);

  // we can also use callback to initialize state - lazy evaluation
  // useState accepts pure function, which do not accepts values and have to return
  // it is only executed once on the initial render and ignored on rerenders
  // We should not call function in useState, we should pass it,
  // because React would call this function on every render
  // useState(localStorage.getItem("watched")) - WRONG!!!

  // When updating state - make sure to NOT mutate objects or arrays, but to replace them

  // useRef.current is persisted across renders
  // 1. Creating a variable that stays the same between renders - previous state
  // 2. Selecting and storing DOM elements
  // 3. Updating Refs do not cause rerender, not immutable, not asynchronous updates

  // we need useEffect for useRef that contains a DOM element, because ref only gets
  // added after the element is loaded and therefore we can only access it in effect which
  // also runs after the DOM has been loaded -  a perfect place!
}

function handleAddWatched(movie) {
  setWatched((watched) => [...watched, movie]);
  // // setWatched is async, so here watched still don't have the movie, hence:
  // localStorage.setItem("watched", JSON.stringify([...watched, movie]));
  // If we set it here, we will also have to clear localStorage when we delete "watched"
}

// useEffect(
//   function () {
//     // here we set directly watched because the effect takes place only when it changes
//     localStorage.setItem("watched", JSON.stringify(watched));
//   },
// // this will also delete "watched" form localStorage if we delete them:
//   [watched]
// );

function handleDeleteWatched(id) {
  setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
}

// like a box that can hold any value
const countRef = useRef(0);

useEffect(
  function () {
    if (userRating) countRef.current++;
  },
  [userRating],
);

const one = () => Promise.resolve("One!");
async function myFunc() {
  console.log("In function!");
  const res = await one();
  console.log(res);
}

console.log("Before function");
myFunc();
console.log("After function");
