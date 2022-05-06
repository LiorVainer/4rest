import { OnErrorFunction } from "./onError";
import { OnSuccessFunction } from "./onSuccess";
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
