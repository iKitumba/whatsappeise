import axios from "axios";
import { PORT } from "../utils/constants";

const api = axios.create({
  baseURL: `http://localhost:${PORT}`,
});

export default api;
