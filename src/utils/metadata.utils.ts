import { CustomMethodOverrideMetadata } from "../types/metadata.types";
import { ServiceConfig, ServiceFunction } from "../types/service.types";
import { MethodValidationConfig } from "../types/validation.types";

export const metadataCreator = (
  serviceConfig?: ServiceConfig,
  serviceFunction?: ServiceFunction,
  customMetadata?: CustomMethodOverrideMetadata
) => {
  let metadata = { serviceConfig, serviceFunction };

  if (customMetadata?.validation) {
    metadata = {
      ...metadata,
      serviceConfig: { validation: { ...metadata.serviceConfig?.validation, types: customMetadata.validation } },
    };
  }

  if (customMetadata?.onSuccess) {
    metadata = {
      ...metadata,
      serviceConfig: { ...metadata.serviceConfig, onSuccess: customMetadata.onSuccess },
    };
  }

  if (customMetadata?.onError) {
    metadata = {
      ...metadata,
      serviceConfig: { ...metadata.serviceConfig, onError: customMetadata.onError },
    };
  }

  return metadata;
};
