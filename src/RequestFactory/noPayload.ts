import { CachiosInstance, CachiosRequestConfig } from "cachios";
import { FetchInstance } from "types/fetchInstance";

import { BaseParamType, Route } from "../types/route";
import { routeBuilder, routeBuilderWithParam } from "../utils/route";

export type NoPayloadHTTPMethods = "get" | "delete" | "head" | "options";

export const noPayloadRequestMethods: Record<string, NoPayloadHTTPMethods> = {
  GET: "get",
  DELETE: "delete",
  HEAD: "head",
  OPTIONS: "options",
};

export interface NoPayloadRequestFactoryProps {
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
  ({ cachios, prefix, method }: NoPayloadRequestFactoryProps) =>
  <ResponseDataType = any>(route?: Route, config?: CachiosRequestConfig) => {
    return async () => cachios[method]<ResponseDataType>(routeBuilder(prefix, route), config).then((res) => res.data);
  };

/**
 * Util Method For Sending Requests
 * @param cachios - Cachios Instance
 * @param prefix - Request Route Prefix
 * @returns - Request Function of selected method with route: "prefix/route/:param"
 */
export const noPayloadRequestByParam =
  ({ cachios, prefix, method }: NoPayloadRequestFactoryProps) =>
  <ResponseDataType = any, ParamType extends BaseParamType = string>(route?: Route, config?: CachiosRequestConfig) => {
    return async (param: ParamType) =>
      cachios[method]<ResponseDataType>(routeBuilderWithParam(prefix, param, route), config).then((res) => res.data);
  };
