import React from "react";

/**
 * Category Tabs component for filtering movies
 */
export function CategoryTabs({ activeCategory, onCategoryChange }) {
  const categories = [
    { id: "popular", label: "Popular" },
    { id: "trending", label: "Trending" },
    { id: "action", label: "Action" },
    { id: "comedy", label: "Comedy" },
    { id: "drama", label: "Drama" },
    { id: "horror", label: "Horror" },
    { id: "romance", label: "Romance" },
    { id: "sci-fi", label: "Sci-Fi" },
  ];

  return (
    <div className="border-b border-border">
      <div className="flex space-x-1 overflow-x-auto scrollbar-hide">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`
              px-4 py-3 whitespace-nowrap transition-all duration-200
              ${
                activeCategory === category.id
                  ? "border-b-2 border-primary text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }
            `}
          >
            {category.label}
          </button>
        ))}
      </div>
    </div>
  );
}
