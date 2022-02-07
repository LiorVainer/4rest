import { BaseParamType, Prefix, Route } from "../types/route";

export const routeBuilder = (prefix: Prefix, route?: Route): string =>
  `${prefix}/${
    route ? (typeof route === "string" ? route : route?.join("/")) : ""
  }`;

export const routeBuilderWithParam = (
  prefix: Prefix,
  param: BaseParamType,
  route?: Route
): string =>
  `${prefix}/${
    route ? (typeof route === "string" ? route : route?.join("/")) : ""
  }/${param.toString()}`;
