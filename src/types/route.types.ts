export type Route = string[] | string;
export type Prefix = string;
export type BaseParamType = { toString: () => string };

export type MethodRouteConfig = { route?: Route; suffix?: Route };
