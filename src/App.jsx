
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import { useState, useEffect } from "react";

import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Profile from "./components/Profile";

import Loader from "./components/Loader";
import Hero from "./components/Hero";
import MarketOverview from "./components/MarketOverview";
import StockTable from "./components/StockTable";
import Portfolio from "./components/Portfolio";
import Watchlist from "./components/Watchlist";
import MarketNews from "./components/MarketNews";
import Features from "./components/Features";
import Footer from "./components/Footer";

function Home() {
  const [watchlist, setWatchlist] = useState([
    "RELIANCE",
    "TCS",
  ]);

  const [selectedStock, setSelectedStock] = useState(null);

  function handleTrade(symbol, action) {
    setSelectedStock({ symbol, action });
    alert(`${action.toUpperCase()} ${symbol} - Demo order`);
  }

  return (
    <>
      <Hero />

      <MarketOverview />

      <StockTable
        onTrade={handleTrade}
        onAddWatchlist={(symbol) =>
          setWatchlist((prev) =>
            prev.includes(symbol) ? prev : [...prev, symbol]
          )
        }
      />

      <Portfolio />

      <Watchlist
        watchlist={watchlist}
        onAdd={(symbol) =>
          setWatchlist((prev) =>
            prev.includes(symbol) ? prev : [...prev, symbol]
          )
        }
        onRemove={(symbol) =>
          setWatchlist((prev) =>
            prev.filter((item) => item !== symbol)
          )
        }
      />

      <MarketNews />
      <Features />
      <Footer />
    </>
  );
}

function Layout() {
  const location = useLocation();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const isAuthPage = [
    "/login",
    "/signup",
    "/profile",
  ].includes(location.pathname);

  return (
    <>
      {loading && <Loader />}

      {!isAuthPage && <Navbar />}

      <div className={loading ? "invisible" : "visible"}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </div>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}
