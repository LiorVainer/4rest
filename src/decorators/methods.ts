import { createRequestMethods } from "./../RequestFactory/index";
import { ForestService } from "./../forest/service";
import { fallback } from "../utils/general";
import { ServiceMethodResponse } from "../types/promise";
import { ServiceMethods } from "index";

export const GetAll = <Response = any>(methods: ServiceMethods) => {
  return (
    target: ForestService,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) => {
    const originalMethod = descriptor.value;
    console.log(descriptor.value);
    // anonymous function, not arrow
    descriptor.value = function (
      ...args: any[]
    ): ServiceMethodResponse<Response> {
      const result = originalMethod.apply(this, args);
      return methods.get<Response>(
        target.config.routes?.getAll,
        fallback(
          target.config.requestConfigByMethod?.getAll,
          target.config.requestConfig
        )
      )();
    };

    console.log(descriptor);

    return descriptor;
  };
};
