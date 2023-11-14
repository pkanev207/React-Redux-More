/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { useCities } from "../contexts/CitiesContext.jsx";
import styles from "./CityItem.module.css";

// place the functions outside the component, of course, so it doesn't always get recreated
const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

export default function CityItem({ city }) {
  const { currentCity, deleteCity } = useCities();
  const { cityName, yetanotheremoji, date, id, position } = city;

  function handleClick(e) {
    // by clicking on the button we are also clicking on the Link!
    e.preventDefault();
    deleteCity(id);
  }

  return (
    <li>
      {/* in this format it will only added to the current url 
      if we add "/" - it will go to the root URL + "/id"*/}
      <Link
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
        className={`${styles.cityItem} ${
          id === currentCity?.id ? styles["cityItem--active"] : ""
        }`}
      >
        <span className={styles.emoji}>{yetanotheremoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{formatDate(date)}</time>
        <button className={styles.deleteBtn} onClick={handleClick}>
          &times;
        </button>
      </Link>
    </li>
  );
}
