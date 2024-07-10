import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  fetchingDetails,
  fetchingGenres,
  imagePath,
} from "../../services/api-service";
import { MediaItem, genres } from "../../interface/media";
import { HashLoader } from "react-spinners";
import Container from "../../ui/container";
import { Box, Button, Chip } from "@mui/material";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { getVoteColor } from "../../functions";
import { CalendarCheck } from "lucide-react";

const MediaDetails: React.FC = () => {
  type RouteParams = {
    type: "movie" | "tv" | "all" | undefined;
    id: string;
  };

  const { type, id } = useParams<RouteParams>();
  const [mediaDetails, setMediaDetails] = useState<MediaItem | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [genres, setGenres] = useState<genres[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await fetchingDetails(type, Number(id));
        setMediaDetails(data);
        const genre = await fetchingGenres(type);
        setGenres(genre);
      } catch (error) {
        setError("Error fetching details");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [type, id]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <HashLoader color="#00b9ae" />
      </Box>
    );
  }
  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  const voteAverage = Number(mediaDetails?.vote_average.toFixed(1));
  const votePercentage = voteAverage !== undefined ? voteAverage * 10 : 0;

  //Genres function

  return (
    <Box sx={{ position: "relative" }}>
      <img
        src={`${imagePath}${mediaDetails?.poster_path}`}
        className="w-full opacity-50 filter blur-sm h-[600px] object-cover"
        alt={mediaDetails?.title || mediaDetails?.name}
      />
      <Container>
        <section className="flex flex-col md:flex-row md:gap-20 absolute top-5">
          <div className="flex justify-center md:justify-start items-center">
            <img
              src={`${imagePath}${mediaDetails?.poster_path}`}
              alt={mediaDetails?.title || mediaDetails?.name}
              className="rounded-lg object-contain w-[400px]"
            />
          </div>
          <div className="text-white md:mr-8">
            <h1 className="text-center md:text-left text-4xl font-bold mb-4">
              {mediaDetails?.title || mediaDetails?.name}
            </h1>
            <div className="flex items-center gap-1 ml-2 mb-4">
              <CalendarCheck />
              <p className="font-medium">
                {mediaDetails?.release_date || mediaDetails?.first_air_date}
              </p>
              <span className="block text-lg font-thin mr-1">
                ({mediaDetails?.origin_country})
              </span>
            </div>
            <p>
              {genres.map((genre) => (
                <Chip
                  sx={{
                    color: "#00b9ae",
                    borderColor: "#00b9ae",
                    marginLeft: "5px",
                    marginBottom: "5px",
                  }}
                  label={genre.name}
                  variant="outlined"
                  onClick={() => {}}
                />
              ))}
            </p>
            <div className="flex gap-5 items-center mt-4">
              <div className="w-20">
                <CircularProgressbar
                  value={votePercentage}
                  text={`${votePercentage}%`}
                  styles={buildStyles({
                    textColor: `#fff`,
                    backgroundColor: "#000",
                    textSize: "24px",
                    pathColor: `${getVoteColor(voteAverage)}`,
                    trailColor: "#ccc",
                    rotation: 0.25,
                  })}
                />
              </div>
              <Button
                variant="outlined"
                type="button"
                sx={{
                  borderColor: "#00b9ae",
                  color: "#00b9ae",
                  "&:hover": {
                    borderColor: "#00b9ae",
                  },
                }}
              >
                Add to Watchlist
              </Button>
            </div>
            <p>{}</p>
            <p className="text-white mb-4 font-medium text-lg mt-4">
              Overview
              <span className="text-gray-300 font-thin mb-4 block">
                {mediaDetails?.overview}
              </span>
            </p>
            <h3 className="text-white font-semibold">{}</h3>
          </div>
        </section>
      </Container>
    </Box>
  );
};

export default MediaDetails;
