import cachiosLib, { CachiosInstance } from "cachios";
import axiosLib, { AxiosInstance, AxiosRequestConfig } from "axios";

import { ForestInstance } from "./instance";

export type InstanceConfig =
  | AxiosInstance
  | CachiosInstance
  | AxiosRequestConfig;

export class ForestStatic {
  create(config: InstanceConfig): ForestInstance {
    let cachiosInstance;

    if ("cache" in config) {
      cachiosInstance = config;
    } else {
      const axiosInstance =
        "request" in config ? config : axiosLib.create(config);
      cachiosInstance = cachiosLib.create(axiosInstance);
    }

    const forestInstance = new ForestInstance(cachiosInstance);

    return forestInstance;
  }
}
