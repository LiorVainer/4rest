import { CachiosInstance } from "cachios";
import { ArpeggiosInstance } from "index";

import { Prefix } from "../types/route";

import { NoPayloadHTTPMethods, noPayloadRequest, noPayloadRequestByParam, noPayloadRequestMethods } from "./noPayload";

import { WithPayloadHTTPMethods, withPayloadRequest, withPayloadRequestMethods } from "./withPayload";

export class RequestFactory {
  private cachios: CachiosInstance;
  private prefix: Prefix;

  constructor(cachios: CachiosInstance, prefix: Prefix) {
    this.cachios = cachios;
    this.prefix = prefix;
  }

  public noPayloadRequest = (method: NoPayloadHTTPMethods) =>
    noPayloadRequest({ cachios: this.cachios, prefix: this.prefix, method });

  public noPayloadRequestByParam = (method: NoPayloadHTTPMethods) =>
    noPayloadRequestByParam({ cachios: this.cachios, prefix: this.prefix, method });

  public withPayloadRequest = (method: WithPayloadHTTPMethods) =>
    withPayloadRequest({ cachios: this.cachios, prefix: this.prefix, method });
}

export const createRequestMethods = (prefix: string, arpeggiosInstance: ArpeggiosInstance) => {
  const requestFactory = new RequestFactory(arpeggiosInstance.cachiosInstance, prefix);
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
