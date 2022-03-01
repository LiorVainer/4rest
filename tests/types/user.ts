export interface User {
  name: string;
  email: string;
}

export interface UserWithId extends User {
  _id: number;
}
