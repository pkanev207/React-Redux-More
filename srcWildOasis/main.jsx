import React from "react";
import ReactDOM from "react-dom/client";
// import { Provider } from "react-redux";
// import store from "./store";
import App from "./App";

// this will simply run the code in that file:
// import './store'

// store.dispatch({ type: "account/deposit", payload: 250 });
// console.log(store.getState());

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
    {/* <Provider store={store}></Provider> */}
  </React.StrictMode>,
);
