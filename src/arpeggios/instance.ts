import { ObjectId } from "mongodb";

import { FetchInstance } from "../types/fetchInstance";

import { ArpeggiosService, ServiceConfig } from "./service";

export class ArpeggiosInstance {
  constructor(protected fetchInstance: FetchInstance) {}

  public createService = <Response, Payload = Response, IdType = ObjectId>(prefix: string, config?: ServiceConfig) =>
    new ArpeggiosService<Response, Payload, IdType>(prefix, this.fetchInstance, config);
}

export default ArpeggiosInstance;
