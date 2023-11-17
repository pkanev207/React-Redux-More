import { useSelector } from "react-redux";

function Customer() {
  // we should do here all kinds of computation, the useSelector basically
  // creates subscription to the store and when the state changes ->
  // the component rerenders, Redux creates optimizations behind the scenes
  const customer = useSelector((store) => store.customer.fullName);

  return <h2>👋 Welcome, {customer}</h2>;
}

export default Customer;
