import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

import { routeBuilder, routeBuilderWithParam } from "../utils/route";
import { payloadBuilder } from "../utils/payload";
import { BaseParamType, Route } from "../types/route";
import { Key } from "types/payload";
import { ErrorHandleFunction, defaultErrorHandleFunction } from "../types/errorHandleFunction";
import { defaultOnSuccessFunction, OnSuccessFunction } from "../types/onSuccess";
import { WithPayloadHTTPMethods } from "constants/methods.const";

export interface WithPayloadRequestFactoryProps {
  errorHandleFunction?: ErrorHandleFunction;
  onSuccess?: OnSuccessFunction;
  axios: AxiosInstance;
  prefix: string;
  method: WithPayloadHTTPMethods;
}

type DataPayload<T> = T | { [key in Key]: T };

/**
 * Util Method For Sending HTTP Requests
 * @param axios - Axios Instance
 * @param prefix - Request Route Prefix
 * @param method - HTTP Method with Payload
 * @returns - Request Function of selected method with route: "prefix/route"
 */
export const withPayloadRequest =
  ({
    axios,
    prefix,
    method,
    errorHandleFunction = defaultErrorHandleFunction,
    onSuccess = defaultOnSuccessFunction,
  }: WithPayloadRequestFactoryProps) =>
  <ResponseDataType = any, PayloadType = ResponseDataType>(
    route?: Route,
    key?: Key,
    config?: AxiosRequestConfig
  ): ((data: PayloadType) => Promise<AxiosResponse<ResponseDataType>>) => {
    return async (data: PayloadType) =>
      axios[method]<DataPayload<PayloadType>, AxiosResponse<ResponseDataType>>(
        routeBuilder(prefix, route),
        payloadBuilder(data, key),
        config
      )
        .then(onSuccess)
        .catch(errorHandleFunction);
  };

/**
 * Util Method For Sending HTTP Requests
 * @param axios - Axios Instance
 * @param prefix - Request Route Prefix
 * @param method - HTTP Method with Payload
 * @returns - Request Function of selected method with route: "prefix/route"
 */
export const withPayloadRequestByParam =
  ({
    axios,
    prefix,
    method,
    errorHandleFunction = defaultErrorHandleFunction,
    onSuccess = defaultOnSuccessFunction,
  }: WithPayloadRequestFactoryProps) =>
  <ResponseDataType = any, PayloadType = ResponseDataType, ParamType extends BaseParamType = string>(
    route?: Route,
    key?: Key,
    config?: AxiosRequestConfig
  ): ((param: ParamType, data: PayloadType) => Promise<AxiosResponse<ResponseDataType>>) => {
    return async (param: ParamType, data: PayloadType) =>
      axios[method]<DataPayload<PayloadType>, AxiosResponse<ResponseDataType>>(
        routeBuilderWithParam(prefix, param, route),
        payloadBuilder(data, key),
        config
      )
        .then(onSuccess)
        .catch(errorHandleFunction);
  };
