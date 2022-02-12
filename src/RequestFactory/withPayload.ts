import { AxiosResponse } from "axios";

import { FetchInstance } from "types/fetchInstance";

import { routeBuilder } from "../utils/route";
import { Key, payloadBuilder } from "../utils/payload";
import { Route } from "../types/route";

export type WithPayloadHTTPMethods = "post" | "put" | "patch";

export const withPayloadRequestMethods: Record<string, WithPayloadHTTPMethods> = {
  POST: "post",
  PUT: "put",
  PATCH: "patch",
};

export interface WithPayloadRequestFactoryProps {
  fetchInstance: FetchInstance;
  prefix: string;
  method: WithPayloadHTTPMethods;
}

type DataPayload<T> = T | { [key in Key]: T };

/**
 * Util Method For Sending HTTP Requests
 * @param cachios - Cachios Instance
 * @param prefix - Request Route Prefix
 * @param method - HTTP Method with Payload
 * @returns - Request Function of selected method with route: "prefix/route"
 */
export const withPayloadRequest =
  ({ fetchInstance, prefix, method }: WithPayloadRequestFactoryProps) =>
  <ResponseDataType = any, PayloadType = ResponseDataType>(route?: Route, key?: Key) => {
    return async (data: PayloadType) =>
      fetchInstance[method]<DataPayload<PayloadType>, AxiosResponse<ResponseDataType>>(
        routeBuilder(prefix, route),
        payloadBuilder(data, key)
      ).then((res) => res.data);
  };
