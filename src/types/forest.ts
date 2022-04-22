import { OnSuccessFunction } from "./onSuccess";
import { createRequestMethods } from "../RequestFactory";
import { Key } from "./payload";
import { Route } from "./route";
import { AxiosRequestConfig } from "axios";
import { OnErrorFunction } from "./onError";

export type ServiceMethods = ReturnType<typeof createRequestMethods>;
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
