export type CatchFunction = (error: any) => any;

export const defaultCatchFunction: CatchFunction = (error: any) => {
  console.error(error);
};
