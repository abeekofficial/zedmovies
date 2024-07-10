import { useEffect, useState } from "react";
import Container from "../../ui/container";
import { Box, Button, ButtonGroup } from "@mui/material";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import MediaCard from "../media-card/mediacard";
import Skeleton from "../../ui/skeleton";
import { Banners } from "../../components";
import { fetchingMedia } from "../../services/api-service";
import { MediaItem } from "../../interface/media";

const Movies = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [time, setTime] = useState<"day" | "week">("day");

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const data = await fetchingMedia(time, currentPage, "all");
        setMedia(data.results || []);
        setTotalPages(data.total_pages || 1);
      } catch (error) {
        console.error("Error occurred while fetching media:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [time, currentPage]);

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
      <Banners />
      <main className="mt-5">
        <div className="flex items-center gap-10 mb-5">
          <h1 className="text-2xl font-bold text-white">Trending</h1>
          <ButtonGroup variant="outlined" aria-label="Basic button group">
            <Button
              sx={{
                borderRadius: "30px",
                background: time === "day" ? "#00b9ae" : "",
                color: time === "day" ? "white" : "",
              }}
              onClick={() => {
                setTime("day");
                setCurrentPage(1);
              }}
            >
              Day
            </Button>
            <Button
              sx={{
                borderRadius: "30px",
                background: time === "week" ? "#00b9ae" : "",
                color: time === "week" ? "white" : "",
              }}
              onClick={() => {
                setTime("week");
                setCurrentPage(1);
              }}
            >
              Week
            </Button>
          </ButtonGroup>
        </div>
        <div className="grid gap-2 sm:grid-cols-1 md:grid-cols-2 md:gap-4 lg:grid-cols-3 lg:gap-6 xl:grid-cols-4 xl:gap-8">
          {media.map((item) =>
            loading ? (
              <Skeleton />
            ) : (
              <MediaCard item={item} key={item.id} type={item.media_type} />
            )
          )}
        </div>
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

export default Movies;
