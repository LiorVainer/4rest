import { ObjectId } from "mongodb";

export interface User {
  fullName: string;
  email: string;
  password: string;
  address: string;
}

export interface UserWithId extends User {
  _id: ObjectId;
}
