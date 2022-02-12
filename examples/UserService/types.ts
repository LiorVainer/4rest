import { ObjectId } from "mongodb";

export interface User {
  name: string;
  fullName: string;
  email: string;
  password: string;
  address: string;
}

export interface UserWithId extends User {
  _id: ObjectId;
}
