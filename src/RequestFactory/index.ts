import { AxiosInstance } from "axios";
import { OnSuccessFunction } from "./../types/onSuccess";

import { OnErrorFunction } from "../types/onError";

import { Prefix } from "../types/route";

import { noPayloadRequest, noPayloadRequestByParam } from "./noPayload";

import { withPayloadRequest, withPayloadRequestByParam } from "./withPayload";
import {
  NoPayloadHTTPMethods,
  noPayloadRequestMethods,
  WithPayloadHTTPMethods,
  withPayloadRequestMethods,
} from "../constants/methods.const";
import ForestInstance from "../forest/instance";

export class RequestFactory {
  private axios: AxiosInstance;
  private prefix: Prefix;
  private onError: OnErrorFunction | undefined;
  private onSuccess: OnSuccessFunction | undefined;

  constructor(axios: AxiosInstance, prefix: Prefix, onSuccess?: OnSuccessFunction, onError?: OnErrorFunction) {
    this.axios = axios;
    this.prefix = prefix;
    this.onSuccess = onSuccess;
    this.onError = onError;
  }

  public noPayloadRequest = (method: NoPayloadHTTPMethods) =>
    noPayloadRequest({
      axios: this.axios,
      prefix: this.prefix,
      method,
      onSuccess: this.onSuccess,
      onError: this.onError,
    });

  public noPayloadRequestByParam = (method: NoPayloadHTTPMethods) =>
    noPayloadRequestByParam({
      axios: this.axios,
      prefix: this.prefix,
      method,
      onSuccess: this.onSuccess,
      onError: this.onError,
    });

  public withPayloadRequest = (method: WithPayloadHTTPMethods) =>
    withPayloadRequest({
      axios: this.axios,
      prefix: this.prefix,
      method,
      onSuccess: this.onSuccess,
      onError: this.onError,
    });

  public withPayloadRequestByParam = (method: WithPayloadHTTPMethods) =>
    withPayloadRequestByParam({
      axios: this.axios,
      prefix: this.prefix,
      method,
      onSuccess: this.onSuccess,
      onError: this.onError,
    });
}

export const createRequestMethods = (
  prefix: string,
  forestInstance: ForestInstance,
  onSuccess?: OnSuccessFunction,
  onError?: OnErrorFunction
) => {
  const requestFactory = new RequestFactory(forestInstance.axiosInstance, prefix, onSuccess, onError);
  return {
    get: requestFactory.noPayloadRequest(noPayloadRequestMethods.GET),
    getByParam: requestFactory.noPayloadRequestByParam(noPayloadRequestMethods.GET),
    delete: requestFactory.noPayloadRequest(noPayloadRequestMethods.DELETE),
    deleteByParam: requestFactory.noPayloadRequestByParam(noPayloadRequestMethods.DELETE),
    post: requestFactory.withPayloadRequest(withPayloadRequestMethods.POST),
    putByParam: requestFactory.withPayloadRequestByParam(withPayloadRequestMethods.PUT),
    put: requestFactory.withPayloadRequest(withPayloadRequestMethods.PUT),
    patchByParam: requestFactory.withPayloadRequestByParam(withPayloadRequestMethods.PATCH),
    patch: requestFactory.withPayloadRequest(withPayloadRequestMethods.PATCH),
  };
};
