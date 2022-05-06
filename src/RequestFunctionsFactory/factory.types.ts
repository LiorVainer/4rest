import { AxiosRequestConfig } from "axios";
import { ZodSchema } from "zod";
import { OnErrorFunction } from "../types/onError";
import { OnSuccessFunction } from "../types/onSuccess";
import { Key } from "../types/payload";
import { Route } from "../types/route";
import { ServiceFunction } from "../types/service.types";
import { MethodValidationConfig } from "../types/validation.types";

export interface BaseRequestFunctionParams {
  route?: Route;
  config?: AxiosRequestConfig;
  serviceFunction?: ServiceFunction;
  validation?: MethodValidationConfig;
  onSuccess?: OnSuccessFunction;
  onError?: OnErrorFunction;
}
export interface NoPayloadRequestFunctionByParamParams extends BaseRequestFunctionParams {
  suffix?: Route;
}

export interface PayloadRequestFunctionByParamParams extends NoPayloadRequestFunctionByParamParams {
  key?: Key;
}

export interface NoPayloadRequestFunctionParams extends BaseRequestFunctionParams {}

export interface PayloadRequestFunctionParams extends NoPayloadRequestFunctionParams {
  key?: Key;
}
