import { AxiosResponse } from "axios";
import { Metadata } from "../types/metadata.types";
import { responseValidationHandle } from "../utils/validation.utils";
import { OnSuccessFunction } from "../types/onSuccess.types";

/**
 *
 * @param response - Axios Response to be handled
 * @returns - Axios response
 */
export const defaultOnSuccessFunction: OnSuccessFunction = (response: AxiosResponse<any>) => {
  return response;
};

/**
 * Function to do default handle of response with validation of response
 * @param response - Axios Response to be handled
 * @param metadata - Metadata of the request and service config
 */
export const defaultValidationOnSuccessFunction: OnSuccessFunction = (
  response: AxiosResponse<any>,
  metadata?: Metadata
) => {
  responseValidationHandle(response, metadata);

  return response;
};

/**
 * Function to do custom handle of response with validation of response
 * @param response - Axios Response to be handled
 * @param metadata - Metadata of the request and service config
 */
export const customValidationOnSuccessFunction = (
  onSuccess: OnSuccessFunction,
  response: AxiosResponse<any>,
  metadata?: Metadata
) => {
  responseValidationHandle(response, metadata);

  return onSuccess(response, metadata);
};
