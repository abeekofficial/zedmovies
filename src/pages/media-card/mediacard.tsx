import { Link } from "react-router-dom";
import { MediaItem } from "../../interface/media";
import React from "react";
import { imagePath } from "../../services/api-service";
import { getVoteColor } from "../../functions";

type MediaProps = {
  item: MediaItem;
  type: "movie" | "tv" | "all";
};

const MediaCard: React.FC<MediaProps> = ({ item, type }) => {
  return (
    <Link to={`/${type}/${item.id}`}>
      <div key={item.id} className="flex flex-col items-center relative">
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
        <h3 className="mt-2 text-white rounded-md text-xl font-bold text-center">
          {item?.title || item?.name}
        </h3>
        <div className="flex justify-center items-center">
          <h3>{item?.name || item?.title}</h3>
          <p>{item?.release_date}</p>
        </div>
      </div>
    </Link>
  );
};

export default MediaCard;
