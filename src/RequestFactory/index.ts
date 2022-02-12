import { ArpeggiosInstance } from "index";

import { Prefix } from "../types/route";

import { FetchInstance } from "./../types/fetchInstance";
import { NoPayloadHTTPMethods, noPayloadRequest, noPayloadRequestByParam, noPayloadRequestMethods } from "./noPayload";

import { WithPayloadHTTPMethods, withPayloadRequest, withPayloadRequestMethods } from "./withPayload";

export class RequestFactory {
  private fetchInstance: FetchInstance;
  private prefix: Prefix;

  constructor(fetchInstance: FetchInstance, prefix: Prefix) {
    this.fetchInstance = fetchInstance;
    this.prefix = prefix;
  }

  public noPayloadRequest = (method: NoPayloadHTTPMethods) =>
    noPayloadRequest({ fetchInstance: this.fetchInstance, prefix: this.prefix, method });

  public noPayloadRequestByParam = (method: NoPayloadHTTPMethods) =>
    noPayloadRequestByParam({ fetchInstance: this.fetchInstance, prefix: this.prefix, method });

  public withPayloadRequest = (method: WithPayloadHTTPMethods) =>
    withPayloadRequest({ fetchInstance: this.fetchInstance, prefix: this.prefix, method });
}

export const createRequestMethods = (prefix: string, arpeggiosInstance: ArpeggiosInstance) => {
  const requestFactory = new RequestFactory(arpeggiosInstance.fetchInstance, prefix);
  return {
    get: requestFactory.noPayloadRequest(noPayloadRequestMethods.GET),
    getByParam: requestFactory.noPayloadRequestByParam(noPayloadRequestMethods.GET),
    delete: requestFactory.noPayloadRequest(noPayloadRequestMethods.DELETE),
    deleteByParam: requestFactory.noPayloadRequestByParam(noPayloadRequestMethods.DELETE),
    post: requestFactory.withPayloadRequest(withPayloadRequestMethods.POST),
    put: requestFactory.withPayloadRequest(withPayloadRequestMethods.PUT),
    patch: requestFactory.withPayloadRequest(withPayloadRequestMethods.PATCH),
  };
};
