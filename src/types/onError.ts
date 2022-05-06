import { Metadata } from "./metadata.types";

export type OnErrorFunction = (error: any, metadata?: Metadata) => any;

export const defaultOnErrorFunction: OnErrorFunction = (error: any, _metadata) => {
  throw error;
};
