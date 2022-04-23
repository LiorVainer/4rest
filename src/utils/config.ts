import { AxiosDefaults, AxiosRequestConfig } from "axios";
import { ServiceConfig } from "../types/forest";

export const mergeGlobalAndServiceConfig = (
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

export const mergeRequestConfig = (
  axiosDefaults: AxiosDefaults,
  serviceRequestConfig?: AxiosRequestConfig,
  singleRequestConfig?: AxiosRequestConfig
): AxiosRequestConfig | undefined => {
  let mergedConfig = undefined;
  if (serviceRequestConfig && !singleRequestConfig) {
    mergedConfig = {
      ...axiosDefaults,
      ...serviceRequestConfig,
      headers: { ...axiosDefaults.headers.common, ...serviceRequestConfig.headers },
    };
  } else if (!serviceRequestConfig && singleRequestConfig) {
    mergedConfig = {
      ...axiosDefaults,
      ...singleRequestConfig,
      headers: { ...axiosDefaults.headers.common, ...singleRequestConfig.headers },
    };
  } else if (serviceRequestConfig && singleRequestConfig) {
    mergedConfig = {
      ...axiosDefaults,
      ...serviceRequestConfig,
      ...singleRequestConfig,
      headers: { ...axiosDefaults.headers.common, ...serviceRequestConfig.headers, ...singleRequestConfig.headers },
    };
  }

  return mergedConfig;
};
