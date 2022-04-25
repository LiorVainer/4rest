import { ForestStatic } from "./forest/static";

export { InstanceConfig as ForestInstanceConfig } from "./forest/instance";
export { ForestInstance } from "./forest/instance";
export { ServiceMethods as ForestServiceMethods } from "./types/service.types";
export { ForestStatic } from "./forest/static";

export { ForestService } from "./forest/service";
export { ServiceConfig as ForestServiceConfig } from "./types/service.types";

export const forest = new ForestStatic();

export default forest;
