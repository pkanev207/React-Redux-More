/* eslint-disable react/prop-types */
import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "login":
      // keeping "...state" makes our code future proof
      return { ...state, user: action.payload, isAuthenticated: true };
    case "logout":
      return { ...state, user: null, isAuthenticated: false };
    default:
      throw new Error("Unknown action type");
  }
}

const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

function AuthProvider({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );

  function login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      dispatch({ type: "login", payload: FAKE_USER });
    }
  }

  function logout() {
    dispatch({ type: "logout" });
  }

  return (
    // we could also pass the dispatch function
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("AuthContext was used outside AuthProvider!");
  }

  return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export { AuthProvider, useAuth };

// // ProtectedRoute.jsx
/* eslint-disable react/prop-types */
// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../contexts/FakeAuthContext.jsx";

// export default function ProtectedRoute({ children }) {
//   // we should not call effect from top level code, they belong to useEffect
//   const navigate = useNavigate();
//   const { isAuthenticated } = useAuth();

//   useEffect(
//     function () {
//       if (!isAuthenticated) navigate("/");
//     },
//     [isAuthenticated, navigate]
//   );
//   // useEffect is executed AFTER the component has been rendered
//   // so it will initially render the children, which includes the User.jsx
//   // return conditionally or fake user data in the component?
//   return isAuthenticated ? children : null;
// }
