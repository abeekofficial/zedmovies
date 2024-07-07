import { HashLoader } from "react-spinners";
import { Movie } from "../../../interface/movie-api";
import React from "react";

export type MoviesCardProps = {
  movies: Movie[];
  loading: boolean;
};

const MoviesCard: React.FC<MoviesCardProps> = ({ movies, loading }) => {
  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <HashLoader color="hsla(0, 0%, 100%, 1)" />
      </div>
    );
  }

  const getVoteColor = (vote_average: number): string => {
    if (vote_average >= 8) {
      return "bg-yellow-500";
    } else if (vote_average >= 6) {
      return "bg-green-500";
    } else if (vote_average >= 4) {
      return "bg-red-500";
    } else {
      return "bg-gray-500";
    }
  };

  return (
    <div className="grid gap-2 sm:grid-cols-1 md:grid-cols-2 md:gap-4 lg:grid-cols-3 lg:gap-6 xl:grid-cols-4 xl:gap-8">
      {movies.map((movie) => (
        <div key={movie.id} className="flex flex-col items-center relative">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-full h-auto rounded-lg"
          />
          <p
            className={`absolute top-1 left-3 rounded-md text-xl font-bold text-center text-white px-1.5 py-1 ${getVoteColor(
              movie.vote_average
            )}`}
          >
            {movie.vote_average.toFixed(1)}
          </p>
          <p className="text-white text-sm font-semibold absolute bottom-2 right-3">
            {movie.genre_ids}
          </p>
          <h3 className="mt-2 text-white rounded-md text-xl font-bold text-center">
            {movie.title}
          </h3>
        </div>
      ))}
    </div>
  );
};

export default MoviesCard;
