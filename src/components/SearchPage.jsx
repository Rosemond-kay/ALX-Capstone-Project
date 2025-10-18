import React, { useState, useEffect } from "react";
import { Search, TrendingUp, Clock, X } from "lucide-react";
import MovieCard from "./MovieCard";
import { searchMoviesByTitle } from "../omdbapi.js";

/**
 * Search Page component with autocomplete and history
 */
export function SearchPage({ onSelectMovie, onAddToWatchlist, watchlist }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]); // ← NEW: Live suggestions

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("recentSearches");
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  // Debounced search for live suggestions
  useEffect(() => {
    if (searchQuery.trim().length < 2) {
      setSuggestions([]);
      return;
    }

    const debounceTimer = setTimeout(async () => {
      try {
        const { movies } = await searchMoviesByTitle(searchQuery);
        setSuggestions(movies.slice(0, 5)); // Show top 5 suggestions
      } catch (error) {
        console.error("Suggestion error:", error);
        setSuggestions([]);
      }
    }, 300); // Wait 300ms after user stops typing

    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  // Save recent searches to localStorage
  const saveRecentSearch = (query) => {
    const updated = [query, ...recentSearches.filter((s) => s !== query)].slice(
      0,
      5
    );
    setRecentSearches(updated);
    localStorage.setItem("recentSearches", JSON.stringify(updated));
  };

  // Handle search
  const handleSearch = async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      setHasSearched(false);
      return;
    }

    setIsSearching(true);
    setShowSuggestions(false);
    setHasSearched(false);
    saveRecentSearch(query);

    try {
      const { movies } = await searchMoviesByTitle(query);
      setSearchResults(movies);
    } catch (error) {
      console.error("Search error:", error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
      setHasSearched(true);
    }
  };

  // Handle search submit
  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(searchQuery);
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    handleSearch(suggestion);
  };

  // ← NEW: Handle movie selection from suggestions
  const handleMovieSelect = (movie) => {
    setSearchQuery(movie.title);
    setShowSuggestions(false);
    onSelectMovie(movie);
  };

  // Clear search
  const handleClear = () => {
    setSearchQuery("");
    setSearchResults([]);
    setHasSearched(false);
    setSuggestions([]);
  };

  // Popular search suggestions
  const popularSearches = [
    "Inception",
    "The Dark Knight",
    "Interstellar",
    "The Matrix",
    "Pulp Fiction",
    "The Godfather",
  ];

  return (
    <div className="min-h-screen p-4 lg:p-8 space-y-6">
      {/* Search Header */}
      <div className="max-w-2xl mx-auto space-y-4">
        <h2 className="text-3xl font-bold text-center">Search Movies</h2>

        {/* Search Input */}
        <form onSubmit={handleSubmit} className="relative">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search for movies..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              className="w-full h-14 pl-12 pr-12 text-lg bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={handleClear}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>

          {/* Suggestions Dropdown */}
          {showSuggestions && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
              {/* Live Movie Suggestions */}
              {searchQuery.length >= 2 && suggestions.length > 0 && (
                <div className="p-2">
                  <div className="flex items-center space-x-2 px-3 py-2 text-sm text-muted-foreground">
                    <Search className="h-4 w-4" />
                    <span>Suggestions</span>
                  </div>
                  {suggestions.map((movie) => (
                    <button
                      key={movie.id}
                      onClick={() => handleMovieSelect(movie)}
                      className="w-full text-left px-3 py-2 hover:bg-muted rounded-md transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        {movie.poster && movie.poster !== "N/A" ? (
                          <img
                            src={movie.poster}
                            alt={movie.title}
                            className="w-10 h-14 object-cover rounded"
                          />
                        ) : (
                          <div className="w-10 h-14 bg-muted rounded flex items-center justify-center">
                            <Search className="h-4 w-4 text-muted-foreground" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{movie.title}</p>
                          <p className="text-sm text-muted-foreground">
                            {movie.year}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {/* Show when typing but no results yet */}
              {searchQuery.length >= 2 && suggestions.length === 0 && (
                <div className="p-4 text-center text-sm text-muted-foreground">
                  <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>Fetching suggestions...</p>
                </div>
              )}

              {/* Recent & Popular when no search query */}
              {searchQuery.length === 0 && (
                <>
                  {/* Recent Searches */}
                  {recentSearches.length > 0 && (
                    <div className="p-2">
                      <div className="flex items-center space-x-2 px-3 py-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>Recent Searches</span>
                      </div>
                      {recentSearches.map((search, index) => (
                        <button
                          key={index}
                          onClick={() => handleSuggestionClick(search)}
                          className="w-full text-left px-3 py-2 hover:bg-muted rounded-md transition-colors"
                        >
                          <div className="flex items-center space-x-3">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>{search}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Popular Searches */}
                  <div className="p-2">
                    <div className="flex items-center space-x-2 px-3 py-2 text-sm text-muted-foreground">
                      <TrendingUp className="h-4 w-4" />
                      <span>Popular Searches</span>
                    </div>
                    {popularSearches.map((search, index) => (
                      <button
                        key={index}
                        onClick={() => handleSuggestionClick(search)}
                        className="w-full text-left px-3 py-2 hover:bg-muted rounded-md transition-colors"
                      >
                        <div className="flex items-center space-x-3">
                          <TrendingUp className="h-4 w-4 text-muted-foreground" />
                          <span>{search}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
        </form>
      </div>

      {/* Search Results */}
      {isSearching && (
        <div className="text-center py-12">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
          <p className="mt-4 text-muted-foreground">Searching...</p>
        </div>
      )}

      {!isSearching && searchResults.length > 0 && (
        <div className="space-y-4">
          <p className="text-muted-foreground">
            Found {searchResults.length} result
            {searchResults.length !== 1 ? "s" : ""} for "{searchQuery}"
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {searchResults.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onSelect={onSelectMovie}
                onAddToWatchlist={onAddToWatchlist}
                isInWatchlist={watchlist.some((w) => w.id === movie.id)}
              />
            ))}
          </div>
        </div>
      )}

      {!isSearching &&
        hasSearched &&
        searchQuery &&
        searchResults.length === 0 && (
          <div className="text-center py-12">
            <Search className="h-16 w-16 mx-auto text-muted-foreground mb-4 opacity-50" />
            <p className="text-muted-foreground">
              No results found for "{searchQuery}"
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Try a different search term
            </p>
          </div>
        )}
    </div>
  );
}
