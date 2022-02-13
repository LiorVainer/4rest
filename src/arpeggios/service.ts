import { ObjectId } from "mongodb";

import { ServiceMethods } from "../types/arpeggios";
import { Route } from "../types/route";

import { createRequestMethods } from "../RequestFactory";
import arpeggios from "../";

import ArpeggiosInstance from "./instance";

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

    this.methods = createRequestMethods(prefix, arpeggiosInstance);

    this.getAll = this.methods.get<Response[]>(this.config?.routes?.getAll);
    this.getById = this.methods.getByParam<Response, IdType>(this.config?.routes?.getById);
    this.deleteAll = this.methods.delete<Response[]>(this.config?.routes?.deleteAll);
    this.deleteById = this.methods.deleteByParam<Response, IdType>(this.config?.routes?.deleteById);
    this.post = this.methods.post<Response, Payload>(this.config?.routes?.post);
    this.patch = this.methods.patch<Response, Partial<Payload>>(this.config.routes?.patch);
    this.put = this.methods.put<Response, Partial<Payload>>(this.config.routes?.put);
  }
}
