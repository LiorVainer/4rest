import { ArpeggiosInstance, ArpeggiosService, ServiceConfig, ServiceMethods } from "../index";
import { ObjectId } from "mongodb";
import { createRequestMethods } from "../RequestFactory";

export function Service<Response = any, Payload = Response, IdType = ObjectId>(
  instance: ArpeggiosInstance,
  prefix: string
) {
  // this is the decorator factory, it sets up
  // the returned decorator function
  return function <T extends { new (...args: any[]): {} }>(originalConstructor: T) {
    console.log("proto1", originalConstructor.prototype);

    Object.setPrototypeOf(originalConstructor.prototype, Object.getPrototypeOf(ArpeggiosService));
    console.log("proto2", originalConstructor.prototype);

    return class extends originalConstructor {
      methods = createRequestMethods(prefix, instance);
      getAll() {
        return this.methods.get<Response[]>();
      }
    };
  };
}
