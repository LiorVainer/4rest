import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

import { ServiceConfig } from "../types/forest";

import { ForestService } from "./service";

export class ForestInstance {
  readonly axiosInstance: AxiosInstance;
  constructor(axiosInstance: AxiosInstance = axios.create()) {
    this.axiosInstance = axiosInstance;
  }

  public createService = <Response, Payload = Response, IdType = string>(prefix: string, config?: ServiceConfig) =>
    new ForestService<Response, Payload, IdType>(prefix, this, config);
}

export default ForestInstance;
