import { AxiosResponse } from "axios";
import { ServiceConfig } from "./forest";

export type OnSuccessFunction = (
  value: AxiosResponse<any>,
  serviceConfig?: ServiceConfig
) => any;
