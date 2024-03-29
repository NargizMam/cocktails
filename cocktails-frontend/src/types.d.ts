export interface User {
    _id: string;
    email: string;
    token: string;
    role: string;
    displayName: string;
    avatar: string;
    googleID?: string;
}
export interface RegisterMutation {
    email: string;
    password: string;
    displayName: string;
    avatar: string ;
}
export interface LoginMutation {
    email: string;
    password: string;
}
export interface RegisterResponse {
    message: string;
    user: User;
}
export interface ValidationError {
    errors: {
        [key: string]: {
            name: string;
            message: string;
        }
    },
    message: string;
    name: string;
    _message: string;
}
export interface GlobalError {
    error: string
}
export interface Ingredient {
    title: string;
    amount: string;
}
export interface CocktailApi {
    _id: string;
    user: string;
    title: string;
    image: string;
    recipe: string;
    isPublished: boolean;
    ingredients: Ingredient[];
}
export type CocktailMutation = Omit<Cocktail, "_id"| "isPublished">
export type CocktailCard = Omit<CocktailApi, "recipe" | "ingredients">

