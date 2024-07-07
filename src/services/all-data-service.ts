import axios, { AxiosResponse } from "axios";

const baseURL = "https://api.themoviedb.org/3";
const API_KEY =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxYjU3ZWUxMjJiZDRhZWI2MTU3YzViNzQwZTRkZTQ4NiIsIm5iZiI6MTcxOTkwODg1OS4zNjI1NDYsInN1YiI6IjY2ODI1NzQ0MDUyYjY1ODUyNjFiNzQ0YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.s4CvGXjWJvxWmyZSxKMLx9NZTlOVa3fyfAXYDncE7QQ";

const options = {
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

export const AllDataService = async <T>(url: string): Promise<T> => {
  try {
    const res: AxiosResponse<T> = await axios.get<T>(
      `${baseURL}/${url}`,
      options
    );
    return res.data;
  } catch (error) {
    console.error("Error occurred:", error);
    throw error;
  }
};
