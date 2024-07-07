import { useEffect, useState } from "react";
import Container from "../../ui/container";
import TvSeriesCard from "./TvSeriesCard/tvseriescard";
import { Box, Button } from "@mui/material";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { TvSeries, TvSeriesApiResponse } from "../../interface/tv-series";
import { ApiService } from "../../services/api-data";
import TvDetails from "./tv-details/tvdetails";

const TvSeriesPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [series, setSeries] = useState<TvSeries[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    const fetchSeries = async () => {
      try {
        setLoading(true);
        const data = await ApiService<TvSeriesApiResponse>(
          "/trending/tv/day?language=en-US",
          currentPage
        );
        console.log("Series data:", data);
        setSeries(data.results || []);
        setTotalPages(data.total_pages || 1);
      } catch (error) {
        console.error("Error fetching series data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSeries();
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
        <TvSeriesCard loading={loading} series={series} />
        <TvDetails loading={loading} series={series} />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "350px",
            marginX: "auto",
            alignItems: "center",
            marginTop: "20px",
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
            disabled={currentPage === totalPages}
          >
            <FaChevronRight />
          </Button>
        </Box>
      </main>
    </Container>
  );
};

export default TvSeriesPage;
