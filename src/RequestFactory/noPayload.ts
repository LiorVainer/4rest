import {
  defaultResponseHandleFunction,
  ResponseHandleFunction,
} from "./../types/responseHandleFunction";
import { defaultCatchFunction } from "./../types/catchFunction";
import { CachiosInstance, CachiosRequestConfig } from "cachios";
import { AxiosResponse } from "axios";

import { BaseParamType, Route } from "../types/route";
import { routeBuilder, routeBuilderWithParam } from "../utils/route";
import { CatchFunction } from "types/catchFunction";

export type NoPayloadHTTPMethods = "get" | "delete" | "head" | "options";

export const noPayloadRequestMethods: Record<string, NoPayloadHTTPMethods> = {
  GET: "get",
  DELETE: "delete",
  HEAD: "head",
  OPTIONS: "options",
};

export interface NoPayloadRequestFactoryProps {
  catchFunction?: CatchFunction;
  responseHandleFunction?: ResponseHandleFunction;
  cachios: CachiosInstance;
  prefix: string;
  method: NoPayloadHTTPMethods;
}

/**
 * Util Method For Sending HTTP Requests
 * @param cachios - Cachios Instance
 * @param prefix - Request Route Prefix
 * @param method - HTTP Method without Payload
 * @returns - Request Function of selected method with route: "prefix/route"
 */
export const noPayloadRequest =
  ({
    cachios,
    prefix,
    method,
    catchFunction = defaultCatchFunction,
    responseHandleFunction = defaultResponseHandleFunction,
  }: NoPayloadRequestFactoryProps) =>
  <ResponseDataType = any>(
    route?: Route,
    config?: CachiosRequestConfig
  ): (() => Promise<AxiosResponse<ResponseDataType>>) => {
    return async () =>
      cachios[method]<ResponseDataType>(routeBuilder(prefix, route), config)
        .then(responseHandleFunction)
        .catch(catchFunction);
  };

/**
 * Util Method For Sending Requests
 * @param cachios - Cachios Instance
 * @param prefix - Request Route Prefix
 * @returns - Request Function of selected method with route: "prefix/route/:param"
 */
export const noPayloadRequestByParam =
  ({
    cachios,
    prefix,
    method,
    catchFunction = defaultCatchFunction,
    responseHandleFunction = defaultResponseHandleFunction,
  }: NoPayloadRequestFactoryProps) =>
  <ResponseDataType = any, ParamType extends BaseParamType = string>(
    route?: Route,
    config?: CachiosRequestConfig
  ): ((param: ParamType) => Promise<AxiosResponse<ResponseDataType>>) => {
    return async (param: ParamType) =>
      cachios[method]<ResponseDataType>(
        routeBuilderWithParam(prefix, param, route),
        config
      )
        .then(responseHandleFunction)
        .catch(catchFunction);
  };
