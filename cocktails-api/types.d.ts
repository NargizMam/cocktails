import { Model } from 'mongoose';

export interface UserFields {
  email: string;
  password: string;
  token: string;
  role: string;
  displayName: string;
  avatar: string;
  googleID?: string;
}

export interface UserMethods {
  checkPassword(password: string): Promise<boolean>;
  generateToken(): void;
}
export type UserModal = Model<UserFields, {}, UserMethods>;
