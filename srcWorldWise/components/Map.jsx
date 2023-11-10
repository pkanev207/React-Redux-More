import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";

export default function Map() {
  const navigate = useNavigate();
  // we can update the query string with this hook
  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  return (
    <div
      className={styles.mapContainer}
      onClick={() => {
        // navigating in a imperative way
        navigate("form");
      }}
    >
      <div>
        <h2>
          Position: <br /> {lat}, {lng}
        </h2>
        <button
          className="btnSOB"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            // prevents other event-handlers on the same element:
            // e.stopImmediatePropagation(); // not working in React?
            setSearchParams({
              lat: Math.random(),
              lng: Math.random(),
            });
          }}
        >
          Change position
        </button>
      </div>
    </div>
  );
}
