import { ArpeggiosInstance, ServiceConfig, ServiceMethods } from "index";
import { ObjectId } from "mongodb";

export function Service<Response, Payload = Response, IdType = ObjectId>(instance: ArpeggiosInstance, prefix: string) {
  // this is the decorator factory, it sets up
  // the returned decorator function
  return function <T extends { new (...args: any[]): ArpeggiosService<Response, Payload, IdType> }>(
    originalConstructor: T
  ) {
    return class extends originalConstructor {
      constructor(...args: any[]) {
        super(...args);
      }
    };
  };
}

interface ArpeggiosService<Response, Payload = Response, IdType = ObjectId> {
  getAll: () => Promise<Response[]>;
  getById: (param: IdType) => Promise<Response>;
  deleteAll: () => Promise<Response[]>;
  deleteById: (param: IdType) => Promise<Response>;
  post: (payload: Payload) => Promise<Response>;
  patch: (payload: Partial<Payload>) => Promise<Response>;
  put: (payload: Partial<Payload>) => Promise<Response>;
  config: ServiceConfig;
  methods: ServiceMethods;
}
