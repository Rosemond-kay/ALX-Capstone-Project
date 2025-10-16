import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import MovieCard from "./MovieCard";
import Button from "./Button";

//Movie Carousel component for displaying movies in a scrollable row

export function MovieList({
  movies,
  title,
  onSelectMovie,
  onAddToWatchlist,
  watchlist,
  variant = "default",
}) {
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -400 : 400;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  if (!movies || movies.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      {/* Title */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold dark:text-[#b8336a]">{title}</h2>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll("left")}
            className="rounded-full"
          >
            <ChevronLeft className="h-4 w-4 dark:text-[#b8336a]" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll("right")}
            className="rounded-full"
          >
            <ChevronRight className="h-4 w-4 dark:text-[#b8336a]" />
          </Button>
        </div>
      </div>

      {/* List */}
      <div
        ref={scrollContainerRef}
        className="flex space-x-4 overflow-x-auto scrollbar-hide pb-4 scroll-smooth"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {movies.map((movie) => (
          <div
            key={movie.id}
            className={
              variant === "featured"
                ? "flex-shrink-0 w-80"
                : "flex-shrink-0 w-48"
            }
          >
            <MovieCard
              movie={movie}
              onSelect={onSelectMovie}
              onAddToWatchlist={onAddToWatchlist}
              isInWatchlist={watchlist.some((w) => w.id === movie.id)}
              variant={variant}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
