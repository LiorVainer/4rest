import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { WithPayloadHTTPMethods } from "../../types/methods.types";
import { defaultOnErrorFunction } from "../../types/onError.types";
import { Key } from "../../types/payload.types";
import { BaseParamType, Route } from "../../types/route.types";
import { ServiceConfig, ServiceFunction } from "../../types/service.types";
import { mergeRequestConfig } from "../../utils/config.utils";
import { metadataCreator } from "../../utils/metadata.utils";
import { onErrorHandle } from "../../utils/onError.utils";
import { onSuccessHandle } from "../../utils/onSuccess.utils";
import { payloadBuilder } from "../../utils/payload.utils";
import { routeBuilder, routeBuilderWithParam } from "../../utils/route.utils";
import { payloadValidationHandle } from "../../utils/validation.utils";
import { PayloadRequestFunctionByParamConfig, PayloadRequestFunctionConfig } from "./factory.types";

export interface WithPayloadRequestFactoryProps {
  axios: AxiosInstance;
  prefix: string;
  method: WithPayloadHTTPMethods;
  serviceConfig?: ServiceConfig;
}

type DataPayload<T> = T | { [key in Key]: T };

/**
 * Util Method For Sending HTTP Requests
 * @param axios - Axios Instance
 * @param prefix - Request Route Prefix
 * @param method - HTTP Method with Payload
 * @param serviceConfig - Upper Level Multiple Methods Service Configuration
 * @returns - Request Function of selected method with route: "prefix/route"
 */
export const withPayloadRequest =
  ({ axios, prefix, method, serviceConfig }: WithPayloadRequestFactoryProps) =>
  <ResponseDataType = any, PayloadType = ResponseDataType>({
    config,
    key,
    route,
    serviceFunction,
    validation,
    onError,
    onSuccess,
  }: PayloadRequestFunctionConfig = {}): ((data: PayloadType) => Promise<AxiosResponse<ResponseDataType>>) => {
    return async (data: PayloadType) => {
      const metadata = metadataCreator(serviceConfig, serviceFunction, { validation, onSuccess, onError });

      payloadValidationHandle(data, metadata);

      return axios[method]<DataPayload<PayloadType>, AxiosResponse<ResponseDataType>>(
        routeBuilder(prefix, route),
        payloadBuilder(data, key ? key : serviceConfig?.payloadKey),
        mergeRequestConfig(axios.defaults, serviceConfig?.requestConfig, config)
      )
        .then((res) => onSuccessHandle(res, metadata))
        .catch((error) => onErrorHandle(error, metadata));
    };
  };

/**
 * Util Method For Sending HTTP Requests
 * @param axios - Axios Instance
 * @param prefix - Request Route Prefix
 * @param method - HTTP Method with Payload
 * @param serviceConfig - Upper Level Multiple Methods Service Configuration
 * @returns - Request Function of selected method with route: "prefix/route"
 */
export const withPayloadRequestByParam =
  ({ axios, prefix, method, serviceConfig }: WithPayloadRequestFactoryProps) =>
  <ResponseDataType = any, PayloadType = ResponseDataType, ParamType extends BaseParamType = string>({
    config,
    key,
    route,
    serviceFunction,
    suffix,
    validation,
    onError,
    onSuccess,
  }: PayloadRequestFunctionByParamConfig = {}): ((
    param: ParamType,
    data: PayloadType
  ) => Promise<AxiosResponse<ResponseDataType>>) => {
    return async (param: ParamType, data: PayloadType) => {
      const metadata = metadataCreator(serviceConfig, serviceFunction, { validation, onSuccess, onError });

      payloadValidationHandle(data, metadata);

      return axios[method]<DataPayload<PayloadType>, AxiosResponse<ResponseDataType>>(
        routeBuilderWithParam(prefix, param, route, suffix),
        payloadBuilder(data, key ? key : serviceConfig?.payloadKey),
        mergeRequestConfig(axios.defaults, serviceConfig?.requestConfig, config)
      )
        .then((res) => onSuccessHandle(res, metadata))
        .catch((error) => onErrorHandle(error, metadata));
    };
  };
