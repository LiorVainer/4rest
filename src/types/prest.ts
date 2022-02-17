import { CachiosRequestConfig } from "cachios";
import { createRequestMethods } from "../RequestFactory";
import { Key } from "./payload";
import { Route } from "./route";

export type ServiceMethods = ReturnType<typeof createRequestMethods>;
export interface ServiceConfig {
  routes?: {
    getAll?: Route;
    getById?: Route;
    deleteAll?: Route;
    deleteById?: Route;
    post?: Route;
    patch?: Route;
    put?: Route;
  };
  requestConfig?: CachiosRequestConfig;
  requestConfigByMethod?: {
    getAll?: CachiosRequestConfig;
    getById?: CachiosRequestConfig;
    deleteAll?: CachiosRequestConfig;
    deleteById?: CachiosRequestConfig;
    post?: CachiosRequestConfig;
    patch?: CachiosRequestConfig;
    put?: CachiosRequestConfig;
  };
  payloadKey?: Key;
  payloadKeyByMethod?: {
    post?: Key;
    patch?: Key;
    put?: Key;
  };
}
