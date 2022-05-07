import { OnErrorFunction } from "./onError.types";
import { OnSuccessFunction } from "./onSuccess.types";
import { ServiceConfig, ServiceFunction } from "./service.types";
import { MethodValidationConfig } from "./validation.types";

export interface Metadata {
  serviceConfig?: ServiceConfig;
  serviceFunction?: ServiceFunction;
}

export interface CustomMethodOverrideMetadata {
  validation?: MethodValidationConfig;
  onSuccess?: OnSuccessFunction;
  onError?: OnErrorFunction;
}
