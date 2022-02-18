import cachiosLib, { CachiosInstance } from "cachios";
import axiosLib, { AxiosInstance, AxiosRequestConfig } from "axios";

import { RestigoInstance } from "./instance";

export type InstanceConfig = AxiosInstance | CachiosInstance | AxiosRequestConfig;

export class RestigoStatic {
  create(config: InstanceConfig): RestigoInstance {
    let cachiosInstance;

    if ("cache" in config) {
      cachiosInstance = config;
    } else {
      const axiosInstance = "request" in config ? config : axiosLib.create(config);
      cachiosInstance = cachiosLib.create(axiosInstance);
    }

    const restigoInstance = new RestigoInstance(cachiosInstance);

    return restigoInstance;
  }
}
