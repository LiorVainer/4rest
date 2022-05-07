import { AxiosResponse } from "axios";
import { ARRAY_VALIDATION_SERVICE_FUNCTIONS } from "../constants/validations.const";
import { Metadata } from "../types/metadata.types";

/**
 * Function to handle validation of response of HTTP request to API
 * @param response - Axios Response to be handled
 * @param metadata - Metadata of the request and service config
 */
export const responseValidationHandle = (response: AxiosResponse<any>, metadata?: Metadata) => {
  if (metadata?.serviceFunction && metadata?.serviceConfig?.validation) {
    const { serviceFunction } = metadata;
    const { types: serviceValidationTypes } = metadata?.serviceConfig?.validation;
    if (metadata?.serviceConfig?.validation?.onMethods) {
      const { onMethods } = metadata.serviceConfig.validation;
      const { serviceFunction } = metadata;

      if (Object.keys(onMethods).includes(serviceFunction)) {
        if (onMethods[metadata.serviceFunction]?.types.resoponseData) {
          // validation of a base service function with custom validation for this method
          return onMethods[serviceFunction]?.types.resoponseData?.parse(response.data);
        }
      }
    }

    // validation of a base service function
    return ARRAY_VALIDATION_SERVICE_FUNCTIONS.includes(serviceFunction)
      ? serviceValidationTypes.resoponseData?.array().parse(response.data)
      : serviceValidationTypes.resoponseData?.parse(response.data);
  }

  // attempt to validate response data
  metadata?.serviceConfig?.validation?.types.resoponseData?.parse(response.data);
};

export const payloadValidationHandle = (payload: any, metadata?: Metadata) => {
  if (metadata?.serviceFunction && metadata?.serviceConfig?.validation) {
    const { serviceFunction } = metadata;
    const { types: serviceValidationTypes } = metadata?.serviceConfig?.validation;
    if (metadata?.serviceConfig?.validation?.onMethods) {
      const { onMethods } = metadata.serviceConfig.validation;
      const { serviceFunction } = metadata;

      if (Object.keys(onMethods).includes(serviceFunction)) {
        if (onMethods[metadata.serviceFunction]?.types.requestPayload) {
          // validation of a base service function with custom validation for this method
          return onMethods[serviceFunction]?.types.requestPayload?.parse(payload);
        }
      }
    }

    // validation of a base service function
    return ARRAY_VALIDATION_SERVICE_FUNCTIONS.includes(serviceFunction)
      ? serviceValidationTypes.requestPayload?.array().parse(payload)
      : serviceValidationTypes.requestPayload?.parse(payload);
  }

  // attempt to validate payload
  metadata?.serviceConfig?.validation?.types.requestPayload?.parse(payload);
};
