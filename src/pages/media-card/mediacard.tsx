import { Link } from "react-router-dom";
import { MediaItem } from "../../interface/media";
import React from "react";
import { imagePath } from "../../services/api-service";
import { getVoteColor } from "../../functions";
import { Box, Typography } from "@mui/material";

type MediaProps = {
  item: MediaItem;
  type: "movie" | "tv" | "all";
};

const MediaCard: React.FC<MediaProps> = ({ item, type }) => {
  return (
    <Link to={`/${type}/${item.id}`} className="md:mx-0 mx-4">
      <Box
        key={item.id}
        sx={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          transform: "scale(1)",
          transition: "transform 0.3s ease-in-out",
          "&:hover": {
            transform: "scale(1.05)",
          },
          cursor: "pointer",
          "&:hover .overlay": {
            opacity: 1,
          },
        }}
      >
        <img
          src={`${imagePath}${item.poster_path}`}
          alt={item.title || item.name}
          className="w-full h-auto rounded-lg"
        />
        <p
          className={`absolute top-1 left-3 rounded-md text-xl font-bold text-center text-white px-1.5 py-1 ${getVoteColor(
            item.vote_average
          )}`}
        >
          {item.vote_average.toFixed(1)}
        </p>
        <h3 className="mt-2 text-white rounded-md text-sm font-medium text-center">
          {item?.title || item?.name}
        </h3>
        <Box
          className="overlay"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            padding: "0.5rem",
            width: "100%",
            height: "33%",
            background: "rgba(0, 0, 0, 0.5)",
            position: "absolute",
            bottom: 1,
            left: 0,
            opacity: 0,
            transition: "opacity 0.3s ease-in-out",
          }}
        >
          <Typography sx={{ color: "white" }}>
            {item.title || item.name}
          </Typography>
          <Typography sx={{ color: "white" }}>
            {item.release_date || item.first_air_date}
          </Typography>
          <Typography sx={{ color: "white" }}>
            {item.vote_average.toFixed(1)}
          </Typography>
        </Box>
      </Box>
    </Link>
  );
};

export default MediaCard;
