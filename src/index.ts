import { RequestFactory } from "./RequestFactory";
import { noPayloadRequestMethods as npReqMethods } from "./RequestFactory/noPayload";
import { withPayloadRequestMethods as wpReqMethods } from "./RequestFactory/withPayload";
import { CachiosInstance } from "cachios";
import { FetchInstance } from "./types/fetchInstance";
import { fetchInstanceToCachiosInstance } from "./utils/cachios";
import { ArpeggiosStatic } from "./arpeggios/static";

export {
  ArpeggiosInstance,
  ArpeggiosMethods,
  ArpeggiosConfig,
} from "types/arpeggios";
export { ArpeggiosCreateProps, ArpeggiosStatic } from "./arpeggios/static";
export { ArpeggiosService } from "./arpeggios/service";

/**
 * Factory Function For Creating HTTP Requests Functions Built on top of Cachios and Axios
 * @param arpeggios - Axios Or Cachios Instance
 * @returns - Object Containes HTTP Request Functions Maker Properties
 */
export const Arpeggios = (fetchInstance: FetchInstance) => (prefix: string) => {
  const arpeggios: CachiosInstance =
    fetchInstanceToCachiosInstance(fetchInstance);
  const requestFactory = new RequestFactory(arpeggios, prefix);
  return {
    get: requestFactory.noPayloadRequest(npReqMethods.GET),
    getByParam: requestFactory.noPayloadRequestByParam(npReqMethods.GET),
    delete: requestFactory.noPayloadRequest(npReqMethods.DELETE),
    deleteByParam: requestFactory.noPayloadRequestByParam(npReqMethods.DELETE),
    post: requestFactory.withPayloadRequest(wpReqMethods.POST),
    put: requestFactory.withPayloadRequest(wpReqMethods.PUT),
    patch: requestFactory.withPayloadRequest(wpReqMethods.PATCH),
  };
};

export const arpeggios = new ArpeggiosStatic();

export default arpeggios;
