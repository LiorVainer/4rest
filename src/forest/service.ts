import { createMethodsFunctionsCreator } from "../RequestFunctionsFactory";
import { ServiceMethodResponse } from "../types/promise";
import { ServiceConfig, ServiceMethodsCreator, SERVICE_FUNCTIONS } from "../types/service.types";
import { fallback } from "../utils/general";

import ForestInstance from "./instance";

export class ForestService<ClassResponseData = any, ClassPayloadData = ClassResponseData, ClassIdType = string> {
  protected config: ServiceConfig | undefined;
  private instance: ForestInstance;
  protected methodsCreator: ServiceMethodsCreator;

  constructor(prefix: string, forestInstance: ForestInstance, config?: ServiceConfig) {
    this.instance = forestInstance;
    if (config) {
      this.config = config;
    }

    this.methodsCreator = createMethodsFunctionsCreator(prefix, this.instance, this.config);
  }

  getAll<ResponseData = ClassResponseData[]>(): ServiceMethodResponse<ResponseData> {
    return this.methodsCreator.get<ResponseData>(
      this.config?.routes?.getAll,
      fallback(this.config?.requestConfigByMethod?.getAll, this.config?.requestConfig),
      SERVICE_FUNCTIONS.getAll
    )();
  }

  getById<ResponseData = ClassResponseData, IdType = ClassIdType>(param: IdType): ServiceMethodResponse<ResponseData> {
    return this.methodsCreator.getByParam<ResponseData, IdType>(
      this.config?.routes?.getById,
      fallback(this.config?.requestConfigByMethod?.getById, this.config?.requestConfig),
      SERVICE_FUNCTIONS.getById
    )(param);
  }

  deleteAll<ResponseData = ClassResponseData[]>(): ServiceMethodResponse<ResponseData> {
    return this.methodsCreator.delete<ResponseData>(
      this.config?.routes?.deleteAll,
      fallback(this.config?.requestConfigByMethod?.deleteAll, this.config?.requestConfig),
      SERVICE_FUNCTIONS.deleteAll
    )();
  }

  deleteById<ResponseData = ClassResponseData, IdType = ClassIdType>(
    param: IdType
  ): ServiceMethodResponse<ResponseData> {
    return this.methodsCreator.deleteByParam<ResponseData, IdType>(
      this.config?.routes?.deleteById,
      fallback(this.config?.requestConfigByMethod?.deleteById, this.config?.requestConfig),
      SERVICE_FUNCTIONS.deleteById
    )(param);
  }

  post<ResponseData = ClassResponseData, PayloadData = ClassPayloadData>(
    data: PayloadData
  ): ServiceMethodResponse<ResponseData> {
    return this.methodsCreator.post<ResponseData, PayloadData>(
      this.config?.routes?.post,
      fallback(this.config?.payloadKeyByMethod?.post, this.config?.payloadKey),
      fallback(this.config?.requestConfigByMethod?.post, this.config?.requestConfig),
      SERVICE_FUNCTIONS.post
    )(data);
  }

  patch<ResponseData = ClassResponseData, PayloadData = ClassPayloadData>(
    data: PayloadData
  ): ServiceMethodResponse<Partial<ResponseData>> {
    return this.methodsCreator.patch<ResponseData, PayloadData>(
      this.config?.routes?.patch,
      fallback(this.config?.payloadKeyByMethod?.patch, this.config?.payloadKey),
      fallback(this.config?.requestConfigByMethod?.patch, this.config?.requestConfig),
      SERVICE_FUNCTIONS.patch
    )(data);
  }

  patchById<ResponseData = ClassResponseData, PayloadData = ClassPayloadData, IdType = ClassIdType>(
    param: IdType,
    data: PayloadData
  ): ServiceMethodResponse<Partial<ResponseData>> {
    return this.methodsCreator.patchByParam<ResponseData, PayloadData, IdType>(
      this.config?.routes?.patchById,
      fallback(this.config?.payloadKeyByMethod?.patchById, this.config?.payloadKey),
      fallback(this.config?.requestConfigByMethod?.patchById, this.config?.requestConfig),
      SERVICE_FUNCTIONS.patchById
    )(param, data);
  }

  put<ResponseData = ClassResponseData, PayloadData = ClassPayloadData>(
    data: PayloadData
  ): ServiceMethodResponse<Partial<ResponseData>> {
    return this.methodsCreator.put<ResponseData, PayloadData>(
      this.config?.routes?.put,
      fallback(this.config?.payloadKeyByMethod?.put, this.config?.payloadKey),
      fallback(this.config?.requestConfigByMethod?.put, this.config?.requestConfig),
      SERVICE_FUNCTIONS.put
    )(data);
  }

  putById<ResponseData = ClassResponseData, PayloadData = ClassPayloadData, IdType = ClassIdType>(
    param: IdType,
    data: PayloadData
  ): ServiceMethodResponse<Partial<ResponseData>> {
    return this.methodsCreator.putByParam<ResponseData, PayloadData, IdType>(
      this.config?.routes?.putById,
      fallback(this.config?.payloadKeyByMethod?.putById, this.config?.payloadKey),
      fallback(this.config?.requestConfigByMethod?.putById, this.config?.requestConfig),
      SERVICE_FUNCTIONS.putById
    )(param, data);
  }
}
