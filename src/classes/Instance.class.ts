import { AxiosInstance } from "axios";
import { AxiosSettings } from "../types/axios";

import { GlobalServiceConfig, ServiceConfig } from "../types/service.types";
import { createAxiosInstance } from "../utils/axios";
import { mergeGlobalAndServiceConfig } from "../utils/config";

import { ForestService } from "./Service.class";

export interface InstanceConfig {
  axiosSettings?: AxiosSettings;
  globalServiceConfig?: GlobalServiceConfig;
}

export class ForestInstance {
  readonly axiosInstance: AxiosInstance;
  readonly globalServiceConfig: GlobalServiceConfig | undefined;

  constructor(config?: InstanceConfig) {
    this.axiosInstance = createAxiosInstance(config?.axiosSettings);
    this.globalServiceConfig = config?.globalServiceConfig;
  }

  public createService = <Response, Payload = Response, IdType = string>(prefix: string, config?: ServiceConfig) =>
    new ForestService<Response, Payload, IdType>(
      prefix,
      this,
      mergeGlobalAndServiceConfig(config, this.globalServiceConfig)
    );
}

export default ForestInstance;
