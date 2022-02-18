import { RestigoStatic } from "./restigo/static";

export { RestigoInstance } from "./restigo/instance";
export { ServiceMethods } from "./types/restigo";
export { InstanceConfig, RestigoStatic } from "./restigo/static";
export { RestigoService } from "./restigo/service";
export { ServiceConfig } from "./types/restigo";

export const restigo = new RestigoStatic();

export default restigo;
