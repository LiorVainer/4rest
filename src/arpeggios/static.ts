import cachiosLib, { CachiosInstance } from "cachios";
import axiosLib, { AxiosInstance, AxiosRequestConfig } from "axios";

import { ArpeggiosInstance } from "./instance";

export interface InstanceConfig {
  axios?: AxiosInstance;
  cachios?: CachiosInstance;
  axiosRequestConfig?: AxiosRequestConfig;
}

export class ArpeggiosStatic {
  create({ axios, axiosRequestConfig, cachios }: InstanceConfig = {}): ArpeggiosInstance {
    const axiosInstance = axios ? axios : axiosLib.create(axiosRequestConfig);

    const cachiosInstance = cachios ? cachios : cachiosLib.create(axiosInstance);

    const arpeggiosInstance = new ArpeggiosInstance(cachiosInstance);

    return arpeggiosInstance;
  }
}
