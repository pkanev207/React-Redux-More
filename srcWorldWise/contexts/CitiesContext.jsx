/* eslint-disable react/prop-types */
import {
  createContext,
  // useState,
  useEffect,
  useContext,
  useReducer,
  useCallback,
} from "react";

const BASE_URL = "http://localhost:9000";
// The URL is an excellent place to store state and an alternative to useEffect in some
// situations - open/close panels, currently selected list item, list sorting order, applied list filters...
// Easy way to store state in a global place, accessible to all components in the app!
// Makes it possible to bookmark and share the page with the exact UI state it had at the time!
// params - to pass data to the next page, query string - to store global state

const CitiesContext = createContext();
// ContextAPI and useReducer - pretty common pattern in React
const initialState = {
  cities: [],
  isLoading: false,
  error: false,
  currentCity: {},
};

// we should put as much as we can logic in the reducer function,but it should be a pure function -
// can not make api requests, so make calls outside and then dispatch the results
// use meaningful naming convention for the action.types - a name in the past, and to see all the related state
// transitions - model them as events and not as setters - not "setCities", but "cities/loaded"
function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "cities/loaded":
      return { ...state, isLoading: false, cities: action.payload };
    case "city/loaded":
      return { ...state, isLoading: false, currentCity: action.payload };
    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };
    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: {},
      };
    case "rejected":
      console.error(action.payload);
      return { ...state, isLoading: false, error: action.payload };
    default:
      throw new Error("Unknown action type");
  }
}

function CitiesProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { cities, isLoading, error, currentCity } = state;
  // It's better to make calculations here than in child components,
  // otherwise they will happen every time the child component rerenders

  // const [cities, setCities] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [currentCity, setCurrenCity] = useState({});

  useEffect(() => {
    (async () => {
      dispatch({ type: "loading" });

      try {
        // setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        // setCities(data);
        dispatch({ type: "cities/loaded", payload: data });
      } catch (err) {
        // console.error(err.message);
        dispatch({ type: "rejected", payload: err.message });
      } finally {
        // setIsLoading(false);
      }
    })();
  }, []);

  // memoizing values in the dependency array of another hook
  // to prevent infinite loop
  const getCity = useCallback(
    function getCity(id) {
      (async () => {
        // the id is a string because is coming from the url somewhere in the components
        if (id == currentCity?.id) return;

        dispatch({ type: "loading" });

        try {
          // setIsLoading(true);
          const res = await fetch(`${BASE_URL}/cities/${id}`);
          const data = await res.json();
          // setCurrenCity(data);
          dispatch({ type: "city/loaded", payload: data });
        } catch (err) {
          // console.error(err.message);
          dispatch({ type: "rejected", payload: err.message });
        } finally {
          // setIsLoading(false);
        }
      })();
    },
    [currentCity.id]
  );

  // function that uploads cities to the fake api - right here
  async function createCity(newCity) {
    dispatch({ type: "loading" });

    try {
      // setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      // then we need to keep the application state with the state of the UI - to keep the UI state with the remote state - RTK Query!
      // setCities((cities) => [...(cities || []), data]);
      dispatch({ type: "city/created", payload: data });
    } catch (err) {
      // console.error(err.message);
      dispatch({ type: "rejected", payload: err.message });
    } finally {
      // setIsLoading(false);
    }
  }

  async function deleteCity(id) {
    dispatch({ type: "loading" });

    try {
      // setIsLoading(true);
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });

      // setCities((cities) => {
      //   cities.filter((city) => city.id !== id);
      // });
      dispatch({ type: "city/deleted", payload: id });
    } catch (err) {
      // console.error(err.message);
      dispatch({ type: "rejected", payload: err.message });
    } finally {
      // setIsLoading(false);
    }
  }

  return (
    // no point in memoizing this values, cause we don't have any component
    // above this one that might trigger a rerender to the Provider
    <CitiesContext.Provider
      // one option is to pass the dispatch function to the components and deal there
      // with updating state, it would be better if we were not dealing with async data
      value={{
        cities,
        isLoading,
        error,
        currentCity,
        getCity,
        createCity,
        deleteCity,
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
