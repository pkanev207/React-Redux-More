/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useEffect, useState } from "react";
import { useCities } from "../contexts/CitiesContext.jsx";
import styles from "./Map.module.css";
import { useGeolocation } from "../hooks/useGeolocation.js";
import Button from "./Button.jsx";
import { useUrlPosition } from "../hooks/useUrlPosition.js";

export default function Map() {
  // const navigate = useNavigate();
  const { cities } = useCities();
  const [mapPosition, setMapPosition] = useState([40, 0]);
  // we can update the query string with this hook
  const {
    isLoading: isLoadingPosition,
    position: geolocationPosition,
    getPosition,
  } = useGeolocation();

  const [mapLat, mapLng] = useUrlPosition();
  // const [searchParams, setSearchParams] = useSearchParams();
  // const mapLat = searchParams.get("lat");
  // const mapLng = searchParams.get("lng");
  // console.log("From The Map Component!", mapLat, mapLng);
  // synchronization mechanism
  useEffect(() => {
    if (mapLat && mapLng) return setMapPosition([mapLat, mapLng]);
  }, [mapLat, mapLng]);

  // in React, right now, there is a push to write as little effects as possible
  // to avoid many rerenders
  useEffect(
    function () {
      if (geolocationPosition)
        setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
    },
    [geolocationPosition]
  );

  return (
    <div className={styles.mapContainer}>
      {!geolocationPosition && (
        <Button type="position" onClick={getPosition}>
          {isLoadingPosition ? "Loading..." : "Use your position"}
        </Button>
      )}
      <MapContainer
        center={mapPosition}
        zoom={6}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />

        {cities.map((city) => {
          return (
            <Marker
              position={[city.position.lat, city.position.lng]}
              key={crypto.randomUUID()}
            >
              <Popup>
                <span>{city.yetanotheremoji}</span>
                <span>{city.cityName}</span>
              </Popup>
            </Marker>
          );
        })}

        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>

      <br />
    </div>
  );
}

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  // since this is component we have to return JSX
  // null is completely valid JSX

  return null;
}

// yet another custom component
function DetectClick() {
  const navigate = useNavigate();

  useMapEvents({
    click: (e) => {
      // console.log(e);
      // navigating in a imperative way
      navigate(`form?lat=${e.latlng.lat}&${e.latlng.lng}`);
    },
  });
}

// import { icon } from "leaflet";
// const ICON = icon({
//   // iconUrl: "../assets/react.svg",
//   iconUrl: "/marker.png",
//   iconSize: [32, 32],
// });
// then place on the <Marker>,/Marker>   {/* icon={ICON} */}

{
  /* <div>
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
      </div> */
}
