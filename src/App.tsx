import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import { Home, Watchlist, Movies, TvSeries } from "./components";
import MediaDetails from "./pages/media-details/media-details";

function App() {
  const route = [
    { path: "/", element: <Home /> },
    { path: "/watchlist", element: <Watchlist /> },
    { path: "/movies", element: <Movies /> },
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
