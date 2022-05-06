import { ZodSchema } from "zod";
import { ServiceFunction } from "./service.types";

interface ValidationTypes<T = ZodSchema> {
  requestPayload?: T;
  resoponseData?: T;
}
interface MethodsValidation {
  types: ValidationTypes;
}

export interface ServiceValidationConfig {
  types: ValidationTypes;
  onMethods?: Partial<Record<ServiceFunction, MethodsValidation>>;
}

export type MethodValidationConfig = ValidationTypes;
