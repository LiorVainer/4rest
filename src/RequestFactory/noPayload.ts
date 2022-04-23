import { defaultOnSuccessFunction, OnSuccessFunction } from "./../types/onSuccess";
import { defaultOnErrorFunction, OnErrorFunction } from "../types/onError";
import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

import { BaseParamType, Route } from "../types/route";
import { routeBuilder, routeBuilderWithParam } from "../utils/route";
import { NoPayloadHTTPMethods } from "../constants/methods.const";
import { ServiceConfig } from "../types/forest";
import { mergeRequestConfig } from "../utils/config";

export interface NoPayloadRequestFactoryProps {
  serviceConfig?: ServiceConfig;
  axios: AxiosInstance;
  prefix: string;
  method: NoPayloadHTTPMethods;
}

/**
 * Util Method For Sending HTTP Requests
 * @param axios - Axios Instance
 * @param prefix - Request Route Prefix
 * @param method - HTTP Method without Payload
 * @param serviceConfig - Upper Level Multiple Methods Service Configuration
 * @returns - Request Function of selected method with route: "prefix/route"
 */
export const noPayloadRequest =
  ({ axios, prefix, method, serviceConfig }: NoPayloadRequestFactoryProps) =>
  <ResponseDataType = any>(route?: Route, config?: AxiosRequestConfig) => {
    return async () =>
      axios[method]<ResponseDataType>(
        routeBuilder(prefix, route),
        mergeRequestConfig(axios.defaults, serviceConfig?.requestConfig, config)
      )
        .then(serviceConfig?.onSuccess ?? defaultOnSuccessFunction)
        .catch(serviceConfig?.onError ?? defaultOnErrorFunction);
  };

/**
 * Util Method For Sending Requests
 * @param axios - Axios Instance
 * @param prefix - Request Route Prefix
 * @param serviceConfig - Upper Level Multiple Methods Service Configuration
 * @returns - Request Function of selected method with route: "prefix/route/:param"
 */
export const noPayloadRequestByParam =
  ({ axios, prefix, method, serviceConfig }: NoPayloadRequestFactoryProps) =>
  <ResponseDataType = any, ParamType extends BaseParamType = string>(
    route?: Route,
    config?: AxiosRequestConfig
  ): ((param: ParamType) => Promise<AxiosResponse<ResponseDataType>>) => {
    return async (param: ParamType) =>
      axios[method]<ResponseDataType>(
        routeBuilderWithParam(prefix, param, route),
        mergeRequestConfig(axios.defaults, serviceConfig?.requestConfig, config)
      )
        .then(serviceConfig?.onSuccess ?? defaultOnSuccessFunction)
        .catch(serviceConfig?.onError ?? defaultOnErrorFunction);
  };
