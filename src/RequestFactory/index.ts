import { CachiosInstance } from "cachios";
import { Prefix } from "../types/route";
import {
  NoPayloadHTTPMethods,
  noPayloadRequest,
  noPayloadRequestByParam,
} from "./noPayload";
import { WithPayloadHTTPMethods, withPayloadRequest } from "./withPayload";

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
    noPayloadRequestByParam({
      cachios: this.cachios,
      prefix: this.prefix,
      method,
    });

  public withPayloadRequest = (method: WithPayloadHTTPMethods) =>
    withPayloadRequest({ cachios: this.cachios, prefix: this.prefix, method });
}
