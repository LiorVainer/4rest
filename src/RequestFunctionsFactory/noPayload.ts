import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { NoPayloadHTTPMethods } from "../types/methods.types";
import { defaultOnErrorFunction } from "../types/onError";
import { BaseParamType, Route } from "../types/route";
import { ServiceConfig } from "../types/service.types";
import { mergeRequestConfig } from "../utils/config";
import { onSuccessHandle } from "../utils/onSuccess.utils";
import { routeBuilder, routeBuilderWithParam } from "../utils/route";
import { ServiceFunction } from "../types/service.types";
import { NoPayloadRequestFunctionByParamParams, NoPayloadRequestFunctionParams } from "./factory.types";

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
  <ResponseDataType = any>({ config, route, serviceFunction }: NoPayloadRequestFunctionParams = {}) => {
    return async () => {
      const metadata = { serviceConfig, serviceFunction };

      return axios[method]<ResponseDataType>(
        routeBuilder(prefix, route),
        mergeRequestConfig(axios.defaults, serviceConfig?.requestConfig, config)
      )
        .then((res) => onSuccessHandle(res, metadata))
        .catch(serviceConfig?.onError ?? defaultOnErrorFunction);
    };
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
  <ResponseDataType = any, ParamType extends BaseParamType = string>({
    config,
    route,
    serviceFunction,
    suffix,
  }: NoPayloadRequestFunctionByParamParams = {}): ((param: ParamType) => Promise<AxiosResponse<ResponseDataType>>) => {
    return async (param: ParamType) => {
      const metadata = { serviceConfig, serviceFunction };

      return axios[method]<ResponseDataType>(
        routeBuilderWithParam(prefix, param, route, suffix),
        mergeRequestConfig(axios.defaults, serviceConfig?.requestConfig, config)
      )
        .then((res) => onSuccessHandle(res, metadata))
        .catch(serviceConfig?.onError ?? defaultOnErrorFunction);
    };
  };
