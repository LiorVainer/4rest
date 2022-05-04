import { BaseParamType, Prefix, Route } from "../types/route";

export const stringStructBuilder = (route: Route, seperator: string = "/"): string => {
  return typeof route === "string" ? route : route?.join(seperator);
};

export const routeBuilder = (prefix: Prefix, route?: Route): string =>
  route ? `${prefix}/${stringStructBuilder(route)}` : prefix;

export const routeBuilderWithParam = (prefix: Prefix, param: BaseParamType, route?: Route, suffix?: Route): string => {
  if (route) {
    return `${prefix}/${stringStructBuilder(route)}/${param}${suffix ? `/${stringStructBuilder(suffix)}` : ""}`;
  } else {
    return `${prefix}/${param}${suffix ? `/${stringStructBuilder(suffix)}` : ""}`;
  }
};
