import React from "react";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Search from "./components/Search";
import { useAuth } from "./context/AuthProvider";
import WatchPage from "./components/WatchPage";
import Shimmer from "./components/Shimmer";

function App() {
  const { loading } = useAuth();

  // Conditionally render loading or app layout
  if (loading) {
    return <Shimmer />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search/:searchQuery" element={<Search />} />
          <Route path="/video/:id" element={<WatchPage />} />
          {/* Fallback route for unmatched paths */}
          <Route
            path="*"
            element={<p className="text-center mt-20">Page not found!</p>}
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
