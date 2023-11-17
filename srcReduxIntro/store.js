/* eslint-disable no-unused-vars */
import { legacy_createStore as createStore, combineReducers } from "redux";
import accountReducer from "./features/accounts/accountSlice";
import customerReducer from "./features/customers/customerSlice";
// we don't need the action creators into the store

const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

const store = createStore(rootReducer);

export default store;
