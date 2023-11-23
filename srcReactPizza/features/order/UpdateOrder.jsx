/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useFetcher } from "react-router-dom";
import Button from "../../ui/Button";
import { updateOrder } from "../../services/apiRestaurant";

function UpdateOrder({ order }) {
  const fetcher = useFetcher();
  // And now we do not use fetcher.load, but fetcher.Form
  // This fetcher.Form will not navigate away from the page
  // it will submit the form and then revalidate the page
  return (
    // usually we have a couple of inputs in the form, but now is ok
    <fetcher.Form method="PATCH" className="text-right">
      <Button type="primary">Make priority</Button>
    </fetcher.Form>
  );
}

export default UpdateOrder;

// in order to work we need to connect this action with the page - in the Router
// the action receives an object with the request and the params:
export async function action({ request, params }) {
  // console.log("Something - from the UpdateOrder Button!!!");
  const data = { priority: true };
  // this is PATCH function from the service:
  await updateOrder(params.orderId, data);
  // we have to return smth from loaders and actions
  return null;
}

// Revalidation means that React router knows that the data has changed
// as a result of this action, whenever this happens, it will refetch
// the data in the background and rerender the page with the new data
