import { useSearchParams } from "react-router-dom";
// Custom hook on top of another custom hook!
export function useUrlPosition() {
  const [searchParams] = useSearchParams();
  const lat =
    searchParams.get("lat") || window.location.href.split("&")[0].split("=")[1];
  const lng = searchParams.get("lng") || window.location.href.split("&")[1];
  // more generic names, because this is meant to be reusable
  return [lat, lng];
}
