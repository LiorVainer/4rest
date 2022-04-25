import { AxiosResponse } from "axios";
import {
  defaultOnSuccessFunction,
  defaultValidationOnSuccessFunction,
} from "../constants/onSuccess.const";
import { ServiceConfig } from "./../types/forest";

export const onSuccessHandle = <T>(
  res: AxiosResponse<T>,
  serviceConfig?: ServiceConfig
) => {
  console.log(res, serviceConfig);
  if (serviceConfig) {
    if (serviceConfig?.onSuccess) {
      console.log("got here 1");
      serviceConfig?.onSuccess(res, serviceConfig);
      return;
    } else if (serviceConfig.validation?.types.resoponseData) {
      console.log("got here 2");
      defaultValidationOnSuccessFunction(res, serviceConfig);
      return;
    }
  }
  console.log("got here 4");

  defaultOnSuccessFunction(res, serviceConfig);
};
