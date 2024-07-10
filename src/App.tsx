import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import {
  Account,
  Home,
  Watchlist,
  Movies,
  TvSeries,
  MediaDetails,
} from "./components";

function App() {
  const route = [
    { path: "/", element: <Home /> },
    { path: "/watchlist", element: <Watchlist /> },
    { path: "/movies", element: <Movies /> },
    { path: "/account", element: <Account /> },
    { path: "/tv-series", element: <TvSeries /> },
    { path: "/:type/:id", element: <MediaDetails /> },
  ];
  return (
    <BrowserRouter>
      <RootLayout>
        <Routes>
          {route.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Routes>
      </RootLayout>
    </BrowserRouter>
  );
}

export default App;
