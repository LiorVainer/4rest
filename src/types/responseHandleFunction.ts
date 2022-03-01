import { AxiosResponse } from "axios";

export type ResponseHandleFunction = (value: AxiosResponse<any>) => any;

export const defaultResponseHandleFunction: ResponseHandleFunction = (
  value: AxiosResponse<any>
) => {
  return value.data;
};
