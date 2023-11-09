import AppNav from "./AppNav.jsx";
import Logo from "./Logo.jsx";
import styles from "./Sidebar.module.css";

export default function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />
      <p>List of cities</p>
      <footer className={styles.footer}>
        <p className={styles.copyright}>
          &copy; Copyright {new Date().getFullYear()} by 
          WorldWide Inc.
        </p>
      </footer>
    </div>
  );
}
