import { AxiosResponse } from "axios";

export type ResponseHandleFunction = (value: AxiosResponse<any>) => any;

export const defaultResponseHandleFunction: ResponseHandleFunction = (
  response: AxiosResponse<any>
) => {
  return response;
};
