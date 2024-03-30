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

export interface Ingredient {
  title: string;
  amount: string;
}
export interface CocktailApi {
  _id: string;
  user: string;
  title: string;
  image: string | null;
  recipe: string;
  isPublished: boolean;
  ingredients: Ingredient[];
}

export type CocktailMutation = Omit<CocktailApi, '_id' | 'isPublished'>;
export type CocktailForList = Omit<CocktailApi, 'recipe' | 'ingredients'>;
