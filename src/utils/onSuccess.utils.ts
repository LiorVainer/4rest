import { AxiosResponse } from "axios";

import {
  customValidationOnSuccessFunction,
  defaultOnSuccessFunction,
  defaultValidationOnSuccessFunction,
} from "../constants/onSuccess.const";
import { Metadata } from "../types/metadata.types";

export const isOnSuccessByMethodRelvant = (metadata: Metadata) =>
  !!(
    metadata.serviceFunction &&
    metadata.serviceConfig?.onSuccessByMethod &&
    metadata.serviceConfig?.onSuccessByMethod[metadata.serviceFunction]
  );

export const isOnSuccessRelvant = (metadata: Metadata) =>
  !!metadata.serviceConfig?.onSuccess || isOnSuccessByMethodRelvant(metadata);

export const onSuccessDecider = <T>(res: AxiosResponse<T>, metadata: Metadata) => {
  if (isOnSuccessByMethodRelvant(metadata)) {
    return metadata.serviceConfig?.onSuccessByMethod![metadata.serviceFunction!]!(res, metadata);
  } else {
    return metadata?.serviceConfig?.onSuccess!(res, metadata);
  }
};

/**
 *
 * @param res - Axios Response to be handled
 * @param metadata - Metadata of the request and service config
 * @returns - response handle function
 */
export const onSuccessHandle = <T>(res: AxiosResponse<T>, metadata?: Metadata) => {
  if (metadata?.serviceConfig) {
    if (isOnSuccessRelvant(metadata) && !metadata.serviceConfig.validation) {
      return onSuccessDecider(res, metadata);
    } else if (!isOnSuccessRelvant(metadata) && metadata.serviceConfig.validation?.types.resoponseData) {
      return defaultValidationOnSuccessFunction(res, metadata);
    } else if (isOnSuccessRelvant(metadata) && metadata.serviceConfig.validation?.types.resoponseData) {
      return customValidationOnSuccessFunction(onSuccessDecider(res, metadata), res, metadata);
    }
  }
  return defaultOnSuccessFunction(res, metadata);
};
