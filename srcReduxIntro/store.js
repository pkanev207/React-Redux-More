import { configureStore } from "@reduxjs/toolkit";

import accountReducer from "./features/accounts/accountSlice";
import customerReducer from "./features/customers/customerSlice";
// we don't need the action creators into the store

const store = configureStore({
  // specify the root reducer
  reducer: {
    account: accountReducer,
    customer: customerReducer,
  },
});

export default store;
