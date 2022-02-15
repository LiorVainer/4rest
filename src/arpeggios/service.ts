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
}

export type ServiceMethodResponse<T> = Promise<AxiosResponse<T>>;

export class ArpeggiosService<ResponseData = any, PayloadData = ResponseData, IdType = ObjectId> {
  private config: ServiceConfig = {};

  protected methods: ServiceMethods;

  getAll: () => ServiceMethodResponse<ResponseData[]>;
  getById: (param: IdType) => ServiceMethodResponse<ResponseData>;
  deleteAll: () => ServiceMethodResponse<ResponseData[]>;
  deleteById: (param: IdType) => ServiceMethodResponse<ResponseData>;
  post: (data: PayloadData) => ServiceMethodResponse<ResponseData>;
  patch: (data: Partial<PayloadData>) => ServiceMethodResponse<ResponseData>;
  put: (data: Partial<PayloadData>) => ServiceMethodResponse<ResponseData>;

  constructor(prefix: string, arpeggiosInstance: ArpeggiosInstance, config?: ServiceConfig) {
    if (config) {
      this.config = config;
    }

    const { routes, requestConfig, requestConfigByMethod, payloadKey, payloadKeyByMethod } = this.config;

    this.methods = createRequestMethods(prefix, arpeggiosInstance);

    this.getAll = this.methods.get<ResponseData[]>(
      routes?.getAll,
      fallback(requestConfigByMethod?.getAll, requestConfig),
      fallback(responsePropertiesByMethod?.getAll, responseProperties)
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
    this.post = this.methods.post<ResponseData, PayloadData>(
      routes?.post,
      fallback(payloadKeyByMethod?.post, payloadKey),
      fallback(requestConfigByMethod?.post, requestConfig)
    );
    this.patch = this.methods.patch<ResponseData, Partial<PayloadData>>(
      routes?.patch,
      fallback(payloadKeyByMethod?.patch, payloadKey),
      fallback(requestConfigByMethod?.patch, requestConfig)
    );
    this.put = this.methods.put<ResponseData, Partial<PayloadData>>(
      routes?.put,
      fallback(payloadKeyByMethod?.put, payloadKey),
      fallback(requestConfigByMethod?.put, requestConfig)
    );
  }
}
