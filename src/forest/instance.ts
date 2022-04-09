import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { Method, Methods } from "constants/methods.const";

import { ServiceConfig } from "../types/forest";

import { ForestService } from "./service";

type ReturnStringFunction = () => string | Promise<string>;

export class ForestInstance {
  constructor(readonly axiosInstance: AxiosInstance) {}

  public createService = <Response, Payload = Response, IdType = string>(prefix: string, config?: ServiceConfig) =>
    new ForestService<Response, Payload, IdType>(prefix, this, config);

  public setAuthorizationHeader(value: string): void;
  public setAuthorizationHeader(getValue: () => Promise<string>): void;
  public setAuthorizationHeader(getValue: () => string): void;
  public setAuthorizationHeader(getValue: string | ReturnStringFunction): void {
    if (typeof getValue === "string") {
      this.axiosInstance.defaults.headers!.common.Authorization = getValue;
    } else {
      this.axiosInstance.interceptors.request.use(async (config) => {
        config.headers!.Authorization = await getValue();
        return config;
      });
    }
  }

  public setRequestInterceptor(
    onFulfilled?: (config: AxiosRequestConfig) => AxiosRequestConfig | Promise<AxiosRequestConfig>,
    onRejected?: (error: any) => any,
    onMethod?: Method | Method[]
  ): void {
    this.axiosInstance.interceptors.request.use((config) => {
      if (onFulfilled && onMethod && config.method) {
        if (typeof onMethod === "string" && config.method === Methods[onMethod]) onFulfilled(config);
        else if (onMethod.includes(config.method as Method)) onFulfilled(config);
      } else {
        onFulfilled && onFulfilled(config);
      }
    }, onRejected);
  }

  public setResponseInterceptor(
    onFulfilled?: (response: AxiosResponse) => AxiosResponse | Promise<AxiosResponse>,
    onRejected?: (error: any) => any,
    onMethod?: Method
  ): void {
    this.axiosInstance.interceptors.response.use((response) => {
      if (onFulfilled && onMethod && response.config.method) {
        if (typeof onMethod === "string" && response.config.method === Methods[onMethod]) onFulfilled(response);
        else if (onMethod.includes(response.config.method as Method)) onFulfilled(response);
      } else {
        onFulfilled && onFulfilled(response);
      }
    }, onRejected);
  }
}

export default ForestInstance;
