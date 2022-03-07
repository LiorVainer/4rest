import { AxiosInstance } from "axios";
import { ResponseHandleFunction } from "./../types/responseHandleFunction";
import { ForestInstance } from "index";

import { CatchFunction } from "../types/catchFunction";

import { Prefix } from "../types/route";

import {
  NoPayloadHTTPMethods,
  noPayloadRequest,
  noPayloadRequestByParam,
  noPayloadRequestMethods,
} from "./noPayload";

import {
  WithPayloadHTTPMethods,
  withPayloadRequest,
  withPayloadRequestMethods,
} from "./withPayload";

export class RequestFactory {
  private axios: AxiosInstance;
  private prefix: Prefix;
  private catchFunction: CatchFunction | undefined;
  private responseHandleFunction: ResponseHandleFunction | undefined;

  constructor(
    axios: AxiosInstance,
    prefix: Prefix,
    responseHandleFunction?: ResponseHandleFunction,
    catchFunction?: CatchFunction
  ) {
    this.axios = axios;
    this.prefix = prefix;
    this.responseHandleFunction = responseHandleFunction;
    this.catchFunction = catchFunction;
  }

  public noPayloadRequest = (method: NoPayloadHTTPMethods) =>
    noPayloadRequest({
      axios: this.axios,
      prefix: this.prefix,
      method,
      responseHandleFunction: this.responseHandleFunction,
      catchFunction: this.catchFunction,
    });

  public noPayloadRequestByParam = (method: NoPayloadHTTPMethods) =>
    noPayloadRequestByParam({
      axios: this.axios,
      prefix: this.prefix,
      method,
      responseHandleFunction: this.responseHandleFunction,
      catchFunction: this.catchFunction,
    });

  public withPayloadRequest = (method: WithPayloadHTTPMethods) =>
    withPayloadRequest({
      axios: this.axios,
      prefix: this.prefix,
      method,
      responseHandleFunction: this.responseHandleFunction,
      catchFunction: this.catchFunction,
    });
}

export const createRequestMethods = (
  prefix: string,
  forestInstance: ForestInstance,
  responseHandleFunction?: ResponseHandleFunction,
  catchFunction?: CatchFunction
) => {
  const requestFactory = new RequestFactory(
    forestInstance.axiosInsance,
    prefix,
    responseHandleFunction,
    catchFunction
  );
  return {
    get: requestFactory.noPayloadRequest(noPayloadRequestMethods.GET),
    getByParam: requestFactory.noPayloadRequestByParam(
      noPayloadRequestMethods.GET
    ),
    delete: requestFactory.noPayloadRequest(noPayloadRequestMethods.DELETE),
    deleteByParam: requestFactory.noPayloadRequestByParam(
      noPayloadRequestMethods.DELETE
    ),
    post: requestFactory.withPayloadRequest(withPayloadRequestMethods.POST),
    put: requestFactory.withPayloadRequest(withPayloadRequestMethods.PUT),
    patch: requestFactory.withPayloadRequest(withPayloadRequestMethods.PATCH),
  };
};
