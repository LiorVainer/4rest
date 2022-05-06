import { AxiosRequestConfig } from "axios";
import { ForestService } from "../classes/Service.class";
import { createMethodsFunctionsCreator } from "../classes/RequestFunctionsFactory";
import { OnErrorFunction } from "./onError";
import { OnSuccessFunction } from "./onSuccess";
import { Key } from "./payload";
import { Route } from "./route";
import { ValidationConfig } from "./validation.types";

export type ServiceMethodsCreator = ReturnType<typeof createMethodsFunctionsCreator>;
export type ServiceMethodCreator = keyof ServiceMethodsCreator;

export type ServiceFunction<Service extends ForestService = ForestService> = keyof Service;

export const SERVICE_FUNCTIONS: Record<ServiceFunction, ServiceFunction> = {
  getAll: "getAll",
  getById: "getById",
  deleteAll: "deleteAll",
  deleteById: "deleteById",
  post: "post",
  patch: "patch",
  patchById: "patchById",
  put: "put",
  putById: "putById",
};

export type GlobalServiceConfig = Omit<ServiceConfig, "validation">;
export interface ServiceConfig {
  routes?: Partial<Record<ServiceFunction, Route>>;
  requestConfig?: AxiosRequestConfig;
  requestConfigByMethod?: Partial<Record<ServiceFunction, Route>>;
  validation?: ValidationConfig;
  payloadKey?: Key;
  payloadKeyByMethod?: {
    post?: Key;
    patch?: Key;
    patchById?: Key;
    put?: Key;
    putById?: Key;
  };
  onSuccess?: OnSuccessFunction;
  onSuccessByMethod?: Partial<Record<ServiceFunction, OnSuccessFunction>>;
  onError?: OnErrorFunction;
  onErrorByMethod?: Partial<Record<ServiceFunction, OnErrorFunction>>;
}
