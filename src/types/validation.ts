import { ZodSchema } from "zod";

export interface ValidationConfig {
  types: {
    requestPayload?: ZodSchema;
    resoponseData?: ZodSchema;
  };
}
