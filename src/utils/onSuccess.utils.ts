import { AxiosResponse } from "axios";
import {
  customValidationOnSuccessFunction,
  defaultOnSuccessFunction,
  defaultValidationOnSuccessFunction,
} from "../constants/onSuccess.const";
import { Metadata } from "../types/onSuccess";

/**
 *
 * @param res - Axios Response to be handled
 * @param metadata - Metadata of the request and service config
 * @returns - response handle function
 */
export const onSuccessHandle = <T>(res: AxiosResponse<T>, metadata?: Metadata) => {
  if (metadata?.serviceConfig) {
    if (metadata.serviceConfig.onSuccess && !metadata.serviceConfig.validation) {
      return metadata?.serviceConfig?.onSuccess(res, metadata);
    } else if (!metadata.serviceConfig.onSuccess && metadata.serviceConfig.validation?.types.resoponseData) {
      return defaultValidationOnSuccessFunction(res, metadata);
    } else if (metadata.serviceConfig.onSuccess && metadata.serviceConfig.validation?.types.resoponseData) {
      return customValidationOnSuccessFunction(metadata.serviceConfig?.onSuccess, res, metadata);
    }
  }
  return defaultOnSuccessFunction(res, metadata);
};
