import cachiosLib, { CachiosInstance } from "cachios";
import axiosLib, { AxiosInstance, AxiosRequestConfig } from "axios";

import { PrestInstance } from "./instance";

export type InstanceConfig = AxiosInstance | CachiosInstance | AxiosRequestConfig;

export class PrestStatic {
  create(config: InstanceConfig): PrestInstance {
    let cachiosInstance;

    if ("cache" in config) {
      cachiosInstance = config;
    } else {
      const axiosInstance = "request" in config ? config : axiosLib.create(config);
      cachiosInstance = cachiosLib.create(axiosInstance);
    }

    const prestInstance = new PrestInstance(cachiosInstance);

    return prestInstance;
  }
}
