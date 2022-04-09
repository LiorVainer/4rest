export type Method = "get" | "post" | "put" | "patch" | "delete" | "options" | "head";

export const Methods: Record<string, Method> = {
  GET: "get",
  POST: "post",
  PUT: "put",
  PATCH: "patch",
  DELETE: "delete",
  OPTIONS: "options",
  HEAD: "head",
};

export type NoPayloadHTTPMethods = "get" | "delete" | "head" | "options";

export const noPayloadRequestMethods: Record<string, NoPayloadHTTPMethods> = {
  GET: "get",
  DELETE: "delete",
  HEAD: "head",
  OPTIONS: "options",
};

export type WithPayloadHTTPMethods = "post" | "put" | "patch";

export const withPayloadRequestMethods: Record<string, WithPayloadHTTPMethods> = {
  POST: "post",
  PUT: "put",
  PATCH: "patch",
};
