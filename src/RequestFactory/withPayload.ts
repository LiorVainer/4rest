import { Axios, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

import { routeBuilder, routeBuilderWithParam } from "../utils/route";
import { payloadBuilder } from "../utils/payload";
import { BaseParamType, Route } from "../types/route";
import { OnErrorFunction, defaultOnErrorFunction } from "../types/onError";
import { defaultOnSuccessFunction, OnSuccessFunction } from "../types/onSuccess";
import { Key } from "../types/payload";
import { WithPayloadHTTPMethods } from "../constants/methods.const";
import { ServiceConfig } from "../types/forest";
import { mergeRequestConfig } from "../utils/config";

export interface WithPayloadRequestFactoryProps {
  axios: AxiosInstance;
  prefix: string;
  method: WithPayloadHTTPMethods;
  serviceConfig?: ServiceConfig;
}

type DataPayload<T> = T | { [key in Key]: T };

/**
 * Util Method For Sending HTTP Requests
 * @param axios - Axios Instance
 * @param prefix - Request Route Prefix
 * @param method - HTTP Method with Payload
 * @param serviceConfig - Upper Level Multiple Methods Service Configuration
 * @returns - Request Function of selected method with route: "prefix/route"
 */
export const withPayloadRequest =
  ({ axios, prefix, method, serviceConfig }: WithPayloadRequestFactoryProps) =>
  <ResponseDataType = any, PayloadType = ResponseDataType>(
    route?: Route,
    key?: Key,
    config?: AxiosRequestConfig
  ): ((data: PayloadType) => Promise<AxiosResponse<ResponseDataType>>) => {
    return async (data: PayloadType) =>
      axios[method]<DataPayload<PayloadType>, AxiosResponse<ResponseDataType>>(
        routeBuilder(prefix, route),
        payloadBuilder(data, key ? key : serviceConfig?.payloadKey),
        mergeRequestConfig(axios.defaults, serviceConfig?.requestConfig, config)
      )
        .then(serviceConfig?.onSuccess ?? defaultOnSuccessFunction)
        .catch(serviceConfig?.onError ?? defaultOnErrorFunction);
  };

/**
 * Util Method For Sending HTTP Requests
 * @param axios - Axios Instance
 * @param prefix - Request Route Prefix
 * @param method - HTTP Method with Payload
 * @param serviceConfig - Upper Level Multiple Methods Service Configuration
 * @returns - Request Function of selected method with route: "prefix/route"
 */
export const withPayloadRequestByParam =
  ({ axios, prefix, method, serviceConfig }: WithPayloadRequestFactoryProps) =>
  <ResponseDataType = any, PayloadType = ResponseDataType, ParamType extends BaseParamType = string>(
    route?: Route,
    key?: Key,
    config?: AxiosRequestConfig
  ): ((param: ParamType, data: PayloadType) => Promise<AxiosResponse<ResponseDataType>>) => {
    return async (param: ParamType, data: PayloadType) =>
      axios[method]<DataPayload<PayloadType>, AxiosResponse<ResponseDataType>>(
        routeBuilderWithParam(prefix, param, route),
        payloadBuilder(data, key ? key : serviceConfig?.payloadKey),
        mergeRequestConfig(axios.defaults, serviceConfig?.requestConfig, config)
      )
        .then(serviceConfig?.onSuccess ?? defaultOnSuccessFunction)
        .catch(serviceConfig?.onError ?? defaultOnErrorFunction);
  };
