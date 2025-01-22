import axios from "axios";
import { BASE_DOMAIN_API } from "../common/constant";

export const http = axios.create({
  baseURL: `${BASE_DOMAIN_API}`,
  timeout: 30000,
});
