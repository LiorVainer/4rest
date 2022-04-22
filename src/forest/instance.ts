import { AxiosInstance } from "axios";
import { AxiosSettings } from "../types/axios";

import { ServiceConfig } from "../types/forest";
import { createAxiosInstance } from "../utils/axios";

import { ForestService } from "./service";

export interface InstanceConfig {
  axiosSettings?: AxiosSettings;
  globalServiceConfig?: ServiceConfig;
}

export class ForestInstance {
  readonly axiosInstance: AxiosInstance;
  readonly globalServiceConfig: ServiceConfig | undefined;

  constructor(config?: InstanceConfig) {
    this.axiosInstance = createAxiosInstance(config?.axiosSettings);
    this.globalServiceConfig = config?.globalServiceConfig;
  }

  public createService = <Response, Payload = Response, IdType = string>(prefix: string, config?: ServiceConfig) =>
    new ForestService<Response, Payload, IdType>(
      prefix,
      this,
      config ? { ...this.globalServiceConfig, ...config } : this.globalServiceConfig
    );
}

export default ForestInstance;
