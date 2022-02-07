import axios from "axios";
import cachios from "cachios";
import { FetchInstance } from "../types/fetchInstance";

export const fetchInstanceToCachiosInstance = (fetchInstance: FetchInstance) =>
  "axiosInstance" in fetchInstance
    ? fetchInstance
    : cachios.create(fetchInstance);

export const basicCachiosInstance = () => {
  const axiosInstance = axios.create({});
  const cachiosInstance = cachios.create(axiosInstance);

  return cachiosInstance;
};
