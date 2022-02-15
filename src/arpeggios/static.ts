import cachiosLib, { CachiosInstance } from "cachios";
import axiosLib, { AxiosInstance, AxiosRequestConfig } from "axios";

import { ArpeggiosInstance } from "./instance";

export type InstanceConfig = AxiosInstance | CachiosInstance | AxiosRequestConfig;

export class ArpeggiosStatic {
  create(config: InstanceConfig): ArpeggiosInstance {
    let cachiosInstance;

    if ("cache" in config) {
      cachiosInstance = config;
    } else {
      const axiosInstance = "interceptors" in config ? config : axiosLib.create(config);
      cachiosInstance = cachiosLib.create(axiosInstance);
    }

    const arpeggiosInstance = new ArpeggiosInstance(cachiosInstance);

    return arpeggiosInstance;
  }
}
