import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { CitiesProvider } from "./contexts/CitiesContext.jsx";
import { AuthProvider } from "./contexts/FakeAuthContext.jsx";
import ProtectedRoute from "./pages/ProtectedRoute.jsx";

import City from "./components/City.jsx";
import CityList from "./components/CityList.jsx";
import CountryList from "./components/CountryList.jsx";
import Form from "./components/Form.jsx";
import SpinnerFullPage from "./components/SpinnerFullPage.jsx";

// Implement code splitting + lazy loading for SPA routes! First define pages, then
// we will load the components as we need them - Webpack will automatically split the bundle
// in chunks when see this lazy function, which is powered by
// Suspense API - allows certain components to wait for something to happen
const Homepage = lazy(() => import("./pages/Homepage.jsx"));
const Product = lazy(() => import("./pages/Product.jsx"));
const Pricing = lazy(() => import("./pages/Pricing.jsx"));
const Login = lazy(() => import("./pages/Login.jsx"));
const AppLayout = lazy(() => import("./pages/AppLayout.jsx"));
const PageNotFound = lazy(() => import("./pages/PageNotFound.jsx"));

// import "./App.css";
// assets folder is to directly import into js files

// most common practice is to split code /lazy load/ at the page level
// basically all the components that represent a page are load separately

export default function App() {
  // we can protect the routes also in the AppLayout component
  // in some cases we might need inside cities provider state from auth provider
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              {/* <Route path="/" element={<Homepage />} /> */}
              <Route index element={<Homepage />} />
              <Route path="product" element={<Product />} />
              <Route path="pricing" element={<Pricing />} />
              <Route path="login" element={<Login />} />
              {/* nested routes - when we want a part of the UI to be controlled by part of the url */}
              {/* The Index route is the default route if none of the child routes is matched */}
              {/* The element can be any jsx element and no slash at the beginning of the Route */}
              {/* <Route index element={<p>List of cities</p>} /> */}
              {/* Navigate component is still used today in nested routes, basically - redirect - declarative way! */}
              <Route
                path="app"
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                <Route
                  index
                  // element={<CityList cities={cities} isLoading={isLoading} />}
                  element={<Navigate replace to={"cities"} />}
                />
                <Route path="cities" element={<CityList />} />
                <Route path="cities/:id" element={<City />} />
                <Route path="countries" element={<CountryList />} />
                <Route path="form" element={<Form />} />
              </Route>
              {/* We than use <Outlet/> to point where to render that piece */}

              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
}

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Root />,
//     errorElement: <ErrorPage />,
//     children: [
//       {
//         path: "contacts/:contactId",
//         element: <Contact />,
//       },
//     ],
//   },
// ]);

// You'll now see the root layout again but a blank page on the right.
// We need to tell the root route where we want it to render its child routes.
// We do that with <Outlet> - find the <div id="detail"> and put an outlet inside

// import { Outlet } from "react-router-dom";

// export default function Root() {
//   return (
//     <>
//       {/* all the other elements */}
//       <div id="detail">
//         <Outlet />
//       </div>
//     </>
//   );
// }

// // user snippets - jsx
// {
//   // Place your snippets for javascript here. Each snippet is defined under a snippet name and has a prefix, body and
//   // description. The prefix is what is used to trigger the snippet and the body will be expanded and inserted. Possible variables are:
//   // $1, $2 for tab stops, $0 for the final cursor position, and ${1:label}, ${2:another} for placeholders. Placeholders with the
//   // same ids are connected.
//   // Example:
//   // "Print to console": {
//   // "prefix": "log",
//   // "body": [
//   // "console.log('$1');",
//   // "$2"
//   // ],
//   // "description": "Log output to console"
//   // }
//   "Solve Function": {
//     "prefix": "solve",
//     "body": [
//       "function solve(${1:input}) {",
//       "\tconsole.log($0);",
//       "",
//       "",
//       "\treturn \"defined\";",
//       "}",
//       "",
//       "console.log(solve($2));",
//       "",
//       "console.log(solve($3));"
//     ],
//     "description": "Solve Function For Judge"
//   },
//   "Native For Loop": {
//     "prefix": "native",
//     "body": [
//       "for (let i = arr$1.length - 1; i >= 0; i--) {",
//       "\tlet el = arr$1[i];$0",
//       "",
//       "}"
//     ],
//     "description": "Improved Native For Loop"
//   },
//   "Reduce": {
//     "prefix": "reduce",
//     "body": [
//       "${1:arr}.reduce((total, amount, ind, self$3) => {",
//       "\t$0",
//       "",
//       "\treturn ${4:total};",
//       "}, ${2:value});"
//     ],
//     "description": "Reduce For Judge"
//   },
//   "For In": {
//     "prefix": "forin",
//     "body": [
//       "for (let ${1:key} in ${2:obj}) {",
//       // "\tlet ${3:elem} = ${2:obj}[${1:key}];",
//       "\t$0",
//       "}"
//     ],
//     "description": "For In Short Loop"
//   },
//   "For": {
//     "prefix": "for",
//     "body": ["for (let i = 0; i < ${1:arr}.length; i++) {", "\t$0", "}"],
//     "description": "For Short Loop"
//   },
//   "const": {
//     "prefix": "c",
//     "body": ["const "],
//     "description": "constant"
//   },
//   "has": {
//     "prefix": "has",
//     "body": ["obj$1.hasOwnProperty($0);"],
//     "description": "Fuck Typescript"
//   },
//     "if": {
//     "prefix": "if",
//     "body": ["if ($1) return $0;"],
//     "description": "Short If Statement"
//   },
//   "entries": {
//     "prefix": "entries",
//     "body": ["Object.entries(obj$0);"],
//     "description": "Fuck Typescript"
//   },
//   "arrow": {
//     "prefix": "arr",
//     "body": ["(${1:req, res}) => {$0}"],
//     "description": "Arrow Function"
//   },
//   "async arrow": {
//     "prefix": "aar",
//     "body": ["async (${1:req, res}) => {$0}"],
//     "description": "Arrow Function"
//   },
//     "async iife": {
//     "prefix": "aife",
//     "body": ["(async (${1:req, res}) => {$0})()"],
//     "description": "Arrow Function"
//   },
//   "throw error": {
//     "prefix": "thr",
//     "body": ["throw new Error('$1');"],
//     "description": "Throw New Error"
//   },
//   "._id": {
//     "prefix": "_",
//     "body": ["$1._id"],
//     "description": "Mongoose id"
//   },
//     "className": {
//     "prefix": "cn",
//     "body": ["className={styles$1}"],
//     "description": "className in React with brackets"
//   },
//   "importCSSModule": {
//     "prefix": "csm",
//     "scope": "javascript,typescript,javascriptreact",
//     "body": ["import styles from './${TM_FILENAME_BASE}.module.css'"],
//     "description": "Import CSS Module as `styles`"
//   },
// }
