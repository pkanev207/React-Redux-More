/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/FakeAuthContext.jsx";

export default function ProtectedRoute({ children }) {
  // we should not call effects from top level code, they belong to useEffect
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(
    function () {
      if (!isAuthenticated) navigate("/");
    },
    [isAuthenticated, navigate]
  );
  // useEffect is executed AFTER the component has been rendered
  // so it will initially render the children, which includes the User.jsx
  // return conditionally or fake user data in the component?
  return isAuthenticated ? children : null;
}
