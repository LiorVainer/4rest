import { Metadata } from "./metadata.types";

export type OnErrorFunction = <T extends Error>(error: T, metadata?: Metadata) => any;

export const defaultOnErrorFunction: OnErrorFunction = (error: any, _metadata) => {
  throw error;
};
