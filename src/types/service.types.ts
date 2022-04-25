import { AxiosRequestConfig } from "axios";
import { ForestService } from "../forest/service";
import { createRequestMethods } from "../RequestFactory";
import { OnErrorFunction } from "./onError";
import { OnSuccessFunction } from "./onSuccess";
import { Key } from "./payload";
import { Route } from "./route";
import { ValidationConfig } from "./validation";

export type ServiceMethods = ReturnType<typeof createRequestMethods>;
export type ServiceMethod = keyof ServiceMethods;

export type ServiceFunction = keyof ForestService;

export interface ServiceConfig {
  routes?: {
    getAll?: Route;
    getById?: Route;
    deleteAll?: Route;
    deleteById?: Route;
    post?: Route;
    patch?: Route;
    patchById?: Route;
    put?: Route;
    putById?: Route;
  };
  requestConfig?: AxiosRequestConfig;
  requestConfigByMethod?: {
    getAll?: AxiosRequestConfig;
    getById?: AxiosRequestConfig;
    deleteAll?: AxiosRequestConfig;
    deleteById?: AxiosRequestConfig;
    post?: AxiosRequestConfig;
    patch?: AxiosRequestConfig;
    patchById?: AxiosRequestConfig;
    put?: AxiosRequestConfig;
    putById?: AxiosRequestConfig;
  };
  validation: ValidationConfig;
  payloadKey?: Key;
  payloadKeyByMethod?: {
    post?: Key;
    patch?: Key;
    patchById?: Key;
    put?: Key;
    putById?: Key;
  };
  onSuccess?: OnSuccessFunction;
  onError?: OnErrorFunction;
}
