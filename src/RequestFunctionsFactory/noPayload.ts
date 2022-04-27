import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { NoPayloadHTTPMethods } from "../types/methods.types";
import { defaultOnErrorFunction } from "../types/onError";
import { BaseParamType, Route } from "../types/route";
import { ServiceConfig } from "../types/service.types";
import { mergeRequestConfig } from "../utils/config";
import { onSuccessHandle } from "../utils/onSuccess.utils";
import { routeBuilder, routeBuilderWithParam } from "../utils/route";
import { ServiceFunction } from "../types/service.types";

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
export const noPayloadRequestFunctionCreator =
  ({ axios, prefix, method, serviceConfig }: NoPayloadRequestFactoryProps) =>
  <ResponseDataType = any>(
    route?: Route,
    config?: AxiosRequestConfig,
    serviceFunction?: ServiceFunction
  ) => {
    return async () =>
      axios[method]<ResponseDataType>(
        routeBuilder(prefix, route),
        mergeRequestConfig(axios.defaults, serviceConfig?.requestConfig, config)
      )
        .then((res) => onSuccessHandle(res, { serviceConfig, serviceFunction }))
        .catch(serviceConfig?.onError ?? defaultOnErrorFunction);
  };

/**
 * Util Method For Sending Requests
 * @param axios - Axios Instance
 * @param prefix - Request Route Prefix
 * @param serviceConfig - Upper Level Multiple Methods Service Configuration
 * @returns - Request Function of selected method with route: "prefix/route/:param"
 */
export const noPayloadRequestFunctionCreatorByParam =
  ({ axios, prefix, method, serviceConfig }: NoPayloadRequestFactoryProps) =>
  <ResponseDataType = any, ParamType extends BaseParamType = string>(
    route?: Route,
    config?: AxiosRequestConfig,
    serviceFunction?: ServiceFunction
  ): ((param: ParamType) => Promise<AxiosResponse<ResponseDataType>>) => {
    return async (param: ParamType) =>
      axios[method]<ResponseDataType>(
        routeBuilderWithParam(prefix, param, route),
        mergeRequestConfig(axios.defaults, serviceConfig?.requestConfig, config)
      )
        .then((res) => onSuccessHandle(res, { serviceConfig, serviceFunction }))
        .catch(serviceConfig?.onError ?? defaultOnErrorFunction);
  };
