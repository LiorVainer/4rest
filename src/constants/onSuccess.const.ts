import { AxiosResponse } from "axios";
import { Metadata, OnSuccessFunction } from "./../types/onSuccess";

export const defaultOnSuccessFunction: OnSuccessFunction = (response: AxiosResponse<any>) => {
  return response;
};

export const defaultValidationOnSuccessFunction: OnSuccessFunction = (
  response: AxiosResponse<any>,
  metadata?: Metadata
) => {
  if (metadata?.serviceFunction && metadata?.serviceConfig?.validation?.methods) {
    if (metadata?.serviceConfig?.validation?.methods.includes(metadata?.serviceFunction)) {
      metadata?.serviceConfig?.validation?.types.resoponseData?.parse(response.data);
    }
  } else {
    metadata?.serviceConfig?.validation?.types.resoponseData?.parse(response.data);
  }

  return response;
};

export const customValidationOnSuccessFunction = (
  onSuccess: OnSuccessFunction,
  response: AxiosResponse<any>,
  metadata?: Metadata
) => {
  if (metadata?.serviceFunction && metadata?.serviceConfig?.validation?.methods) {
    if (metadata?.serviceConfig?.validation?.methods.includes(metadata?.serviceFunction)) {
      metadata?.serviceConfig?.validation?.types.resoponseData?.parse(response.data);
    }
  } else {
    metadata?.serviceConfig?.validation?.types.resoponseData?.parse(response.data);
  }

  return onSuccess(response, metadata);
};
