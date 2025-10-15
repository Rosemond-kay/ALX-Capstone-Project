import React, { useState, useEffect } from "react";
import Navigation from "./components/Navigation";
import HeroSection from "./components/HeroSection";
import MovieCard from "./components/MovieCard";
import { MovieDetailsModal } from "./components/MovieDetailsModal";
import { MovieList } from "./components/MovieList";
import { MobileBottomNav } from "./components/MobileBottomNav";
import { SearchPage } from "./components/SearchPage";
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

  //Handle search
  const handleSearch = (query) => {
    if (query.trim()) {
      setCurrentView("search");
    }
  };

  //Handle adding to watchlist
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

  //Handle mobile tab changes
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

                {/* Featured Movies List */}
                <MovieList
                  movies={featuredMovies.slice(0, 6)}
                  title="Best Rated Movies"
                  onSelectMovie={setSelectedMovie}
                  onAddToWatchlist={handleAddToWatchlist}
                  watchlist={watchlist}
                  variant="featured"
                />

                {/* Trending Movies */}
                <MovieList
                  movies={trendingMovies}
                  title="Trending Now"
                  onSelectMovie={setSelectedMovie}
                  onAddToWatchlist={handleAddToWatchlist}
                  watchlist={watchlist}
                />

                {/* Movie Details Modal */}
                <MovieDetailsModal
                  movie={selectedMovie}
                  isOpen={!!selectedMovie}
                  onClose={() => setSelectedMovie(null)}
                  onAddToWatchlist={handleAddToWatchlist}
                  isInWatchlist={
                    selectedMovie
                      ? watchlist.some((w) => w.id === selectedMovie.id)
                      : false
                  }
                />

                {/* Explore Button */}
                <div className="text-center">
                  <Button
                    size="lg"
                    onClick={() => setCurrentView("dashboard")}
                    className="bg-primary hover:bg-primary/90"
                  >
                    Explore All Movies
                  </Button>
                </div>
              </>
            )}
          </div>
        )}

        {/* Dashboard */}
        {currentView === "dashboard" && (
          <div className="space-y-8 p-4 lg:p-8">
            {/* Category Tabs */}
            <CategoryTabs
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />

            {/* Movies Grid */}
            {isLoading ? (
              <div className="text-center py-12">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
                <p className="mt-4 text-muted-foreground">Loading movies...</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                {categoryMovies.map((movie) => (
                  <MovieCard
                    key={movie.id}
                    movie={movie}
                    onSelect={setSelectedMovie}
                    onAddToWatchlist={handleAddToWatchlist}
                    isInWatchlist={watchlist.some((w) => w.id === movie.id)}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Search Page */}
        {currentView === "search" && (
          <SearchPage
            onSelectMovie={setSelectedMovie}
            onAddToWatchlist={handleAddToWatchlist}
            watchlist={watchlist}
          />
        )}

        {/* Watchlist */}
        {currentView === "watchlist" && (
          <div className="space-y-8 p-4 lg:p-8">
            <div className="flex items-center space-x-3">
              <Bookmark className="h-6 w-6" />
              <h2 className="text-2xl font-bold">My Watchlist</h2>
              <span className="bg-primary text-primary-foreground px-2 py-1 rounded-full text-sm">
                {watchlist.length}
              </span>
            </div>

            {watchlist.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                {watchlist.map((movie) => (
                  <MovieCard
                    key={movie.id}
                    movie={movie}
                    onSelect={setSelectedMovie}
                    onAddToWatchlist={handleAddToWatchlist}
                    isInWatchlist={true}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Bookmark className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground mb-4">
                  Your watchlist is empty
                </p>
                <Button onClick={() => setCurrentView("dashboard")}>
                  Discover Movies
                </Button>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav
        activeTab={mobileActiveTab}
        onTabChange={handleMobileTabChange}
        watchlistCount={watchlist.length}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />
    </div>
  );
}
