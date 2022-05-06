import { AxiosResponse } from "axios";
import { Metadata } from "./metadata.types";
import { ServiceConfig, ServiceFunction } from "./service.types";

export type OnSuccessFunction = (value: AxiosResponse<any>, metadata?: Metadata) => any;
