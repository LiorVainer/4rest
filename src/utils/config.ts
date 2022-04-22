import merge from "deepmerge";

import { ServiceConfig } from "../types/forest";

export const mergeConfigs = (
  serviceConfig?: ServiceConfig,
  globalServiceConfig?: ServiceConfig
): ServiceConfig | undefined => {
  if (serviceConfig && !globalServiceConfig) {
    return serviceConfig;
  } else if (!serviceConfig && globalServiceConfig) {
    return globalServiceConfig;
  } else if (serviceConfig && globalServiceConfig) {
    const mergedConfig = merge(globalServiceConfig, serviceConfig);
    return { ...mergedConfig, routes: { ...globalServiceConfig.routes, ...serviceConfig.routes } };
  }

  return undefined;
};
