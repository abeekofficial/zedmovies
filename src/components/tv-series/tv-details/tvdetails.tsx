import React from "react";
import { TvSeries } from "../../../interface/tv-series";

type TvDetailsProps = {
  series: TvSeries[];
  loading: boolean;
};

const TvDetails: React.FC<TvDetailsProps> = ({ series, loading }) => {
  if (loading) {
    return <div>Loading TV series details...</div>;
  }

  if (series.length === 0) {
    return <div>No TV series details available.</div>;
  }

  // Assuming you want to display details for the first series in the array
  const selectedSeries = series[0];

  return (
    <section>
      <h2 className="text-2xl font-semibold text-white mb-3">
        TV Series Details
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="text-white">
          <h3 className="text-xl font-semibold mb-2">{selectedSeries.name}</h3>
          <p className="mb-2">{selectedSeries.overview}</p>
          <p>
            <strong>First Air Date:</strong> {selectedSeries.first_air_date}
          </p>
          <p>
            <strong>Vote Average:</strong> {selectedSeries.vote_average}
          </p>
          {/* Add more details as needed */}
        </div>
        <div>
          <img
            src={`https://image.tmdb.org/t/p/w500${selectedSeries.poster_path}`}
            alt={selectedSeries.name}
            className="w-full h-auto rounded-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default TvDetails;
