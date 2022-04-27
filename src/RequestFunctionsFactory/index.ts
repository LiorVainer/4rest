import { AxiosInstance } from "axios";
import { noPayloadRequestMethods, withPayloadRequestMethods } from "../constants/methods.const";
import ForestInstance from "../forest/instance";
import { NoPayloadHTTPMethods, WithPayloadHTTPMethods } from "../types/methods.types";
import { Prefix } from "../types/route";
import { ServiceConfig } from "../types/service.types";
import { noPayloadRequestFunctionCreator, noPayloadRequestFunctionCreatorByParam } from "./noPayload";
import { withPayloadRequest, withPayloadRequestByParam } from "./withPayload";

export class RequestFunctionsFactory {
  private axios: AxiosInstance;
  private prefix: Prefix;
  private config: ServiceConfig | undefined;

  constructor(axios: AxiosInstance, prefix: Prefix, config?: ServiceConfig) {
    this.axios = axios;
    this.prefix = prefix;
    this.config = config;
  }

  public noPayloadRequest = (method: NoPayloadHTTPMethods) =>
    noPayloadRequestFunctionCreator({
      axios: this.axios,
      prefix: this.prefix,
      method,
      serviceConfig: this.config,
    });

  public noPayloadRequestByParam = (method: NoPayloadHTTPMethods) =>
    noPayloadRequestFunctionCreatorByParam({
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

export const createMethodsFunctionsCreator = (prefix: string, forestInstance: ForestInstance, config?: ServiceConfig) => {
  const requestFunctionsFactory = new RequestFunctionsFactory(forestInstance.axiosInstance, prefix, config);
  return {
    get: requestFunctionsFactory.noPayloadRequest(noPayloadRequestMethods.GET),
    getByParam: requestFunctionsFactory.noPayloadRequestByParam(noPayloadRequestMethods.GET),
    delete: requestFunctionsFactory.noPayloadRequest(noPayloadRequestMethods.DELETE),
    deleteByParam: requestFunctionsFactory.noPayloadRequestByParam(noPayloadRequestMethods.DELETE),
    post: requestFunctionsFactory.withPayloadRequest(withPayloadRequestMethods.POST),
    putByParam: requestFunctionsFactory.withPayloadRequestByParam(withPayloadRequestMethods.PUT),
    put: requestFunctionsFactory.withPayloadRequest(withPayloadRequestMethods.PUT),
    patchByParam: requestFunctionsFactory.withPayloadRequestByParam(withPayloadRequestMethods.PATCH),
    patch: requestFunctionsFactory.withPayloadRequest(withPayloadRequestMethods.PATCH),
  };
};
