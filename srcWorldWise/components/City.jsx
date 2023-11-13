import { useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import styles from "./City.module.css";
import { useCities } from "../contexts/CitiesContext.jsx";
import Spinner from "./Spinner.jsx";
import BackButton from "./BackButton.jsx";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

function City() {
  const { id } = useParams();
  const { getCity, currentCity, isLoading } = useCities();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    getCity(id);
  }, [id]);

  // TEMP DATA
  // const currentCity = {
  //   cityName: "Lisbon",
  //   emoji: "🇵🇹",
  //   date: "2027-10-31T15:59:59.138Z",
  //   notes: "My favorite city so far!",
  // };

  const { cityName, yetanotheremoji, date, notes } = currentCity;

  if (isLoading) return <Spinner />;

  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City {id}</h6>
        <h3>
          <span>{yetanotheremoji}</span> {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date || null)}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>
      <div>
        <BackButton />
      </div>
      <br />
      <div>
        <button
          className="btnSOB"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setSearchParams({
              lat: Math.random(),
              lng: Math.random(),
            });
          }}
        >
          Change position
        </button>
        <h3>Position:</h3>
        <p>{searchParams.get("lat")}</p>
        <p>{searchParams.get("lng")}</p>
      </div>
    </div>
  );
}

export default City;
