import { AxiosInstance } from "axios";
import {
  NoPayloadHTTPMethods,
  noPayloadRequestMethods,
  WithPayloadHTTPMethods,
  withPayloadRequestMethods,
} from "../constants/methods.const";
import ForestInstance from "../forest/instance";
import { ServiceConfig } from "../types/service.types";
import { Prefix } from "../types/route";
import { noPayloadRequest, noPayloadRequestByParam } from "./noPayload";
import { withPayloadRequest, withPayloadRequestByParam } from "./withPayload";

export class RequestFactory {
  private axios: AxiosInstance;
  private prefix: Prefix;
  private config: ServiceConfig | undefined;

  constructor(axios: AxiosInstance, prefix: Prefix, config?: ServiceConfig) {
    this.axios = axios;
    this.prefix = prefix;
    this.config = config;
  }

  public noPayloadRequest = (method: NoPayloadHTTPMethods) =>
    noPayloadRequest({
      axios: this.axios,
      prefix: this.prefix,
      method,
      serviceConfig: this.config,
    });

  public noPayloadRequestByParam = (method: NoPayloadHTTPMethods) =>
    noPayloadRequestByParam({
      axios: this.axios,
      prefix: this.prefix,
      method,
      serviceConfig: this.config,
    });

  public withPayloadRequest = (method: WithPayloadHTTPMethods) =>
    withPayloadRequest({
      axios: this.axios,
      prefix: this.prefix,
      method,
      serviceConfig: this.config,
    });

  public withPayloadRequestByParam = (method: WithPayloadHTTPMethods) =>
    withPayloadRequestByParam({
      axios: this.axios,
      prefix: this.prefix,
      method,
      serviceConfig: this.config,
    });
}

export const createRequestMethods = (
  prefix: string,
  forestInstance: ForestInstance,
  config: ServiceConfig | undefined
) => {
  const requestFactory = new RequestFactory(
    forestInstance.axiosInstance,
    prefix,
    config
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
    putByParam: requestFactory.withPayloadRequestByParam(
      withPayloadRequestMethods.PUT
    ),
    put: requestFactory.withPayloadRequest(withPayloadRequestMethods.PUT),
    patchByParam: requestFactory.withPayloadRequestByParam(
      withPayloadRequestMethods.PATCH
    ),
    patch: requestFactory.withPayloadRequest(withPayloadRequestMethods.PATCH),
  };
};
