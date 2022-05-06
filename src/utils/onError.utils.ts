import { Metadata } from "../types/metadata.types";
import { defaultOnErrorFunction } from "../types/onError";

export const isOnErrorByMethodRelvant = (metadata: Metadata) =>
  metadata.serviceFunction &&
  metadata.serviceConfig?.onErrorByMethod &&
  metadata.serviceConfig?.onErrorByMethod[metadata.serviceFunction];

export const isOnErrorRelvant = (metadata: Metadata) =>
  metadata.serviceConfig?.onError || isOnErrorByMethodRelvant(metadata);

export const onErrorDecider = (error: any, metadata: Metadata) => {
  if (isOnErrorByMethodRelvant(metadata)) {
    return metadata.serviceConfig?.onErrorByMethod![metadata.serviceFunction!]!(error, metadata);
  } else {
    return metadata?.serviceConfig?.onError!(error, metadata);
  }
};

/**
 *
 * @param error - Error to be handled
 * @param metadata - Metadata of the request and service config
 * @returns - response handle function
 */
export const onErrorHandle = (error: any, metadata?: Metadata) => {
  if (metadata?.serviceConfig) {
    if (isOnErrorRelvant(metadata)) {
      return onErrorDecider(error, metadata);
    }
  }
  return defaultOnErrorFunction(error, metadata);
};
