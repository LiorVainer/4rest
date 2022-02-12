import { createRequestMethods } from "../RequestFactory";

export type ServiceMethods = ReturnType<typeof createRequestMethods>;
