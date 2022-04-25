import { AxiosResponse } from "axios";
import { OnSuccessFunction } from "../types/onSuccess";
import { ServiceConfig } from "./../types/forest";

export const defaultOnSuccessFunction: OnSuccessFunction = (
  response: AxiosResponse<any>
) => {
  return response;
};

export const defaultValidationOnSuccessFunction: OnSuccessFunction = (
  response: AxiosResponse<any>,
  serviceConfig?: ServiceConfig
) => {
  serviceConfig?.validation?.types.resoponseData?.parse(response.data);
  return response;
};
