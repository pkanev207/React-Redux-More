import { NavLink } from "react-router-dom";
import Logo from "./Logo.jsx";
// all classes are in one huge object
// when we are writing css modules we usually write in kebabCase - the js way!
import styles from "./PageNav.module.css";

export default function PageNav() {
  return (
    <nav className={styles.nav}>
      <Logo />
      {/* React's separation of concerns - css modules - one external file per component */}
      {/* React's philosophy - a component should contain all the information about his appearance - styled components */}
      {/* inline style is scoped to his jsx element - locally scoped */}
      {/* utility first css framework - tailwind */}
      {/* no css at all - fully fledge library - materialUI  */}
      <ul>
        <li>
          <NavLink to="/product">Product</NavLink>
        </li>
        <li>
          <NavLink to="/pricing">Pricing</NavLink>
        </li>
        <li>
          <NavLink to="/login" className={styles.ctaLink}>
            Login
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
