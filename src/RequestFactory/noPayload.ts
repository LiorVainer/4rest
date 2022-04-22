import { defaultOnSuccessFunction, OnSuccessFunction } from "./../types/onSuccess";
import { defaultOnErrorFunction, OnErrorFunction } from "../types/onError";
import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

import { BaseParamType, Route } from "../types/route";
import { routeBuilder, routeBuilderWithParam } from "../utils/route";
import { NoPayloadHTTPMethods } from "../constants/methods.const";

export interface NoPayloadRequestFactoryProps {
  onError?: OnErrorFunction;
  onSuccess?: OnSuccessFunction;
  axios: AxiosInstance;
  prefix: string;
  method: NoPayloadHTTPMethods;
}

/**
 * Util Method For Sending HTTP Requests
 * @param axios - Axios Instance
 * @param prefix - Request Route Prefix
 * @param method - HTTP Method without Payload
 * @returns - Request Function of selected method with route: "prefix/route"
 */
export const noPayloadRequest =
  ({
    axios,
    prefix,
    method,
    onError = defaultOnErrorFunction,
    onSuccess = defaultOnSuccessFunction,
  }: NoPayloadRequestFactoryProps) =>
  <ResponseDataType = any>(route?: Route, config?: AxiosRequestConfig) => {
    return async () =>
      axios[method]<ResponseDataType>(routeBuilder(prefix, route), config).then(onSuccess).catch(onError);
  };

/**
 * Util Method For Sending Requests
 * @param axios - Axios Instance
 * @param prefix - Request Route Prefix
 * @returns - Request Function of selected method with route: "prefix/route/:param"
 */
export const noPayloadRequestByParam =
  ({
    axios,
    prefix,
    method,
    onError = defaultOnErrorFunction,
    onSuccess = defaultOnSuccessFunction,
  }: NoPayloadRequestFactoryProps) =>
  <ResponseDataType = any, ParamType extends BaseParamType = string>(
    route?: Route,
    config?: AxiosRequestConfig
  ): ((param: ParamType) => Promise<AxiosResponse<ResponseDataType>>) => {
    return async (param: ParamType) =>
      axios[method]<ResponseDataType>(routeBuilderWithParam(prefix, param, route), config)
        .then(onSuccess)
        .catch(onError);
  };
