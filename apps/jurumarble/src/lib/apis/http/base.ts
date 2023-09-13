import axios from "axios";
import { SERVER_URL } from "lib/constants";

const axiosInstance = axios.create({
  baseURL: SERVER_URL,
});

export const baseApi = axiosInstance;
