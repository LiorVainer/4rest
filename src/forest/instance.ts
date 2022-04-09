import { AxiosInstance } from "axios";

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
      this.axiosInstance.defaults.headers!.Authorization = getValue;
    } else {
      this.axiosInstance.interceptors.request.use(async (config) => {
        config.headers!.Authorization = await getValue();
        return config;
      });
    }
  }
}

export default ForestInstance;
