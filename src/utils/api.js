import axios from "axios";
import { API_KEY } from "./Constants";
const BASE_URL = "https://www.googleapis.com/youtube/v3";

export const fetchData = async (endpoint, params = {}) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/${endpoint}`, {
      params: { ...params, key: API_KEY },
    });
    return data;
  } catch (error) {
    console.error("Error fetching API data: ", error);
    throw error;
  }
};
