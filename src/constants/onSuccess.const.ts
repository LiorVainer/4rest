import { AxiosResponse } from "axios";
import { ServiceConfig } from "../types/service.types";
import { OnSuccessFunction } from "./../types/onSuccess";

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

export const customValidationOnSuccessFunction = (
  onSuccess: OnSuccessFunction,
  response: AxiosResponse<any>,
  serviceConfig?: ServiceConfig
) => {
  serviceConfig?.validation?.types.resoponseData?.parse(response.data);
  return onSuccess(response, serviceConfig);
};
