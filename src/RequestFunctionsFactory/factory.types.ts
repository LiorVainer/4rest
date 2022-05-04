import { AxiosRequestConfig } from "axios";
import { Key } from "../types/payload";
import { Route } from "../types/route";
import { ServiceFunction } from "../types/service.types";

export interface NoPayloadRequestFunctionByParamParams {
  route?: Route;
  suffix?: Route;
  config?: AxiosRequestConfig;
  serviceFunction?: ServiceFunction;
}

export interface PayloadRequestFunctionByParamParams extends NoPayloadRequestFunctionByParamParams {
  key?: Key;
}

export interface NoPayloadRequestFunctionParams {
  route?: Route;
  config?: AxiosRequestConfig;
  serviceFunction?: ServiceFunction;
}

export interface PayloadRequestFunctionParams extends NoPayloadRequestFunctionParams {
  key?: Key;
}
