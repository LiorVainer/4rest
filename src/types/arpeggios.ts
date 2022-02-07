import { Arpeggios } from "index";
import { Route } from "../types/route";

export type ArpeggiosInstance = ReturnType<typeof Arpeggios>;
export type ArpeggiosMethods = ReturnType<ArpeggiosInstance>;

export interface ArpeggiosConfig {
  prefix?: string;
  routes?: {
    getAll?: Route;
    getByParam?: Route;
    deleteAll?: Route;
    deleteByParam?: Route;
    post?: Route;
    patch?: Route;
    put?: Route;
  };
  instance?: ArpeggiosInstance;
}
