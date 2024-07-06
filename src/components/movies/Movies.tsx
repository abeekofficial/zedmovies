import { useEffect, useState } from "react";
import Container from "../../ui/container";
import { ApiService } from "../../services/api-data";
import { Movie, MovieApiResponse } from "../../interface/movie-api";
import MoviesCard from "../movies-card/moviescard";
import { Box, Button } from "@mui/material";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
const Movies = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    const getMovies = async (page: number) => {
      try {
        setLoading(true);
        const data: MovieApiResponse = await ApiService(
          `/movie/top_rated?language=en-US`,
          page
        );
        setMovies(data.results);
        setTotalPages(data.total_pages);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    getMovies(currentPage);
  }, [currentPage]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <Container>
      <main className="mt-5">
        <MoviesCard movies={movies} loading={loading} />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "350px",
            marginX: "auto",
            alignItems: "center",
          }}
        >
          <Button
            sx={{ paddingY: "10px" }}
            variant="outlined"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            <FaChevronLeft />
          </Button>
          <p className="text-white font-semibold border-blue-800 border py-1.5 px-3">
            Page {currentPage} of {totalPages}
          </p>
          <Button
            sx={{ paddingY: "10px" }}
            variant="outlined"
            onClick={handleNextPage}
          >
            <FaChevronRight />
          </Button>
        </Box>
      </main>
    </Container>
  );
};

export default Movies;
