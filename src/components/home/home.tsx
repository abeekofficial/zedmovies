import { useEffect, useState } from "react";
import Banners from "../banners/banner";
import Container from "../../ui/container";
import { ApiService } from "../../services/api-data";
import { Movie } from "../../interface/movie-api";
import { HashLoader } from "react-spinners";

const Home: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const getMovies = async () => {
      try {
        setLoading(true);
        const data = await ApiService(
          "movie/now_playing?language=en-US&page=1"
        );
        console.log(data, "Malumotlar movie");
        setMovies(data.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    getMovies();
  }, []);

  return (
    <Container>
      <Banners />
      <main className="mt-5">
        {loading ? (
          <HashLoader color="hsla(0, 0%, 100%, 1)" />
        ) : (
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
        )}
      </main>
    </Container>
  );
};

export default Home;
