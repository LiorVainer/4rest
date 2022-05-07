import axiosLib, { AxiosInstance, AxiosRequestConfig } from "axios";
import { AxiosSettings } from "../types/axios.types";

export const createAxiosInstance = (config?: AxiosSettings): AxiosInstance => {
  if (config === undefined) {
    return axiosLib;
  } else if ("request" in config) {
    return config;
  } else {
    return axiosLib.create(config);
  }
};
