import { CachiosInstance } from "cachios";

import { ServiceConfig } from "../types/prest";

import { PrestService } from "./service";

export class PrestInstance {
  constructor(readonly cachiosInstance: CachiosInstance) {}

  public createService = <Response, Payload = Response, IdType = string>(prefix: string, config?: ServiceConfig) =>
    new PrestService<Response, Payload, IdType>(prefix, this, config);
}

export default PrestInstance;
