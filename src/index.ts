import { ArpeggiosStatic } from "./arpeggios/static";

export { ArpeggiosInstance as Arpeggios } from "./arpeggios/instance";
export { ArpeggiosConfig } from "./types/arpeggios";
export { ArpeggiosCreateProps, ArpeggiosStatic } from "./arpeggios/static";
export { ArpeggiosService } from "./arpeggios/service";

/**
 * Factory Function For Creating HTTP Requests Functions Built on top of Cachios and Axios
 * @param arpeggios - Axios Or Cachios Instance
 * @returns - Object Containes HTTP Request Functions Maker Properties
 */

export const arpeggios = new ArpeggiosStatic();

export default arpeggios;
