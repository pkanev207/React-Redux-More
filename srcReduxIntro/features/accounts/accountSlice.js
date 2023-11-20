// const host = "api.frankfurter.app";
// const URL = `https://${host}/latest?amount=10&from=GBP&to=USD`;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    deposit(state, action) {
      // with createSlice we can write mutating logic
      state.balance += action.payload;
    },
    withdraw(state, action) {
      if (state.balance < action.payload)
        return alert("The Bank owns you now!");

      state.balance -= action.payload;
    },
    // action creators here, by default only receives one parameter
    // so we have to prepare the data, to receive more than one argument
    requestLoan: {
      prepare(amount, purpose) {
        // this object will become the payload
        return { payload: { amount, purpose } };
      },
      // course we can always pass only one object 😎
      reducer(state, action) {
        if (state.loan > 0) return alert("The Bank owns you now!");

        state.loan = action.payload.amount;
        state.loanPurpose = action.payload.purpose;
        state.balance = state.balance + action.payload.amount;
      },
    },
    payLoan(state) {
      if (state.loan > state.balance) return alert("The Bank owns you now!");

      state.balance -= state.loan;
      state.loanPurpose = "";
      state.loan = 0;
    },
  },
});

export const { deposit, withdraw, requestLoan, payLoan } = accountSlice.actions;
export default accountSlice.reducer;

// // OLD REDUX WAY
// const initialStateAccount = {
//   balance: 0,
//   loan: 0,
//   loanPurpose: "",
//   isLoading: false,
// };

// export default function accountReducer(state = initialStateAccount, action) {
//   // names written in style: state domain/event
//   switch (action.type) {
//     case "account/deposit":
//       return {
//         ...state,
//         balance: state.balance + action.payload,
//         isLoading: false,
//       };
//     case "account/withdraw":
//       return { ...state, balance: state.balance - action.payload };
//     case "account/requestLoan":
//       if (state.loan > 0) return alert("The Bank owns you now!");
//       // TODO later
//       return {
//         ...state,
//         loan: action.payload.amount,
//         loanPurpose: action.payload.purpose,
//         balance: state.balance + action.payload.amount,
//       };
//     case "account/payLoan":
//       if (state.loan > state.balance) return alert("The Bank owns you now!");
//       return {
//         ...state,
//         loan: 0,
//         loanPurpose: "",
//         balance: state.balance - state.loan,
//       };

//     case "account/convertingCurrency":
//       return { ...state, isLoading: true };
//     default:
//       return state;
//   }
// }

// export function deposit(amount, currency) {
//   if (currency === "USD") return { type: "account/deposit", payload: amount };
//   // if we return function here, Redux knows that this is asynchronous action
//   // that we want to execute, before dispatching anything to the store
//   // eslint-disable-next-line no-unused-vars
//   return async function (dispatch, getState) {
//     dispatch({ type: "account/convertingCurrency" });
//     // API call
//     const res = await fetch(
//       `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
//     );
//     const data = await res.json();
//     const converted = data.rates.USD;
//     // console.log(data.rates.USD);
//     // return action - we delay the action to the future
//     dispatch({ type: "account/deposit", payload: converted });
//   };
// }
// export function withdraw(amount) {
//   return { type: "account/withdraw", payload: amount };
// }
// export function requestLoan(amount, purpose) {
//   return {
//     type: "account/requestLoan",
//     payload: { amount: amount, purpose: purpose },
//   };
// }
// export function payLoan() {
//   return { type: "account/payLoan" };
// }
