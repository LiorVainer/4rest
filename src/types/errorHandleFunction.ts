export type ErrorHandleFunction = (error: any) => any;

export const defaultErrorHandleFunction: ErrorHandleFunction = (error: any) => {
  throw error;
};
