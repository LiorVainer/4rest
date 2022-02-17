import { AxiosResponse } from "axios";

export type ServiceMethodResponse<T> = Promise<AxiosResponse<T>>;
