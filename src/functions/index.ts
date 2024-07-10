export const getVoteColor = (vote_average: number): string => {
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
