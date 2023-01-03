import axios from "axios";
import { SERVER_URL } from "../constants";

const apiClient = axios.create();

apiClient.defaults.baseURL = `${SERVER_URL}`;

export default apiClient;
