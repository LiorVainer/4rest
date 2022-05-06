import { AxiosRequestConfig } from "axios";
import { ZodSchema } from "zod";
import { OnErrorFunction } from "../../types/onError.types";
import { OnSuccessFunction } from "../../types/onSuccess.types";
import { Key } from "../../types/payload.types";
import { Route } from "../../types/route.types";
import { ServiceFunction } from "../../types/service.types";
import { MethodValidationConfig } from "../../types/validation.types";

export interface BaseRequestFunctionConfig {
  route?: Route;
  config?: AxiosRequestConfig;
  serviceFunction?: ServiceFunction;
  validation?: MethodValidationConfig;
  onSuccess?: OnSuccessFunction;
  onError?: OnErrorFunction;
}
export interface NoPayloadRequestFunctionByParamConfig extends BaseRequestFunctionConfig {
  suffix?: Route;
}

export interface PayloadRequestFunctionByParamConfig extends NoPayloadRequestFunctionByParamConfig {
  key?: Key;
}

export interface NoPayloadRequestFunctionConfig extends BaseRequestFunctionConfig {}

export interface PayloadRequestFunctionConfig extends NoPayloadRequestFunctionConfig {
  key?: Key;
}
