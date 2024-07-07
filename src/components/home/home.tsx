import { useEffect, useState } from "react";
import Banners from "../banners/banner";
import Container from "../../ui/container";
import { HashLoader } from "react-spinners";
import { AllData, AllDataApiResponse } from "../../interface/all-data";
import { AllDataService } from "../../services/all-data-service";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [movies, setMovies] = useState<AllData[]>([]);

  useEffect(() => {
    const getMovies = async () => {
      try {
        setLoading(true);
        const data = await AllDataService<AllDataApiResponse>(
          "trending/all/day?language=en-US"
        );
        console.log(data, "All Movies Data");
        setMovies(data.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    getMovies();
  }, []);

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
    <Container>
      <Banners />
      <main className="mt-5">
        {loading ? (
          <HashLoader color="hsla(0, 0%, 100%, 1)" />
        ) : (
          <div className="grid gap-2 sm:grid-cols-1 md:grid-cols-2 md:gap-4 lg:grid-cols-3 lg:gap-6 xl:grid-cols-4 xl:gap-8">
            {movies.map((movie) => (
              <Link to={`/movie/${movie.id}`}>
                <div
                  key={movie.id}
                  className="flex flex-col relative items-center "
                >
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
                  <h3 className="mt-2 text-white text-xl font-semibold text-center">
                    {movie.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </Container>
  );
};

export default Home;
