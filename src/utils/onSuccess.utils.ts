import { AxiosResponse } from "axios";
import {
  defaultOnSuccessFunction,
  defaultValidationOnSuccessFunction,
} from "../constants/onSuccess.const";
import { Metadata } from "../types/onSuccess";

export const onSuccessHandle = <T>(
  res: AxiosResponse<T>,
  metadata?: Metadata
) => {
  if (metadata?.serviceConfig) {
    if (metadata.serviceConfig.onSuccess) {
      return metadata?.serviceConfig?.onSuccess(res, metadata.serviceConfig);
    } else if (metadata.serviceConfig.validation?.types.resoponseData) {
      return defaultValidationOnSuccessFunction(res, metadata.serviceConfig);
    }
  }
  return defaultOnSuccessFunction(res, metadata?.serviceConfig);
};
