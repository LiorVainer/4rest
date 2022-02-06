import { Arpeggios } from "./../index";
import { ArpeggiosInstance, ArpeggiosMethods } from "types/arpeggios";
import { Route } from "types/route";
import { basicCachiosInstance } from "utils/cachios";
import { ObjectId } from "mongodb";

export interface ArpeggiosConfig {
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
  private instance: ArpeggiosInstance = Arpeggios(basicCachiosInstance());
  protected service: ArpeggiosMethods;
  private config: ArpeggiosConfig = {};

  // Request Functions By Method
  public getAll;
  public getById;
  public deleteAll;
  public deleteById;
  public post;
  public patch;
  public put;

  constructor(prefix: string, config?: ArpeggiosConfig) {
    if (config) {
      this.config = config;
    }

    if (this.config.instance) {
      this.instance = this.config.instance;
    }

    this.service = this.instance(prefix);

    this.getAll = this.service.get<Response[]>(this.config?.routes?.getAll);
    this.getById = this.service.getByParam<Response, IdType>(this.config?.routes?.getById);
    this.deleteAll = this.service.delete<Response[]>(this.config?.routes?.deleteAll);
    this.deleteById = this.service.deleteByParam<Response, IdType>(this.config?.routes?.deleteById);
    this.post = this.service.post<Response, Payload>(this.config?.routes?.post);
    this.patch = this.service.patch<Response, Partial<Payload>>(this.config.routes?.patch);
    this.put = this.service.put<Response, Partial<Payload>>(this.config.routes?.put);
  }
}
