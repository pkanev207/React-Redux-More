import { useReducer } from "react";
import "./App.css";

/*
INSTRUCTIONS / CONSIDERATIONS:    

1. Let's implement a simple bank account! It's similar to the example that I used as an analogy to explain how useReducer works, but it's simplified (we're not using account numbers here)

2. Use a reducer to model the following state transitions: openAccount, deposit, withdraw, requestLoan, payLoan, closeAccount. Use the `initialState` below to get started.

3. All operations (expect for opening account) can only be performed if isActive is true. If it's not, just return the original state object. You can check this right at the beginning of the reducer

4. When the account is opened, isActive is set to true. There is also a minimum deposit amount of 500 to open an account (which means that the balance will start at 500)

5. Customer can only request a loan if there is no loan yet. If that condition is met, the requested amount will be registered in the 'loan' state, and it will be added to the balance. If the condition is not met, just return the current state

6. When the customer pays the loan, the opposite happens: the money is taken from the balance, and the 'loan' will get back to 0. This can lead to negative balances, but that's no problem, because the customer can't close their account now (see next point)

7. Customer can only close an account if there is no loan, AND if the balance is zero. If this condition is not met, just return the state. If the condition is met, the account is deactivated and all money is withdrawn. The account basically gets back to the initial state
*/

const initialState = {
  balance: 0,
  loan: 0,
  isActive: false,
};

function reducer(state, action) {
  // Reducer function always needs to return some state
  if (!state.isActive && action.type !== "openAccount") {
    return state;
  }

  switch (action.type) {
    case "openAccount":
      return { ...state, isActive: true };
    case "deposit": // usually we don't want this 150 hardcoded in our reducer
      return { ...state, balance: state.balance + 150 };
    case "withdraw":
      if (state.balance >= 50) {
        return { ...state, balance: state.balance - 50 };
      } else {
        alert("You don't have enough money!");
        return { ...state };
      }
    case "requestLoan":
      return {
        ...state,
        balance: state.balance + 5000,
        loan: 5000,
      };
    case "payLoan":
      if (state.balance >= state.loan) {
        return { ...state, balance: state.balance - state.loan, loan: 0 };
      } else {
        alert("You don't have enough money!");
        return { ...state };
      }
    case "closeAccount":
      if (state.balance >= state.loan) {
        alert("Are you sure?");
        return { ...initialState };
      } else {
        alert("You don't have enough money! The Bank owns you now!");
        return { ...state };
      }

    default:
      throw new Error("Unknown action");
  }
  // return state;
}

export default function App() {
  const [{ balance, loan, isActive }, dispatch] = useReducer(
    reducer,
    initialState
  );

  return (
    <div className="App">
      <h1>useReducer Bank Account</h1>
      <p>Balance: {balance}</p>
      <p>Loan: {loan}</p>

      <p>
        <button
          className="btnB"
          onClick={() => {
            console.log("click"), dispatch({ type: "openAccount" });
          }}
          disabled={isActive}
        >
          Open account
        </button>
      </p>
      <p>
        <button
          className="btnB"
          onClick={() => {
            console.log("click"), dispatch({ type: "deposit" });
          }}
          disabled={!isActive}
        >
          Deposit 150
        </button>
      </p>
      <p>
        <button
          className="btnB"
          onClick={() => {
            console.log("click"), dispatch({ type: "withdraw" });
          }}
          disabled={!isActive || balance - 50 < 0}
        >
          Withdraw 50
        </button>
      </p>
      <p>
        <button
          className="btnB"
          onClick={() => {
            console.log("click"), dispatch({ type: "requestLoan" });
          }}
          disabled={!isActive || loan > 0}
        >
          Request a loan of 5000
        </button>
      </p>
      <p>
        <button
          className="btnB"
          onClick={() => {
            console.log("click"), dispatch({ type: "payLoan" });
          }}
          disabled={!isActive || loan === 0 || balance - loan < 0}
        >
          Pay loan
        </button>
      </p>
      <p>
        <button
          className="btnB"
          onClick={() => {
            console.log("click"), dispatch({ type: "closeAccount" });
          }}
          disabled={!isActive}
        >
          Close account
        </button>
      </p>
    </div>
  );
}
