import { createMethodsFunctionsCreator } from "../classes/RequestFunctionsFactory/index";
import { ForestService } from "../classes/service.class";
import { fallback } from "../utils/general.utils";
import { ServiceMethodResponse } from "../types/promise.types";

// export const GetAll = <T extends ForestService, Response = any>() => {
//   return (target: T, propertyKey: string, descriptor: PropertyDescriptor) => {
//     const originalMethod = descriptor.value;
//     console.log(descriptor.value);
//     // anonymous function, not arrow
//     descriptor.value = function (
//       ...args: any[]
//     ): ServiceMethodResponse<Response> {
//       const result = originalMethod.apply(this, args);
//       const returnMethod = (): =  target.methods.get<Response>(
//         target.config.routes?.getAll,
//         fallback(
//           target.config.requestConfigByMethod?.getAll,
//           target.config.requestConfig
//         )
//       )();
//     };

//     console.log(descriptor);

//     return descriptor;
//   };
// };
