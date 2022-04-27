import { ZodSchema } from "zod";
import { ServiceFunction } from "./service.types";

export interface ValidationConfig {
  types: {
    requestPayload?: ZodSchema;
    resoponseData?: ZodSchema;
  };
  methods: ServiceFunction[] | ServiceFunction;
}
