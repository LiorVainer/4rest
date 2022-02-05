export type Route = string[] | string;
export type Prefix = string;
export type BaseParamType = { toString: () => string };

export const routeBuilder = (prefix: Prefix, route?: Route): string =>
  `${prefix}/${route ? (typeof route === "string" ? route : route?.join("/")) : ""}`;

export const routeBuilderWithParam = (prefix: Prefix, param: BaseParamType, route?: Route): string =>
  `${prefix}/${route ? (typeof route === "string" ? route : route?.join("/")) : ""}/${param.toString()}`;
