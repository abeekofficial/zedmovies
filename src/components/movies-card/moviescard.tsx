import { HashLoader } from "react-spinners";
import { Movie } from "../../interface/movie-api";

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

  return (
    <div className="grid gap-2 sm:grid-cols-1 md:grid-cols-2 md:gap-4 lg:grid-cols-3 lg:gap-6 xl:grid-cols-4 xl:gap-8">
      {movies.map((movie) => (
        <div key={movie.id} className="flex flex-col items-center p-5">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-full h-auto rounded-lg"
          />
          <h3 className="mt-2 text-white text-xl font-semibold text-center">
            {movie.title}
          </h3>
        </div>
      ))}
    </div>
  );
};

export default MoviesCard;
