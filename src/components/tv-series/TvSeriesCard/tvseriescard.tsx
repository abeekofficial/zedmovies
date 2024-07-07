import { HashLoader } from "react-spinners";
import { TvSeries } from "../../../interface/tv-series";
import { Link } from "react-router-dom";

export type TvSeriesCardProps = {
  series: TvSeries[];
  loading: boolean;
};

const TvSeriesCard: React.FC<TvSeriesCardProps> = ({ series, loading }) => {
  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <HashLoader color="hsla(0, 0%, 100%, 1)" />
      </div>
    );
  }

  if (!series || series.length === 0) {
    return <div className="text-white text-center">No TV series found</div>;
  }

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
    <div className="grid gap-2 sm:grid-cols-1 md:grid-cols-2 md:gap-4 lg:grid-cols-3 lg:gap-6 xl:grid-cols-4 xl:gap-8">
      {series.map((tvSeries) => (
        <div key={tvSeries.id} className="flex flex-col relative items-center ">
          <Link to={`/tv-series/${tvSeries.id}`}>
            <img
              src={`https://image.tmdb.org/t/p/w500${tvSeries.poster_path}`}
              alt={tvSeries.name}
              className="w-full h-auto rounded-lg"
            />
          </Link>
          <p
            className={`absolute top-1 left-3 rounded-md text-xl font-bold text-center text-white px-1.5 py-1 ${getVoteColor(
              tvSeries.vote_average
            )}`}
          >
            {tvSeries.vote_average.toFixed(1)}
          </p>
          <h3 className="mt-2 text-white text-xl font-semibold text-center">
            {tvSeries.original_name}
          </h3>
        </div>
      ))}
    </div>
  );
};

export default TvSeriesCard;
