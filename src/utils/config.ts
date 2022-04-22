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
    const mergedConfig = {
      ...globalServiceConfig,
      ...serviceConfig,
      routes: { ...globalServiceConfig.routes, ...serviceConfig.routes },
    };

    return mergedConfig;
  }

  return undefined;
};
