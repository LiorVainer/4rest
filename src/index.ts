import { ForestStatic } from "./forest/static";

export { InstanceConfig as ForestInstanceConfig } from "./forest/instance";
export { ForestInstance } from "./forest/instance";
export { ServiceMethods as ForestServiceMethods } from "./types/forest";
export { ForestStatic } from "./forest/static";

export { ForestService } from "./forest/service";
export { ServiceConfig as ForestServiceConfig } from "./types/forest";

export const forest = new ForestStatic();

export default forest;
