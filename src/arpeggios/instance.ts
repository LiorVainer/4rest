import { withPayloadRequestMethods } from "./../RequestFactory/withPayload";
import { noPayloadRequestMethods } from "./../RequestFactory/noPayload";
import { CachiosInstance } from "cachios";
import { ObjectId } from "mongodb";
import { fetchInstanceToCachiosInstance } from "../utils/cachios";

import { FetchInstance } from "../types/fetchInstance";
import { ArpeggiosService } from "./service";

export class ArpeggiosInstance {
  constructor(protected fetchInstance: FetchInstance) {}

  public createService = <Response, Payload = Response, IdType = ObjectId>(
    prefix: string
  ) =>
    new ArpeggiosService<Response, Payload, IdType>(prefix, this.fetchInstance);
}

export default ArpeggiosInstance;
