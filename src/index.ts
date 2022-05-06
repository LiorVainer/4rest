import { ForestStatic } from "./classes/Static.class";

export { InstanceConfig as ForestInstanceConfig } from "./classes/Instance.class";
export { ForestInstance } from "./classes/Instance.class";
export { ServiceMethodsCreator as ForestServiceMethodsCreator } from "./types/service.types";
export { ForestStatic } from "./classes/Static.class";

export { ForestService } from "./classes/Service.class";
export { ServiceConfig as ForestServiceConfig } from "./types/service.types";

export const forest = new ForestStatic();

export default forest;
