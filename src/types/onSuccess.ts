import { AxiosResponse } from "axios";

export type OnSuccessFunction = (value: AxiosResponse<any>) => any;

export const defaultOnSuccessFunction: OnSuccessFunction = (response: AxiosResponse<any>) => {
  return response;
};
