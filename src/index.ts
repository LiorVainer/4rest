import { ForestStatic } from "./classes/static.class";

export { InstanceConfig as ForestInstanceConfig } from "./classes/instance.class";
export { ForestInstance } from "./classes/instance.class";
export { ServiceMethodsCreator as ForestServiceMethodsCreator } from "./types/service.types";
export { ForestStatic } from "./classes/static.class";
export { Metadata } from "./types/metadata.types";
export { OnErrorFunction } from "./types/onError.types";
export { OnSuccessFunction } from "./types/onSuccess.types";
export { GlobalServiceConfig, ServiceFunction, ServiceMethodsCreator } from "./types/service.types";
export { MethodValidationConfig, ServiceValidationConfig } from "./types/validation.types";

export { ForestService } from "./classes/service.class";
export { ServiceConfig as ForestServiceConfig } from "./types/service.types";

export const forest = new ForestStatic();

export default forest;
