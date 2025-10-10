import React, { useState, useEffect } from "react";
import Navigation from "./components/Navigation";
import HeroSection from "./components/HeroSection";
import Button from "./components/Button";
import { Bookmark } from "lucide-react";
import {
  fetchFeaturedMovies,
  fetchTrendingMovies,
  fetchMoviesByGenre,
} from "./omdbapi";
export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [currentView, setCurrentView] = useState("landing");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [watchlist, setWatchlist] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("popular");
  const [mobileActiveTab, setMobileActiveTab] = useState("home");

  const [featuredMovies, setFeaturedMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [categoryMovies, setCategoryMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load watchlist from localStorage
  useEffect(() => {
    const savedWatchlist = localStorage.getItem("watchlist");
    if (savedWatchlist) {
      setWatchlist(JSON.parse(savedWatchlist));
    }
  }, []);

  // Save watchlist to localStorage
  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
  }, [watchlist]);

  // Apply dark mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // Fetch initial movie data
  useEffect(() => {
    const loadMovies = async () => {
      setIsLoading(true);
      try {
        const [featured, trending] = await Promise.all([
          fetchFeaturedMovies(),
          fetchTrendingMovies(),
        ]);
        setFeaturedMovies(featured);
        setTrendingMovies(trending);
        setCategoryMovies(featured);
      } catch (error) {
        console.error("Error loading movies:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadMovies();
  }, []);

  // Fetch movies by category
  useEffect(() => {
    const loadCategoryMovies = async () => {
      setIsLoading(true);
      try {
        let movies;
        if (activeCategory === "popular") {
          movies = featuredMovies;
        } else if (activeCategory === "trending") {
          movies = trendingMovies;
        } else {
          movies = await fetchMoviesByGenre(activeCategory);
        }
        setCategoryMovies(movies);
      } catch (error) {
        console.error("Error loading category movies:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (featuredMovies.length > 0) {
      loadCategoryMovies();
    }
  }, [activeCategory, featuredMovies, trendingMovies]);

  const featuredMovie =
    featuredMovies.length > 0
      ? featuredMovies.reduce((prev, current) =>
          prev.rating > current.rating ? prev : current
        )
      : null;

  const handleSearch = (query) => {
    if (query.trim()) {
      setCurrentView("search");
    }
  };

  const handleAddToWatchlist = (movie) => {
    setWatchlist((prev) => {
      const isAlreadyInWatchlist = prev.some((w) => w.id === movie.id);
      if (isAlreadyInWatchlist) {
        return prev.filter((w) => w.id !== movie.id);
      } else {
        return [...prev, movie];
      }
    });
  };

  const handleMobileTabChange = (tab) => {
    setMobileActiveTab(tab);
    switch (tab) {
      case "home":
        setCurrentView("landing");
        break;
      case "search":
        setCurrentView("search");
        break;
      case "watchlist":
        setCurrentView("watchlist");
        break;
      case "profile":
        setCurrentView("profile");
        break;
      default:
        break;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <Navigation
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onSearch={handleSearch}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onWatchlistClick={() => setCurrentView("watchlist")}
        watchlistCount={watchlist.length}
        onProfileClick={() => setCurrentView("profile")}
        onHomeClick={() => setCurrentView("landing")}
      />

      {/* Main Content */}
      <main className="pb-20 md:pb-8">
        {/* Landing Page */}
        {currentView === "landing" && (
          <div className="space-y-12 p-4 lg:p-8">
            {isLoading && featuredMovies.length === 0 ? (
              <div className="text-center py-12">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
                <p className="mt-4 text-gray-500">Loading amazing movies...</p>
              </div>
            ) : (
              <>
                {/* Hero Section */}
                <HeroSection
                  featuredMovie={featuredMovie}
                  onExplore={() => setCurrentView("dashboard")}
                  onPlayMovie={setSelectedMovie}
                  onAddToWatchlist={handleAddToWatchlist}
                  isInWatchlist={
                    featuredMovie
                      ? watchlist.some((w) => w.id === featuredMovie.id)
                      : false
                  }
                />
              </>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
