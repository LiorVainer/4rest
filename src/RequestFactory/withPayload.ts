import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

import { routeBuilder } from "../utils/route";
import { payloadBuilder } from "../utils/payload";
import { Route } from "../types/route";
import { Key } from "types/payload";
import { CatchFunction, defaultCatchFunction } from "../types/catchFunction";
import {
  defaultResponseHandleFunction,
  ResponseHandleFunction,
} from "../types/responseHandleFunction";

export type WithPayloadHTTPMethods = "post" | "put" | "patch";

export const withPayloadRequestMethods: Record<string, WithPayloadHTTPMethods> =
  {
    POST: "post",
    PUT: "put",
    PATCH: "patch",
  };

export interface WithPayloadRequestFactoryProps {
  catchFunction?: CatchFunction;
  responseHandleFunction?: ResponseHandleFunction;
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
    catchFunction = defaultCatchFunction,
    responseHandleFunction = defaultResponseHandleFunction,
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
        .then(responseHandleFunction)
        .catch(catchFunction);
  };
