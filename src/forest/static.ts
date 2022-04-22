import axiosLib, { AxiosInstance, AxiosRequestConfig } from "axios";

import { ForestInstance } from "./instance";

export type ForestInstanceConfig = AxiosInstance | AxiosRequestConfig;

export class ForestStatic {
  create(config?: ForestInstanceConfig): ForestInstance {
    let axiosInstance: AxiosInstance;

    if (config === undefined) {
      axiosInstance = axiosLib.create();
    } else if ("request" in config) {
      axiosInstance = config;
    } else {
      axiosInstance = axiosLib.create(config);
    }

    const forestInstance = new ForestInstance(axiosInstance);

    return forestInstance;
  }
}
