import { ArpeggiosInstance, ArpeggiosService, ServiceConfig, ServiceMethods } from "index";
import { ObjectId } from "mongodb";
import { createRequestMethods } from "../RequestFactory";

// export function Service<Response, Payload = Response, IdType = ObjectId>(instance: ArpeggiosInstance, prefix: string) {
//   // this is the decorator factory, it sets up
//   // the returned decorator function
//   return function <T extends { new (...args: any[]): ArpeggiosService<Response, Payload, IdType> }>(
//     originalConstructor: T
//   ) {
//     return class extends originalConstructor {
//       protected methods: ServiceMethods;
//       constructor(...args: any[]) {
//         super(...args);
//         this.methods = createRequestMethods(prefix, instance);
//       }
//     };
//   };
// }
