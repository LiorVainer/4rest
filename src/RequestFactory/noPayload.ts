import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { ServiceConfig } from "../types/service.types";
import { defaultOnErrorFunction } from "../types/onError";
import { BaseParamType, Route } from "../types/route";
import { mergeRequestConfig } from "../utils/config";
import { onSuccessHandle } from "../utils/onSuccess.utils";
import { routeBuilder, routeBuilderWithParam } from "../utils/route";
import { NoPayloadHTTPMethods } from "../types/methods.types";

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
        .then((res) => onSuccessHandle(res, serviceConfig))
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
        .then((res) => onSuccessHandle(res, serviceConfig))
        .catch(serviceConfig?.onError ?? defaultOnErrorFunction);
  };
