import { useEffect, useState } from "react";
import Container from "../../ui/container";
import { ApiService } from "../../services/api-data";
import { Movie } from "../../interface/movie-api";
import TvSeriesCard from "../TvSeriesCard/tvseriescard";

const TvSeries = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [series, setSeries] = useState<Movie[]>([]);

  useEffect(() => {
    const getMovies = async () => {
      try {
        setLoading(true);
        const data = await ApiService("trending/tv/day?language=en-US");
        console.log(data, "Malumotlar movie");
        setSeries(data.results);
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
      <main className="mt-5">
        <TvSeriesCard loading={loading} movies={series} />
      </main>
    </Container>
  );
};

export default TvSeries;
