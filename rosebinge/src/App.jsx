import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import HeroSection from "./components/HeroSection";
import MovieList from "./components/MovieList";
import MovieDetailModal from "./components/MovieDetailModal";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    const apiKey = "http://www.omdbapi.com/?i=tt3896198&apikey=2c6c936b";
    const url = `https://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(
      searchQuery
    )}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.Response === "True") {
        setMovies(data.Search);
        setError("");
      } else {
        setMovies([]);
        setError("No movies found. Try another title.");
      }
    } catch {
      setError("Error fetching data. Please check your connection.");
    }
  };

  const handleMovieSelect = (id) => setSelectedMovieId(id);
  const handleCloseModal = () => setSelectedMovieId(null);

  return (
    <div className="min-h-screen bg-[#fbeaea] text-gray-800 font-inter relative pb-20">
      {/* Header */}
      <header className="flex items-center justify-between px-4 md:px-8 py-4">
        <h1 className="text-2xl font-bold text-rose-600">RoseBinge</h1>
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleSearch={handleSearch}
        />
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-rose-100 rounded-full">
            <svg
              className="w-6 h-6 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
              />
            </svg>
          </button>
          <button className="p-2 hover:bg-rose-100 rounded-full">
            <svg
              className="w-6 h-6 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 3v1m0 16v1m8.66-9H20M4 12H3m15.66-6.66l-.71.71m-10.6 10.6l-.71.71m12.02 0l-.71-.71m-10.6-10.6l-.71-.71"
              />
            </svg>
          </button>
        </div>
      </header>

      <HeroSection />

      {error && <p className="text-center text-red-500 mt-4">{error}</p>}

      <MovieList movies={movies} onMovieSelect={handleMovieSelect} />

      {selectedMovieId && (
        <MovieDetailModal
          movieId={selectedMovieId}
          onClose={handleCloseModal}
        />
      )}

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-rose-50/95 backdrop-blur-sm border-t border-rose-200 flex justify-around py-2 z-40">
        <button className="p-2 hover:bg-white/50 rounded-lg transition-colors">
          <svg
            className="w-6 h-6 text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
            />
          </svg>
        </button>
        <button className="p-2 hover:bg-white/50 rounded-lg transition-colors">
          <svg
            className="w-6 h-6 text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
          </svg>
        </button>
        <button className="p-2 hover:bg-white/50 rounded-lg transition-colors">
          <svg
            className="w-6 h-6 text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        </button>
      </nav>
    </div>
  );
}

export default App;
