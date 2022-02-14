import { ObjectId } from "mongodb";

import { ServiceMethods } from "../types/arpeggios";
import { Route } from "../types/route";

import { createRequestMethods } from "../RequestFactory";
import arpeggios from "../";

import ArpeggiosInstance from "./instance";
import { CachiosRequestConfig } from "cachios";
import { Key } from "types/payload";
import { fallback } from "utils/general";

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
  instance?: ArpeggiosInstance;
}

export class ArpeggiosService<Response = any, Payload = Response, IdType = ObjectId> {
  private config: ServiceConfig = {};

  protected methods: ServiceMethods;

  getAll: () => Promise<Response[]>;
  getById: (param: IdType) => Promise<Response>;
  deleteAll: () => Promise<Response[]>;
  deleteById: (param: IdType) => Promise<Response>;
  post: (data: Payload) => Promise<Response>;
  patch: (data: Partial<Payload>) => Promise<Response>;
  put: (data: Partial<Payload>) => Promise<Response>;

  constructor(prefix: string, arpeggiosInstance: ArpeggiosInstance = arpeggios.create(), config?: ServiceConfig) {
    if (config) {
      this.config = config;
    }

    const { routes, requestConfig, requestConfigByMethod, payloadKey, payloadKeyByMethod } = this.config;

    this.methods = createRequestMethods(prefix, arpeggiosInstance);

    this.getAll = this.methods.get<Response[]>(routes?.getAll, fallback(requestConfig, requestConfigByMethod?.getAll));
    this.getById = this.methods.getByParam<Response, IdType>(
      routes?.getById,
      fallback(requestConfig, requestConfigByMethod?.getById)
    );
    this.deleteAll = this.methods.delete<Response[]>(
      routes?.deleteAll,
      fallback(requestConfig, requestConfigByMethod?.deleteAll)
    );
    this.deleteById = this.methods.deleteByParam<Response, IdType>(
      routes?.deleteById,
      fallback(requestConfig, requestConfigByMethod?.deleteById)
    );
    this.post = this.methods.post<Response, Payload>(
      routes?.post,
      fallback(payloadKey, payloadKeyByMethod?.put),
      fallback(requestConfig, requestConfigByMethod?.post)
    );
    this.patch = this.methods.patch<Response, Partial<Payload>>(
      routes?.patch,
      fallback(payloadKey, payloadKeyByMethod?.put),
      fallback(requestConfig, requestConfigByMethod?.patch)
    );
    this.put = this.methods.put<Response, Partial<Payload>>(
      routes?.put,
      fallback(payloadKey, payloadKeyByMethod?.put),
      fallback(requestConfig, requestConfigByMethod?.put)
    );
  }
}
