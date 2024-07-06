import axios from "axios";
import { MovieApiResponse } from "../interface/movie-api";

const baseURL = "https://api.themoviedb.org/3";
const API_KEY =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxYjU3ZWUxMjJiZDRhZWI2MTU3YzViNzQwZTRkZTQ4NiIsIm5iZiI6MTcxOTkwODg1OS4zNjI1NDYsInN1YiI6IjY2ODI1NzQ0MDUyYjY1ODUyNjFiNzQ0YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.s4CvGXjWJvxWmyZSxKMLx9NZTlOVa3fyfAXYDncE7QQ";

const options = {
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

export const ApiService = async (
  url: string,
  page: number = 1
): Promise<MovieApiResponse> => {
  try {
    const res = await axios.get<MovieApiResponse>(
      `${baseURL}${url}&page=${page}`,
      options
    );
    console.log(res.data, "Fetched Data");
    return res.data;
  } catch (error) {
    console.log(error, "Error occurred");
    throw error;
  }
};
