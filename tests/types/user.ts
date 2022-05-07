import { z } from "zod";

export interface User {
  name: string;
  email: string;
}

export interface UserWithId extends User {
  _id: number;
}

export const UserSchema = z.object({
  name: z.string(),
  email: z.string().optional(),
});

export const UserWithIdSchema = UserSchema.extend({
  _id: z.number(),
});
