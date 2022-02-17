import { CachiosInstance } from "cachios";
import { ObjectId } from "mongodb";

import { ServiceConfig } from "../types/arpeggios";

import { ArpeggiosService } from "./service";

export class ArpeggiosInstance {
  constructor(readonly cachiosInstance: CachiosInstance) {}

  public createService = <Response, Payload = Response, IdType = ObjectId>(prefix: string, config?: ServiceConfig) =>
    new ArpeggiosService<Response, Payload, IdType>(prefix, this, config);
}

export default ArpeggiosInstance;
