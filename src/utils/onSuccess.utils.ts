import { AxiosResponse } from "axios";
import { defaultOnSuccessFunction, defaultValidationOnSuccessFunction } from "../constants/onSuccess.const";
import { ServiceConfig } from "./../types/forest";

export const onSuccessHandle = <T>(res: AxiosResponse<T>, serviceConfig?: ServiceConfig) => {
  if (serviceConfig) {
    if (serviceConfig?.onSuccess) {
      return serviceConfig?.onSuccess(res, serviceConfig);
    } else if (serviceConfig.validation?.types.resoponseData) {
      return defaultValidationOnSuccessFunction(res, serviceConfig);
    }
  }
  return defaultOnSuccessFunction(res, serviceConfig);
};
