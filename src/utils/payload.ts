import { Key } from "types/payload";

export const payloadBuilder = <T = any>(data: T, key?: Key) =>
  key
    ? {
        [key]: data,
      }
    : data;
