import { BaseParamType, Prefix, Route } from "../types/route";

export const routeBuilder = (prefix: Prefix, route?: Route): string =>
  route
    ? `${prefix}/${typeof route === "string" ? route : route?.join("/")}`
    : prefix;

export const routeBuilderWithParam = (
  prefix: Prefix,
  param: BaseParamType,
  route?: Route
): string =>
  route
    ? `${prefix}/${
        typeof route === "string" ? route : route?.join("/")
      }/${param.toString()}`
    : `${prefix}/${param.toString()}`;
