// A very nice reusable hook for us! 😀
import { useEffect, useRef } from "react";

// here we can specify whether to use in the bubbling or the capturing phase
export function useOutsideClick(handler, listenCapturing = true) {
  const ref = useRef();

  useEffect(
    function () {
      function handleClick(e) {
        // ref.current - the dom node where this reference is stored 🤓
        if (ref.current && !ref.current.contains(e.target)) {
          handler();
        }
      }

      // we should listen for this event on the capturing phase, not on the
      // bubbling, because otherwise the opening button will also immediately
      // close the modal. So if we pass a third argument to the event listener with
      // value true, it will listen on the capturing phase.. 🤓
      document.addEventListener("click", handleClick, listenCapturing);

      return () =>
        document.removeEventListener("click", handleClick, listenCapturing);
    },
    [handler, listenCapturing],
  );

  return ref;
}
