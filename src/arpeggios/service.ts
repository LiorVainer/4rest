import { ServiceMethods } from "types/arpeggios";
import { ObjectId } from "mongodb";
import axios from "axios";

import { Route } from "../types/route";

import { FetchInstance } from "./../types/fetchInstance";
import ArpeggiosInstance from "./instance";
import { createRequestMethods } from "RequestFactory";

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

export class ArpeggiosService<Response, Payload = Response, IdType = ObjectId> {
  private config: ServiceConfig = {};

  // Request Functions By Method
  public getAll;
  public getById;
  public deleteAll;
  public deleteById;
  public post;
  public patch;
  public put;

  protected methods: ServiceMethods;

  constructor(prefix: string, fetchInstance: FetchInstance = axios, config?: ServiceConfig) {
    if (config) {
      this.config = config;
    }

    this.methods = createRequestMethods(prefix, fetchInstance);

    this.getAll = this.methods.get<Response[]>(this.config?.routes?.getAll);
    this.getById = this.methods.getByParam<Response, IdType>(this.config?.routes?.getById);
    this.deleteAll = this.methods.delete<Response[]>(this.config?.routes?.deleteAll);
    this.deleteById = this.methods.deleteByParam<Response, IdType>(this.config?.routes?.deleteById);
    this.post = this.methods.post<Response, Payload>(this.config?.routes?.post);
    this.patch = this.methods.patch<Response, Partial<Payload>>(this.config.routes?.patch);
    this.put = this.methods.put<Response, Partial<Payload>>(this.config.routes?.put);
  }
}
