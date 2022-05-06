import { ServiceConfig, ServiceFunction } from "../types/service.types";
import { MethodValidationConfig } from "../types/validation.types";

export const metadataCreator = (
  serviceConfig?: ServiceConfig,
  serviceFunction?: ServiceFunction,
  validation?: MethodValidationConfig
) => {
  let metadata = { serviceConfig, serviceFunction };

  if (validation) {
    metadata = {
      ...metadata,
      serviceConfig: { validation: { ...metadata.serviceConfig?.validation, types: validation } },
    };
  }

  return metadata;
};
