import { NavLink } from "react-router-dom";
import styles from "./AppNav.module.css";

export default function AppNav() {
  return (
    <div>
      <nav className={styles.nav}>
        <ul>
          <li>
            {/* navigating in a declarative way, because we declare this component */}
            <NavLink to="cities">Cities</NavLink>
          </li>
          <li>
            <NavLink to="countries">Countries</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}
