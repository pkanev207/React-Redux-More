import { useState } from "react";
import { useGeolocation } from "../hooks/useGeolocation.js";

export default function Location() {
  const [countClicks, setCountClicks] = useState(0);
  const {
    position: { lat, lng },
    isLoading,
    error,
    getPosition,
  } = useGeolocation();

  function handleClick() {
    setCountClicks((count) => count + 1);
    getPosition();
  }

  return (
    <div style={{ fontSize: "20px", padding: "20px" }}>
      <button
        className="logo"
        style={{
          fontSize: "15px",
          padding: "10px",
          borderRadius: "10px",
          margin: "10px",
        }}
        onClick={handleClick}
        disabled={isLoading}
      >
        Get my position
      </button>

      {isLoading && <p>Loading position...</p>}
      {error && <p>{error}</p>}
      {!isLoading && !error && lat && lng && (
        <p>
          Your GPS position:{" "}
          <a
            target="_blank"
            rel="noreferrer"
            href={`https://www.openstreetmap.org/#map=16/${lat}/${lng}`}
          >
            {lat}, {lng}
          </a>
        </p>
      )}

      <p>You requested position {countClicks} times</p>
    </div>
  );
}
