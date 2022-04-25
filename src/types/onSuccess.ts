import { AxiosResponse } from "axios";
import { ServiceConfig } from "./service.types";

export type OnSuccessFunction = (
  value: AxiosResponse<any>,
  serviceConfig?: ServiceConfig
) => any;
