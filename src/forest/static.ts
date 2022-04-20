import axiosLib, { AxiosInstance, AxiosRequestConfig } from "axios";

import { ForestInstance } from "./instance";

export type InstanceConfig = AxiosInstance | AxiosRequestConfig;

export class ForestStatic {
  create(config: InstanceConfig): ForestInstance {
    let axiosInstance: AxiosInstance;

    if ("request" in config) {
      axiosInstance = config;
    } else {
      axiosInstance = axiosLib.create(config);
    }

    const forestInstance = new ForestInstance(axiosInstance);

    return forestInstance;
  }
}
