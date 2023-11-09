import Map from "../components/Map.jsx";
import Sidebar from "../components/Sidebar.jsx";
import styles from "./AppLayout.module.css";

export default function AppLayout() {
  return (
    <div className={styles.app}>
      <Sidebar />
      <Map />
    </div>
  );
}
