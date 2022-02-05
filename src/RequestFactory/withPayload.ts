import { AxiosInstance, AxiosResponse } from "axios";
import { Route, routeBuilder } from "utils/route";
import { Key, payloadBuilder } from "utils/payload";
import { CachiosInstance } from "cachios";

export type WithPayloadHTTPMethods = "post" | "put" | "patch";

export const withPayloadRequestMethods: Record<string, WithPayloadHTTPMethods> = {
  POST: "post",
  PUT: "put",
  PATCH: "patch",
};

export interface WithPayloadRequestFactoryProps {
  cachios: CachiosInstance;
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
  ({ cachios, prefix, method }: WithPayloadRequestFactoryProps) =>
  <ResponseDataType = any, PayloadType = ResponseDataType>(route?: Route, key?: Key) => {
    return async (data: PayloadType) =>
      cachios[method]<DataPayload<PayloadType>, AxiosResponse<ResponseDataType>>(
        routeBuilder(prefix, route),
        payloadBuilder(data, key)
      ).then((res) => res.data);
  };
