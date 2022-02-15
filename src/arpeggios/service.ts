import { ObjectId } from "mongodb";

import { CachiosRequestConfig } from "cachios";

import { ServiceMethods } from "../types/arpeggios";
import { Route } from "../types/route";

import { createRequestMethods } from "../RequestFactory";
import arpeggios from "../";

import { fallback } from "../utils/general";
import { Key } from "../types/payload";

import ArpeggiosInstance from "./instance";
import { AxiosResponse } from "axios";

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

export class ArpeggiosService<ResponseData = any, Payload = ResponseData, IdType = ObjectId> {
  private config: ServiceConfig = {};

  protected methods: ServiceMethods;

  getAll: () => Promise<AxiosResponse<ResponseData[]>>;
  getById: (param: IdType) => Promise<AxiosResponse<ResponseData>>;
  deleteAll: () => Promise<AxiosResponse<ResponseData[]>>;
  deleteById: (param: IdType) => Promise<AxiosResponse<ResponseData>>;
  post: (data: Payload) => Promise<AxiosResponse<ResponseData>>;
  patch: (data: Partial<Payload>) => Promise<AxiosResponse<ResponseData>>;
  put: (data: Partial<Payload>) => Promise<AxiosResponse<ResponseData>>;

  constructor(prefix: string, arpeggiosInstance: ArpeggiosInstance = arpeggios.create(), config?: ServiceConfig) {
    if (config) {
      this.config = config;
    }

    const { routes, requestConfig, requestConfigByMethod, payloadKey, payloadKeyByMethod } = this.config;

    this.methods = createRequestMethods(prefix, arpeggiosInstance);

    this.getAll = this.methods.get<ResponseData[]>(
      routes?.getAll,
      fallback(requestConfigByMethod?.getAll, requestConfig)
    );
    this.getById = this.methods.getByParam<ResponseData, IdType>(
      routes?.getById,
      fallback(requestConfigByMethod?.getById, requestConfig)
    );
    this.deleteAll = this.methods.delete<ResponseData[]>(
      routes?.deleteAll,
      fallback(requestConfigByMethod?.deleteAll, requestConfig)
    );
    this.deleteById = this.methods.deleteByParam<ResponseData, IdType>(
      routes?.deleteById,
      fallback(requestConfigByMethod?.deleteById, requestConfig)
    );
    this.post = this.methods.post<ResponseData, Payload>(
      routes?.post,
      fallback(payloadKeyByMethod?.post, payloadKey),
      fallback(requestConfigByMethod?.post, requestConfig)
    );
    this.patch = this.methods.patch<ResponseData, Partial<Payload>>(
      routes?.patch,
      fallback(payloadKeyByMethod?.patch, payloadKey),
      fallback(requestConfigByMethod?.patch, requestConfig)
    );
    this.put = this.methods.put<ResponseData, Partial<Payload>>(
      routes?.put,
      fallback(payloadKeyByMethod?.put, payloadKey),
      fallback(requestConfigByMethod?.put, requestConfig)
    );
  }
}
