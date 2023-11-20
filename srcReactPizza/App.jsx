import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./ui/Home";
import Menu, { loader as menuLoader } from "./features/menu/Menu";
import Cart from "./features/cart/Cart";
import Order from "./features/order/Order";
import CreateOrder from "./features/order/CreateOrder";
import AppLayout from "./ui/AppLayout";

// declaring the router in a more declarative way 😉
// necessary in react router 4 and above, to enable data fetching
// data loaders, actions... etc
const router = createBrowserRouter([
  {
    // since this one doesn't have a path, it's technically called
    // in React router -- a layout route
    element: <AppLayout />,
    children: [
      { path: "/", element: <Home /> },
      // data fetching is fired in the router, not in the component
      { path: "/menu", element: <Menu />, loader: menuLoader },
      { path: "/cart", element: <Cart /> },
      { path: "/order/new", element: <CreateOrder /> },
      { path: "/order/:orderId", element: <Order /> },
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
