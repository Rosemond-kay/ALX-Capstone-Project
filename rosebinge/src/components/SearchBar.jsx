import React, { useEffect, useState } from "react";

const SearchBar = ({ onSearch, searchQuery, setSearchQuery }) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery);
    }
  };

  const handleClear = () => {
    setSearchQuery("");
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto px-4">
      <div className="relative">
        {/* Search Icon */}
        <svg
          className="absolute top-1/2 transform -translate-y-1/2 text-muted-foreground transition-colors w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>

        {/* Search Input */}
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Search movies and shows..."
          className={`
          w-full h-8 px-2 bg-gray-100 border border-gray-300 rounded-lg transition-all duration-200 text-center
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
          placeholder:text-gray-500
          "}
        `
            .trim()
            .replace(/\s+/g, " ")}
        />

        {/* Clear Button */}
        {searchQuery && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <svg
              className="w-5 h-5 m-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>
    </form>
  );
};

export default SearchBar;
