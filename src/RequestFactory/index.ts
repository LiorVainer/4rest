import { AxiosInstance } from "axios";
import { OnSuccessFunction } from "./../types/onSuccess";
import { ForestInstance } from "index";

import { ErrorHandleFunction } from "../types/errorHandleFunction";

import { Prefix } from "../types/route";

import { noPayloadRequest, noPayloadRequestByParam } from "./noPayload";

import { withPayloadRequest, withPayloadRequestByParam } from "./withPayload";
import {
  NoPayloadHTTPMethods,
  noPayloadRequestMethods,
  WithPayloadHTTPMethods,
  withPayloadRequestMethods,
} from "../constants/methods.const";

export class RequestFactory {
  private axios: AxiosInstance;
  private prefix: Prefix;
  private errorHandleFunction: ErrorHandleFunction | undefined;
  private onSuccess: OnSuccessFunction | undefined;

  constructor(
    axios: AxiosInstance,
    prefix: Prefix,
    onSuccess?: OnSuccessFunction,
    errorHandleFunction?: ErrorHandleFunction
  ) {
    this.axios = axios;
    this.prefix = prefix;
    this.onSuccess = onSuccess;
    this.errorHandleFunction = errorHandleFunction;
  }

  public noPayloadRequest = (method: NoPayloadHTTPMethods) =>
    noPayloadRequest({
      axios: this.axios,
      prefix: this.prefix,
      method,
      onSuccess: this.onSuccess,
      errorHandleFunction: this.errorHandleFunction,
    });

  public noPayloadRequestByParam = (method: NoPayloadHTTPMethods) =>
    noPayloadRequestByParam({
      axios: this.axios,
      prefix: this.prefix,
      method,
      onSuccess: this.onSuccess,
      errorHandleFunction: this.errorHandleFunction,
    });

  public withPayloadRequest = (method: WithPayloadHTTPMethods) =>
    withPayloadRequest({
      axios: this.axios,
      prefix: this.prefix,
      method,
      onSuccess: this.onSuccess,
      errorHandleFunction: this.errorHandleFunction,
    });

  public withPayloadRequestByParam = (method: WithPayloadHTTPMethods) =>
    withPayloadRequestByParam({
      axios: this.axios,
      prefix: this.prefix,
      method,
      onSuccess: this.onSuccess,
      errorHandleFunction: this.errorHandleFunction,
    });
}

export const createRequestMethods = (
  prefix: string,
  forestInstance: ForestInstance,
  onSuccess?: OnSuccessFunction,
  errorHandleFunction?: ErrorHandleFunction
) => {
  const requestFactory = new RequestFactory(forestInstance.axiosInstance, prefix, onSuccess, errorHandleFunction);
  return {
    get: requestFactory.noPayloadRequest(noPayloadRequestMethods.GET),
    getByParam: requestFactory.noPayloadRequestByParam(noPayloadRequestMethods.GET),
    delete: requestFactory.noPayloadRequest(noPayloadRequestMethods.DELETE),
    deleteByParam: requestFactory.noPayloadRequestByParam(noPayloadRequestMethods.DELETE),
    post: requestFactory.withPayloadRequest(withPayloadRequestMethods.POST),
    put: requestFactory.withPayloadRequestByParam(withPayloadRequestMethods.PUT),
    patch: requestFactory.withPayloadRequestByParam(withPayloadRequestMethods.PATCH),
  };
};
