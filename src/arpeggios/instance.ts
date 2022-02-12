import { ObjectId } from "mongodb";

import { FetchInstance } from "../types/fetchInstance";
import { ArpeggiosService } from "./service";

export class ArpeggiosInstance {
  constructor(protected fetchInstance: FetchInstance) {}

  public createService = <Response, Payload = Response, IdType = ObjectId>(prefix: string) =>
    new ArpeggiosService<Response, Payload, IdType>(prefix, this.fetchInstance);
}

export default ArpeggiosInstance;
