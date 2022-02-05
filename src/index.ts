import axios, { Axios, AxiosInstance } from "axios";
import { RequestFactory } from "RequestFactory";
import { noPayloadRequestMethods as npReqMethods } from "RequestFactory/noPayload";
import { withPayloadRequestMethods as wpReqMethods } from "RequestFactory/withPayload";
import cachios, { CachiosInstance } from "cachios";

/**
 * Factory Function For Creating HTTP Requests Functions Built on top of Cachios and Axios
 * @param arpeggios - Axios Or Cachios Instance
 * @returns - Object Containes HTTP Request Functions Maker Properties
 */
export const Arpeggios = (arpeggios: AxiosInstance | CachiosInstance) => (prefix: string) => {
  const cachiosArpeggios: CachiosInstance = "axiosInstance" in arpeggios ? arpeggios : cachios.create(arpeggios);
  const requestFactory = new RequestFactory(cachiosArpeggios, prefix);
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

const arpeggios = Arpeggios(axios.create());

const call = arpeggios("/api/v1/arpeggios");

call.get<string>();

call.post();

call.getByParam<any>("wd");
