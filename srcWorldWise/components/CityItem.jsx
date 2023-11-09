/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
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
  const { cityName, yetanotheremoji, date, id } = city;

  return (
    <li>
      {/* in this forma it will only added to the current url 
      if we add "/" - it will go to the root URL + "/id"*/}
      <Link to={`${id}`} className={styles.cityItem}>
        <span className={styles.emoji}>{yetanotheremoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{formatDate(date)}</time>
        <button
          className={styles.deleteBtn}
          onClick={() => console.log("Click!")}
        >
          &times;
        </button>
      </Link>
    </li>
  );
}
