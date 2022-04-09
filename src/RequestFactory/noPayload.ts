import {
  defaultResponseHandleFunction,
  ResponseHandleFunction,
} from "./../types/responseHandleFunction";
import { defaultCatchFunction } from "./../types/catchFunction";
import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

import { BaseParamType, Route } from "../types/route";
import { routeBuilder, routeBuilderWithParam } from "../utils/route";
import { CatchFunction } from "types/catchFunction";
import { NoPayloadHTTPMethods } from "constants/methods.const";


export interface NoPayloadRequestFactoryProps {
  catchFunction?: CatchFunction;
  responseHandleFunction?: ResponseHandleFunction;
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
    catchFunction = defaultCatchFunction,
    responseHandleFunction = defaultResponseHandleFunction,
  }: NoPayloadRequestFactoryProps) =>
  <ResponseDataType = any>(route?: Route, config?: AxiosRequestConfig) => {
    return async () =>
      axios[method]<ResponseDataType>(routeBuilder(prefix, route), config)
        .then(responseHandleFunction)
        .catch(catchFunction);
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
    catchFunction = defaultCatchFunction,
    responseHandleFunction = defaultResponseHandleFunction,
  }: NoPayloadRequestFactoryProps) =>
  <ResponseDataType = any, ParamType extends BaseParamType = string>(
    route?: Route,
    config?: AxiosRequestConfig
  ): ((param: ParamType) => Promise<AxiosResponse<ResponseDataType>>) => {
    return async (param: ParamType) =>
      axios[method]<ResponseDataType>(
        routeBuilderWithParam(prefix, param, route),
        config
      )
        .then(responseHandleFunction)
        .catch(catchFunction);
  };
