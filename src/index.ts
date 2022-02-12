import { ArpeggiosStatic } from "./arpeggios/static";

export { ArpeggiosInstance } from "./arpeggios/instance";
export { ServiceMethods } from "./types/arpeggios";
export { InstanceConfig, ArpeggiosStatic } from "./arpeggios/static";
export { ArpeggiosService, ServiceConfig } from "./arpeggios/service";

export const arpeggios = new ArpeggiosStatic();

export default arpeggios;
