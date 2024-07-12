import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  fetchingCredits,
  fetchingDetails,
  fetchingGenres,
  imagePath,
} from "../../services/api-service";
import { HashLoader } from "react-spinners";
import Container from "../../ui/container";
import { Box, Button, Chip } from "@mui/material";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { getVoteColor } from "../../functions";
import { CalendarCheck, PlayIcon, PlusIcon } from "lucide-react";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import type { MediaDetails } from "../../interface/media-details";
import { credits, genres } from "../../interface/media";

const MediaDetails: React.FC = () => {
  type RouteParams = {
    type: "movie" | "tv" | "all";
    id: string;
    key?: string;
  };

  const { type, id } = useParams<RouteParams>();
  const [mediaDetails, setMediaDetails] = useState<MediaDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [error] = useState<string | null>(null);
  const [genres, setGenres] = useState<genres[]>([]);
  const [cast, setCast] = useState<credits[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        if (type) {
          const [data, genre, credits] = await Promise.all([
            fetchingDetails(type, Number(id)),
            fetchingGenres(type),
            fetchingCredits(type, Number(id)),
          ]);
          setMediaDetails(data);
          setGenres(genre);
          setCast(credits);
          console.log(credits, "credits information");
        }
      } catch (error) {
        console.log("Error in fetching details =>", error);
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

  const runtime = mediaDetails?.runtime
    ? `${Math.floor(mediaDetails.runtime / 60)}h ${mediaDetails.runtime % 60}m`
    : "N/A";
  return (
    <Box sx={{ position: "relative" }}>
      <img
        src={`${imagePath}${mediaDetails?.poster_path}`}
        className="w-full opacity-50 filter blur-sm h-[600px] object-cover"
        alt={mediaDetails?.title || mediaDetails?.name}
      />
      <Container>
        <section className="flex flex-col md:flex-row md:gap-20 absolute top-0 md:top-5">
          <div className="flex justify-center md:justify-start items-center">
            <img
              src={`${imagePath}${mediaDetails?.poster_path}`}
              alt={mediaDetails?.title || mediaDetails?.name}
              className="rounded-lg object-contain w-[400px]"
            />
          </div>
          <div className="text-white md:mr-8 mx-4 md:mx-0">
            <h1 className="text-center md:text-left text-2xl md:text-4xl font-bold mb-4">
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
              <h3 className="text-white font-semibold">
                ● {runtime || mediaDetails?.episode_run_time}
              </h3>
            </div>
            <p>
              {genres.map((genre) => (
                <Chip
                  key={genre.id}
                  sx={{
                    color: "#00b9ae",
                    borderColor: "#00b9ae",
                    marginLeft: "5px",
                    marginBottom: "5px",
                    backgroundColor: "#16181e",
                  }}
                  label={genre.name}
                  variant="outlined"
                  onClick={() => {}}
                />
              ))}
            </p>
            <div className="flex gap-5 items-center mt-4">
              <div className="md:w-20 w-16">
                <CircularProgressbar
                  value={votePercentage}
                  text={`${votePercentage}%`}
                  styles={buildStyles({
                    textColor: `#fff`,
                    backgroundColor: "#000",
                    textSize: "24px",
                    pathColor: `${getVoteColor(voteAverage)}`,
                    trailColor: "#ccc",
                    rotation: 0.785,
                  })}
                />
              </div>
              <Button
                variant="outlined"
                type="button"
                startIcon={<PlusIcon />}
                sx={{
                  borderColor: "#00b9ae",
                  backgroundColor: "#16181e",

                  color: "#00b9ae",
                  "&:hover": {
                    borderColor: "#00b9ae",
                  },
                }}
              >
                Add to Watchlist
              </Button>
              <Button
                variant="outlined"
                type="button"
                startIcon={<IoMdCheckmarkCircleOutline />}
                sx={{
                  borderColor: "#00b9ae",
                  backgroundColor: "#14452b",
                  display: "none",
                  color: "#00b9ae",
                  "&:hover": {
                    borderColor: "#00b9ae",
                    backgroundColor: "#18392b",
                    padding: {
                      xs: "6px 12px",
                      sm: "8px 16px",
                      md: "10px 20px",
                    },
                    fontSize: {
                      xs: "0.75rem",
                      sm: "0.875rem",
                      md: "1rem",
                    },
                  },
                }}
              >
                Added to Watchlist
              </Button>

              <Button
                variant="text"
                startIcon={<PlayIcon />}
                sx={{
                  color: "#ccc",
                  borderBottom: "2.5px solid #ccc",
                  borderRadius: "0",
                }}
              >
                Play Trailer
              </Button>
            </div>
            <p className="mt-4 mb-2 text-gray-300 font-medium text-lg italic">
              {mediaDetails?.tagline}
            </p>
            <p className="text-white mb-4 font-medium text-lg">
              Overview
              <span className="text-gray-300 font-thin mb-4 block">
                {mediaDetails?.overview}
              </span>
            </p>
            <h3>
              {mediaDetails?.created_by?.map((created, i) => (
                <div key={i} className="flex items-center gap-48">
                  <h3
                    key={created.id}
                    className="text-white font-semibold flex"
                  >
                    {created.name}
                  </h3>
                </div>
              ))}
            </h3>
          </div>
        </section>
      </Container>
    </Box>
  );
};

export default MediaDetails;
