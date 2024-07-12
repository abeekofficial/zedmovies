import axios from "axios";
import { MediaDetails } from "../interface/media-details";

const baseURL = "https://api.themoviedb.org/3";

const API_KEY = "1b57ee122bd4aeb6157c5b740e4de486";

export const imagePath = `https://image.tmdb.org/t/p/w500`;

// Trending Movies and TV Series
export const fetchingMedia = async (
  time_window: "day" | "week",
  page = 1,
  type: "movie" | "tv" | "all"
) => {
  const response = await axios.get(
    `${baseURL}/trending/${type}/${time_window}?api_key=${API_KEY}&page=${page}`
  );
  return response.data;
};

// Details of Movies and TV Series
export const fetchingDetails = async (
  type: "movie" | "tv" | "all",
  id: number
): Promise<MediaDetails> => {
  try {
    const url = `${baseURL}/${type}/${id}`;
    const response = await axios.get(url, {
      params: {
        api_key: API_KEY,
      },
    });
    const data: MediaDetails = response.data;
    return data;
  } catch (error) {
    console.error("Error fetching details:", error);
    throw new Error("Error fetching details");
  }
};

// Fetch genres
export const fetchingGenres = async (
  type: "movie" | "tv" | "all"
): Promise<{ id: number; name: string }[]> => {
  try {
    const response = await axios.get(`${baseURL}/genre/${type}/list`, {
      params: {
        api_key: API_KEY,
        language: "en-US",
      },
    });
    return response.data.genres;
  } catch (error) {
    console.error("Error fetching genres:", error);
    throw new Error("Error fetching genres");
  }
};

//Fetch credits
export const fetchingCredits = async (
  type: "movie" | "tv" | "all",
  id: number
) => {
  try {
    const response = await axios.get(
      `${baseURL}/${type}/${id}/credits?api_key=${API_KEY}`
    );
    return response?.data;
  } catch (error) {
    console.error("Error fetching credits:", error);
    throw error;
  }
};

//Fetch videos
export const fetchingVideos = async (
  type: "movie" | "tv" | "all",
  id: number
) => {
  try {
    const response = await axios.get(
      `${baseURL}/${type}/${id}/videos?api_key=${API_KEY}`
    );
    return response?.data;
  } catch (error) {
    console.error("Error fetching videos:", error);
    throw error;
  }
};
