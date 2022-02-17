import { ServiceMethodResponse } from "../types/promise";

import { ServiceConfig, ServiceMethods } from "../types/prest";

import { createRequestMethods } from "../RequestFactory";

import { fallback } from "../utils/general";

import PrestInstance from "./instance";

export class PrestService<ClassResponseData = any, ClassPayloadData = ClassResponseData, ClassIdType = string> {
  private config: ServiceConfig = {};
  private instance: PrestInstance;

  protected methods: ServiceMethods;

  constructor(prefix: string, prestInstance: PrestInstance, config?: ServiceConfig) {
    this.instance = prestInstance;
    if (config) {
      this.config = config;
    }

    this.methods = createRequestMethods(prefix, this.instance);
  }

  getAll<ResponseData = ClassResponseData[]>(): ServiceMethodResponse<ResponseData> {
    return this.methods.get<ResponseData>(
      this.config.routes?.getAll,
      fallback(this.config.requestConfigByMethod?.getAll, this.config.requestConfig)
    )();
  }

  getById<ResponseData = ClassResponseData, IdType = ClassIdType>(param: IdType): ServiceMethodResponse<ResponseData> {
    return this.methods.getByParam<ResponseData, IdType>(
      this.config.routes?.getById,
      fallback(this.config.requestConfigByMethod?.getById, this.config.requestConfig)
    )(param);
  }

  deleteAll<ResponseData = ClassResponseData[]>(): ServiceMethodResponse<ResponseData> {
    return this.methods.delete<ResponseData>(
      this.config.routes?.deleteAll,
      fallback(this.config.requestConfigByMethod?.deleteAll, this.config.requestConfig)
    )();
  }

  deleteById<ResponseData = ClassResponseData, IdType = ClassIdType>(
    param: IdType
  ): ServiceMethodResponse<ResponseData> {
    return this.methods.deleteByParam<ResponseData, IdType>(
      this.config.routes?.deleteById,
      fallback(this.config.requestConfigByMethod?.deleteById, this.config.requestConfig)
    )(param);
  }

  post<ResponseData = ClassResponseData, PayloadData = ClassPayloadData>(
    data: PayloadData
  ): ServiceMethodResponse<ResponseData> {
    return this.methods.post<ResponseData, PayloadData>(
      this.config.routes?.post,
      fallback(this.config.payloadKeyByMethod?.post, this.config.payloadKey),
      fallback(this.config.requestConfigByMethod?.post, this.config.requestConfig)
    )(data);
  }

  patch<ResponseData = ClassResponseData, PayloadData = ClassPayloadData>(
    data: PayloadData
  ): ServiceMethodResponse<Partial<ResponseData>> {
    return this.methods.patch<ResponseData, PayloadData>(
      this.config.routes?.patch,
      fallback(this.config.payloadKeyByMethod?.patch, this.config.payloadKey),
      fallback(this.config.requestConfigByMethod?.patch, this.config.requestConfig)
    )(data);
  }

  put<ResponseData = ClassResponseData, PayloadData = ClassPayloadData>(
    data: PayloadData
  ): ServiceMethodResponse<Partial<ResponseData>> {
    return this.methods.put<ResponseData, PayloadData>(
      this.config.routes?.put,
      fallback(this.config.payloadKeyByMethod?.put, this.config.payloadKey),
      fallback(this.config.requestConfigByMethod?.put, this.config.requestConfig)
    )(data);
  }
}
