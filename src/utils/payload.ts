export type Key = string;

export const payloadBuilder = <T = any>(data: T, key?: Key) =>
  key
    ? {
        [key]: data,
      }
    : data;
