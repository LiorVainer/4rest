import { ZodSchema } from "zod";
import { ServiceFunction, ServiceMethod } from "./service.types";

export interface ValidationConfig {
  types: {
    requestPayload?: ZodSchema;
    resoponseData?: ZodSchema;
  };
  methods: ServiceFunction[] | ServiceFunction;
}
