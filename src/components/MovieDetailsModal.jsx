import React, { useEffect } from "react";
import { X, Star, Play, Plus, Calendar, Clock, Award } from "lucide-react";
import Button from "./Button";
import Badge from "./Badge";

/**
 * Movie Details Modal component
 */
export function MovieDetailsModal({
  movie,
  isOpen,
  onClose,
  onAddToWatchlist,
  isInWatchlist,
}) {
  // Handle ESC key to close modal
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      window.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen || !movie) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-card rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
        >
          <X className="h-6 w-6" />
        </button>

        {/* Header with Poster Background */}
        <div
          className="relative h-80 bg-cover bg-center"
          style={{ backgroundImage: `url(${movie.poster})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/80 to-transparent"></div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 -mt-32 relative z-10">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Poster */}
            <div className="flex-shrink-0">
              <img
                src={movie.poster}
                alt={movie.title}
                className="w-48 h-72 object-cover rounded-lg shadow-xl"
              />
            </div>

            {/* Details */}
            <div className="flex-1 space-y-4">
              {/* Title */}
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-2">
                  {movie.title}
                </h2>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge
                    variant="secondary"
                    className="bg-primary text-primary-foreground"
                  >
                    <Star className="h-3 w-3 mr-1 fill-yellow-400 text-yellow-400" />
                    {movie.rating.toFixed(1)}
                  </Badge>
                  <Badge variant="outline" className="bg-white">
                    {movie.year}
                  </Badge>
                  {movie.rated && (
                    <Badge variant="outline" className="bg-white">
                      {movie.rated}
                    </Badge>
                  )}
                  <Badge variant="outline" className="bg-white">
                    {movie.duration}
                  </Badge>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  <Play className="h-5 w-5 mr-2" />
                  Watch Now
                </Button>
                <Button
                  size="lg"
                  variant={isInWatchlist ? "default" : "outline"}
                  onClick={() => onAddToWatchlist(movie)}
                >
                  <Plus className="h-5 w-5 mr-2" />
                  {isInWatchlist ? "In Watchlist" : "Add to Watchlist"}
                </Button>
              </div>

              {/* Genres */}
              <div>
                <h3 className="font-semibold mb-2">Genres</h3>
                <div className="flex flex-wrap gap-2">
                  {movie.genre.split(", ").map((genre, index) => (
                    <Badge key={index} variant="secondary">
                      {genre}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Synopsis */}
              <div>
                <h3 className="font-semibold mb-2">Synopsis</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {movie.synopsis}
                </p>
              </div>

              {/* Additional Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold mb-2">Director</h3>
                  <p className="text-muted-foreground">{movie.director}</p>
                </div>
                {movie.country && (
                  <div>
                    <h3 className="font-semibold mb-2">Country</h3>
                    <p className="text-muted-foreground">{movie.country}</p>
                  </div>
                )}
                {movie.language && (
                  <div>
                    <h3 className="font-semibold mb-2">Language</h3>
                    <p className="text-muted-foreground">{movie.language}</p>
                  </div>
                )}
                {movie.imdbVotes && (
                  <div>
                    <h3 className="font-semibold mb-2">IMDb Votes</h3>
                    <p className="text-muted-foreground">{movie.imdbVotes}</p>
                  </div>
                )}
              </div>

              {/* Cast */}
              {movie.cast && movie.cast.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-2">Cast</h3>
                  <div className="flex flex-wrap gap-2">
                    {movie.cast.map((actor, index) => (
                      <span key={index} className="text-muted-foreground">
                        {actor}
                        {index < movie.cast.length - 1 ? ", " : ""}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Awards */}
              {movie.awards && (
                <div>
                  <h3 className="font-semibold mb-2 flex items-center">
                    <Award className="h-4 w-4 mr-2" />
                    Awards
                  </h3>
                  <p className="text-muted-foreground">{movie.awards}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
