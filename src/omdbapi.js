// OMDb API Service
const OMDB_API_KEY = "2c6c936b";
const OMDB_BASE_URL = "https://www.omdbapi.com/";

// Popular movie IDs to fetch for initial content
const FEATURED_MOVIE_IDS = [
  "tt0111161", // The Shawshank Redemption
  "tt0068646", // The Godfather
  "tt0468569", // The Dark Knight
  "tt0071562", // The Godfather Part II
  "tt0050083", // 12 Angry Men
  "tt0108052", // Schindler's List
  "tt0167260", // The Lord of the Rings: The Return of the King
  "tt0110912", // Pulp Fiction
  "tt0120737", // The Lord of the Rings: The Fellowship of the Ring
  "tt0109830", // Forrest Gump
  "tt1375666", // Inception
  "tt0167261", // The Lord of the Rings: The Two Towers
  "tt0080684", // Star Wars: Episode V
  "tt0133093", // The Matrix
  "tt0099685", // Goodfellas
  "tt0073486", // One Flew Over the Cuckoo's Nest
  "tt0114369", // Se7en
  "tt0047478", // Seven Samurai
  "tt0317248", // City of God
  "tt0076759", // Star Wars: Episode IV
  "tt0102926", // The Silence of the Lambs
  "tt0118799", // Life Is Beautiful
  "tt0038650", // It's a Wonderful Life
  "tt0245429", // Spirited Away
  "tt0120815", // Saving Private Ryan
  "tt0816692", // Interstellar
  "tt6751668", // Parasite
  "tt0114814", // The Usual Suspects
  "tt0120689", // The Green Mile
  "tt0120586", // American History X
];

// Additional popular movies for variety
const TRENDING_MOVIE_IDS = [
  "tt15398776", // Oppenheimer
  "tt1517268", // Barbie
  "tt9362722", // Spider-Man: Across the Spider-Verse
  "tt6710474", // Everything Everywhere All at Once
  "tt10872600", // Spider-Man: No Way Home
  "tt1160419", // Dune
  "tt9114286", // Black Panther: Wakanda Forever
  "tt8041270", // Killers of the Flower Moon
  "tt14230458", // Poor Things
  "tt7657566", // The Holdovers
];

// Cache for API responses
const cache = new Map();

/**
 * Fetch a single movie by IMDb ID
 */
export async function fetchMovieById(imdbId) {
  if (cache.has(imdbId)) {
    return cache.get(imdbId);
  }

  try {
    const response = await fetch(
      `${OMDB_BASE_URL}?i=${imdbId}&apikey=${OMDB_API_KEY}&plot=full`
    );
    const data = await response.json();

    if (data.Response === "True") {
      const movie = transformOmdbToMovie(data);
      cache.set(imdbId, movie);
      return movie;
    }
    return null;
  } catch (error) {
    console.error("Error fetching movie:", error);
    return null;
  }
}

/**
 * Search movies by title
 */
export async function searchMoviesByTitle(query, page = 1) {
  if (!query || query.trim() === "") {
    return { movies: [], totalResults: 0 };
  }

  try {
    const response = await fetch(
      `${OMDB_BASE_URL}?s=${encodeURIComponent(
        query
      )}&apikey=${OMDB_API_KEY}&page=${page}`
    );
    const data = await response.json();

    if (data.Response === "True" && data.Search) {
      // Fetch full details for each movie
      const moviesWithDetails = await Promise.all(
        data.Search.slice(0, 10).map((movie) => fetchMovieById(movie.imdbID))
      );

      return {
        movies: moviesWithDetails.filter((m) => m !== null),
        totalResults: parseInt(data.totalResults) || 0,
      };
    }

    return { movies: [], totalResults: 0 };
  } catch (error) {
    console.error("Error searching movies:", error);
    return { movies: [], totalResults: 0 };
  }
}

/**
 * Fetch multiple movies by their IDs
 */
export async function fetchMultipleMovies(imdbIds) {
  const movies = await Promise.all(imdbIds.map((id) => fetchMovieById(id)));
  return movies.filter((movie) => movie !== null);
}

/**
 * Fetch featured movies for the home page
 */
export async function fetchFeaturedMovies() {
  return await fetchMultipleMovies(FEATURED_MOVIE_IDS.slice(0, 12));
}

/**
 * Fetch trending movies
 */
export async function fetchTrendingMovies() {
  return await fetchMultipleMovies(TRENDING_MOVIE_IDS);
}

/**
 * Get movies by genre
 */
export async function fetchMoviesByGenre(genre) {
  // Since OMDb doesn't have a genre filter, we'll filter our featured movies
  const movies = await fetchFeaturedMovies();
  if (!genre || genre === "all") return movies;

  return movies.filter((movie) =>
    movie.genre.toLowerCase().includes(genre.toLowerCase())
  );
}

/**
 * Transform OMDb API response to our movie format
 */
function transformOmdbToMovie(omdbMovie) {
  return {
    id: omdbMovie.imdbID,
    title: omdbMovie.Title,
    year: parseInt(omdbMovie.Year) || 0,
    rating: parseFloat(omdbMovie.imdbRating) || 0,
    genre: omdbMovie.Genre || "Unknown",
    poster:
      omdbMovie.Poster !== "N/A"
        ? omdbMovie.Poster
        : "https://via.placeholder.com/300x450?text=No+Poster",
    synopsis:
      omdbMovie.Plot !== "N/A" ? omdbMovie.Plot : "No synopsis available.",
    duration: omdbMovie.Runtime !== "N/A" ? omdbMovie.Runtime : "N/A",
    cast: omdbMovie.Actors !== "N/A" ? omdbMovie.Actors.split(", ") : [],
    director: omdbMovie.Director !== "N/A" ? omdbMovie.Director : "Unknown",
    trailer: null,
    awards: omdbMovie.Awards !== "N/A" ? omdbMovie.Awards : null,
    rated: omdbMovie.Rated !== "N/A" ? omdbMovie.Rated : null,
    metascore: omdbMovie.Metascore !== "N/A" ? omdbMovie.Metascore : null,
    imdbVotes: omdbMovie.imdbVotes !== "N/A" ? omdbMovie.imdbVotes : null,
    country: omdbMovie.Country !== "N/A" ? omdbMovie.Country : null,
    language: omdbMovie.Language !== "N/A" ? omdbMovie.Language : null,
  };
}
