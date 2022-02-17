import { PrestStatic } from "./prest/static";

export { PrestInstance } from "./prest/instance";
export { ServiceMethods } from "./types/prest";
export { InstanceConfig, PrestStatic } from "./prest/static";
export { PrestService } from "./prest/service";
export { ServiceConfig } from "./types/prest";

export const prest = new PrestStatic();

export default prest;
