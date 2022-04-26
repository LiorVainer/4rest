import { AxiosResponse } from "axios";
import { ServiceConfig, ServiceFunction } from "./service.types";

export interface Metadata {
  serviceConfig?: ServiceConfig;
  serviceFunction?: ServiceFunction;
}

export type OnSuccessFunction = (
  value: AxiosResponse<any>,
  serviceConfig?: ServiceConfig,
  metadata?: Metadata
) => any;
