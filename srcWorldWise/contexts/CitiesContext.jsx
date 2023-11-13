/* eslint-disable react/prop-types */
import { createContext, useState, useEffect, useContext } from "react";

const BASE_URL = "http://localhost:9000";
// The URL is an excellent place to store state and an alternative to useEffect in some
// situations - open/close panels, currently selected list item, list sorting order, applied list filters...
// Easy way to store state in a global place, accessible to all components in the app!
// Makes it possible to bookmark and share the page with the exact UI state it had at the time!
// params - to pass data to the next page, query string - to store global state

const CitiesContext = createContext();

function CitiesProvider({ children }) {
  // It's better to make those calculations here than in child components,
  // because there they will happen every time the child component rerenders
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrenCity] = useState({});

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        setCities(data);
      } catch (err) {
        console.error(err.message);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  function getCity(id) {
    (async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities/${id}`);
        const data = await res.json();
        setCurrenCity(data);
      } catch (err) {
        console.error(err.message);
      } finally {
        setIsLoading(false);
      }
    })();
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  // console.log(context);
  if (context === undefined)
    throw new Error("CitiesContext was used outside the CityProvider");
  return context;
}

export { CitiesProvider, useCities };
