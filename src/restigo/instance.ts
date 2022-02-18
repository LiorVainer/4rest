import { CachiosInstance } from "cachios";

import { ServiceConfig } from "../types/restigo";

import { RestigoService } from "./service";

export class RestigoInstance {
  constructor(readonly cachiosInstance: CachiosInstance) {}

  public createService = <Response, Payload = Response, IdType = string>(prefix: string, config?: ServiceConfig) =>
    new RestigoService<Response, Payload, IdType>(prefix, this, config);
}

export default RestigoInstance;
