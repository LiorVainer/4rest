export type OnErrorFunction = (error: any) => any;

export const defaultOnErrorFunction: OnErrorFunction = (error: any) => {
  throw error;
};
