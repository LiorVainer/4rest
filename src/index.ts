import { ForestStatic } from "./forest/static";

export { ForestInstance } from "./forest/instance";
export { ServiceMethods } from "./types/forest";
export { ForestInstanceConfig as InstanceConfig, ForestStatic } from "./forest/static";
export { ForestService } from "./forest/service";
export { ServiceConfig } from "./types/forest";

export const forest = new ForestStatic();

export default forest;
