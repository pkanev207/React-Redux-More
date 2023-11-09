import { Link } from "react-router-dom";
import PageNav from "../components/PageNav.jsx";
import AppNav from "../components/AppNav.jsx";

export default function Home() {
  return (
    <div>
      <PageNav />
      <AppNav />
      <h2 className="test">This is the Home Page!!!!!</h2>
      <Link to="/app">Go to the App Layout!!!</Link>
    </div>
  );
}
