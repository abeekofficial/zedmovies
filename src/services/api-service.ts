// src/services/api-service.ts

import axios from "axios";
import { MediaItem } from "../interface/media";

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
): Promise<MediaItem> => {
  try {
    const url = `${baseURL}/${type}/${id}`;
    console.log("Request URL:", url); // Log the request URL

    const response = await axios.get(url, {
      params: {
        api_key: API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching details:", error); // Log the error response for debugging
    throw new Error("Error fetching details");
  }
};

// Fetch videos
export const fetchVideos = async (
  type: string,
  id: number
): Promise<string | null> => {
  try {
    const response = await axios.get(`${baseURL}/${type}/${id}/videos`, {
      params: {
        api_key: API_KEY,
      },
    });

    // Assuming you want to get the first video key
    const video = response.data.results.find(
      (video: any) => video.type === "Trailer"
    );
    return video ? video.key : null;
  } catch (error) {
    console.error("Error fetching videos:", error);
    throw new Error("Error fetching videos");
  }
};

// Fetch genres
export const fetchingGenres = async (
  type: "movie" | "tv"
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
