import { Arpeggios } from "./../index";
import { ArpeggiosInstance, ArpeggiosRequests } from "types/arpeggios";
import { Route } from "types/route";
import { basicCachiosInstance } from "utils/cachios";

export interface ArpeggiosConfig {
  routes?: {
    getAll?: Route;
    getByParam?: Route;
    deleteAll?: Route;
    deleteByParam?: Route;
    post?: Route;
    patch?: Route;
    put?: Route;
  };
  instance?: ArpeggiosInstance;
}

export class ArpeggiosService<
  Response,
  Payload = Response,
  GetAll = Response[],
  GetByParam = Response,
  DeleteAll = Response[],
  DeleteByParam = Response,
  PostResponse = Response,
  PostPayload = Partial<Payload>,
  PatchResponse = PostResponse,
  PatchPayload = PostPayload,
  PutResponse = PostResponse,
  PutPayload = PostPayload
> {
  private instance: ArpeggiosInstance = Arpeggios(basicCachiosInstance());
  protected service: ArpeggiosRequests;
  private config: ArpeggiosConfig = {};

  // Request Functions By Method
  public getAll;
  public getByParam;
  public deleteAll;
  public deleteByParam;
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

    this.getAll = this.service.get<GetAll>(this.config?.routes?.getAll);
    this.getByParam = this.service.getByParam<GetByParam>(
      this.config?.routes?.getByParam
    );
    this.deleteAll = this.service.delete<DeleteAll>(
      this.config?.routes?.deleteAll
    );
    this.deleteByParam = this.service.deleteByParam<DeleteByParam>(
      this.config?.routes?.deleteByParam
    );
    this.post = this.service.post<PostResponse, PostPayload>(
      this.config?.routes?.post
    );
    this.patch = this.service.patch<PatchResponse, PatchPayload>(
      this.config.routes?.patch
    );
    this.put = this.service.put<PutResponse, Partial<Payload>>(
      this.config.routes?.put
    );
  }
}
