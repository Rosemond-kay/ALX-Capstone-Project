import React from "react";
import { Play, Plus, Info, Star } from "lucide-react";
import Button from "./Button";
import Badge from "./Badge";

/**
 * Hero Section component for featured movie
 */
export function HeroSection({
  featuredMovie,
  onExplore,
  onPlayMovie,
  onAddToWatchlist,
  isInWatchlist,
}) {
  if (!featuredMovie) {
    return (
      <div className="relative h-[500px] md:h-[600px] bg-muted rounded-2xl overflow-hidden animate-pulse">
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-muted-foreground">Loading featured movie...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-[500px] md:h-[600px] rounded-2xl overflow-hidden group">
      {/* Background Image with Gradient Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center transform group-hover:scale-105 transition-transform duration-700"
        style={{
          backgroundImage: `url(${featuredMovie.poster})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/50 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative h-full flex items-end p-6 md:p-12">
        <div className="max-w-2xl space-y-4">
          {/* Badges */}
          <div className="flex items-center space-x-2">
            <Badge
              variant="secondary"
              className="bg-primary text-primary-foreground"
            >
              Featured
            </Badge>
            <Badge
              variant="outline"
              className="bg-black/50 text-white border-white/30"
            >
              {featuredMovie.year}
            </Badge>
            <Badge variant="secondary" className="bg-black/50 text-rose">
              <Star className="h-3 w-3 mr-1 fill-yellow-400 text-yellow-400" />
              {featuredMovie.rating.toFixed(1)}
            </Badge>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg">
            {featuredMovie.title}
          </h1>

          {/* Meta Info */}
          <div className="flex items-center space-x-4 text-white/90">
            <span>{featuredMovie.duration}</span>
            <span>•</span>
            <span>{featuredMovie.genre.split(",").slice(0, 2).join(", ")}</span>
          </div>

          {/* Synopsis */}
          <p className="text-white/80 line-clamp-3 max-w-xl">
            {featuredMovie.synopsis}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            <Button
              size="lg"
              onClick={() => onPlayMovie(featuredMovie)}
              className="bg-primary hover:bg-primary/90"
            >
              <Play className="h-5 w-5 mr-2" />
              Watch Now
            </Button>
            <Button
              size="lg"
              variant={isInWatchlist ? "default" : "outline"}
              onClick={() => onAddToWatchlist(featuredMovie)}
              className={
                isInWatchlist
                  ? ""
                  : "bg-white/10 hover:bg-white/20 text-white border-white/30"
              }
            >
              <Plus className="h-5 w-5 mr-2" />
              {isInWatchlist ? "In Watchlist" : "Add to Watchlist"}
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={onExplore}
              className="bg-white/10 hover:bg-white/20 text-white border-white/30"
            >
              <Info className="h-5 w-5 mr-2" />
              Explore More
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
