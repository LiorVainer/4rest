import { Method, NoPayloadHTTPMethods, WithPayloadHTTPMethods } from "../types/methods.types";

export const Methods: Record<string, Method> = {
  GET: "get",
  POST: "post",
  PUT: "put",
  PATCH: "patch",
  DELETE: "delete",
  OPTIONS: "options",
  HEAD: "head",
};

export const noPayloadRequestMethods: Record<string, NoPayloadHTTPMethods> = {
  GET: "get",
  DELETE: "delete",
  HEAD: "head",
  OPTIONS: "options",
};

export const withPayloadRequestMethods: Record<string, WithPayloadHTTPMethods> = {
  POST: "post",
  PUT: "put",
  PATCH: "patch",
};
