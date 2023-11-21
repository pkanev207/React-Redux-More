import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./ui/Home";
import Menu, { loader as menuLoader } from "./features/menu/Menu";
import Cart from "./features/cart/Cart";
import Order, { loader as orderLoader } from "./features/order/Order";
import CreateOrder, {
  action as createOrderAction,
} from "./features/order/CreateOrder";
import AppLayout from "./ui/AppLayout";
import Error from "./ui/Error";

// declaring the router in a more declarative way 😉
// necessary in react router 4 and above, to enable data fetching
// data loaders, actions... etc. Actions are used to write and to mute data
const router = createBrowserRouter([
  {
    // since this one doesn't have a path, it's technically called a layout route
    element: <AppLayout />,
    // errors that happens in the nested routes will bubble out to the parent
    errorElement: <Error />,
    children: [
      { path: "/", element: <Home /> },
      // data fetching is fired in the router, not in the component
      {
        path: "/menu",
        element: <Menu />,
        loader: menuLoader,
        // we can also define errors on each route and it will not bubble out
        errorElement: <Error />,
      },
      { path: "/cart", element: <Cart /> },
      {
        // here we are connecting the url with the action
        path: "/order/new",
        element: <CreateOrder />,
        // form submission on this route will call the action
        action: createOrderAction,
      },
      {
        path: "/order/:orderId",
        element: <Order />,
        loader: orderLoader,
        errorElement: <Error />,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}

// A feature based structure - each folder will contain all the files
// necessary to make this feature work
// A ui folder - for the more reusable components
// A services folder - for a reusable code for interacting with an API
// Utils - helper functions

// Atomic CSS = Utility-first CSS approach - writing tiny classes with one single purpose,
// and then combining them to build entire layouts
