import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import { Account, Home, Settings, Watchlist } from "./components";
import TvSeries from "./components/tv-series/tv-series";
import Movies from "./components/movies/Movies";

function App() {
  return (
    <BrowserRouter>
      <RootLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="/tv-series" element={<TvSeries />} />
          <Route path="/movies/" element={<Movies />} />
          <Route path="/account" element={<Account />} />
        </Routes>
      </RootLayout>
    </BrowserRouter>
  );
}

export default App;
