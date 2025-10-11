import React from "react";
import { Star, Plus, Play } from "lucide-react";
import Button from "./Button";
import Badge from "./Badge";
import { Card, CardContent } from "./Card";
import ImageWithFallback from "./ImageWithFallback";

/**
 * Movie Card Component
 * Displays a movie poster with rating, year, and hover effects
 */
export default function MovieCard({
  movie,
  onSelect,
  onAddToWatchlist,
  isInWatchlist,
  variant = "default",
}) {
  const cardClasses =
    variant === "featured"
      ? "group relative overflow-hidden rounded-xl bg-card hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
      : "group relative overflow-hidden rounded-lg bg-card hover:shadow-lg transition-all duration-300 transform hover:scale-105 cursor-pointer";

  const posterClasses =
    variant === "featured"
      ? "w-full h-80 object-cover"
      : "w-full h-64 object-cover";

  return (
    <Card className={cardClasses} onClick={() => onSelect(movie)}>
      <div className="relative overflow-hidden">
        <ImageWithFallback
          src={movie.poster}
          alt={movie.title}
          className={posterClasses}
        />

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="flex space-x-2">
            <Button size="icon" variant="secondary" className="rounded-full">
              <Play className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant={isInWatchlist ? "default" : "outline"}
              className="rounded-full"
              onClick={(e) => {
                e.stopPropagation();
                onAddToWatchlist(movie);
              }}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Rating Badge */}
        <div className="absolute top-2 left-2">
          <Badge variant="secondary" className="bg-black/70 text- border-0">
            <Star className="h-3 w-3 mr-1 fill-yellow-400 text-yellow-400" />
            {movie.rating.toFixed(1)}
          </Badge>
        </div>

        {/* Year Badge */}
        <div className="absolute top-2 right-2">
          <Badge
            variant="outline"
            className="bg-black/70 text-white border-white/30"
          >
            {movie.year}
          </Badge>
        </div>
      </div>

      <CardContent className="p-4">
        <h3 className="font-semibold truncate mb-1">{movie.title}</h3>
        <p className="text-sm text-muted-foreground mb-2">
          {movie.genre.split(",")[0]}
        </p>
        {variant === "featured" && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {movie.synopsis}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
