import {CocktailApi, CocktailCard, CocktailMutation, GlobalError, Ingredient} from "../../types";
import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi.ts";
import {isAxiosError} from "axios";

export const createCocktail = createAsyncThunk<string, CocktailMutation, { rejectValue: GlobalError }>(
    'cocktails/create',
    async (cocktailMutation, {rejectWithValue}) => {
        try {
            const formData = new FormData();

            formData.append('title', cocktailMutation.title);
            formData.append('recipe', cocktailMutation.recipe);
            formData.append('image', cocktailMutation.image);
            cocktailMutation.ingredients.forEach((ingredient: Ingredient, index: number) => {
                formData.append(`ingredients[${index}][title]`, ingredient.title);
                formData.append(`ingredients[${index}][amount]`, ingredient.amount);
            });
            const response = await axiosApi.post('/cocktails', formData);
            return response.data;
        } catch (e) {
            if (isAxiosError(e) && e.response) {
                return rejectWithValue(e.response.data);
            }
            throw e;
        }

    }
);
export const updatePublication = createAsyncThunk<string, string, { rejectValue: GlobalError }>(
    '/cocktails/toggle',
    async (id, {rejectWithValue}) => {
        try {
            const response = await axiosApi.patch(`/cocktails/${id}/togglePublished`);
            return response.data;
        } catch (e) {
            if (isAxiosError(e) && e.response) {
                return rejectWithValue(e.response.data);
            }
            throw e;
        }
    }
);
export const getCocktailsList = createAsyncThunk<CocktailCard[], string | undefined, { rejectValue: GlobalError }>(
    'cocktails/fetch',
    async (userName, {rejectWithValue}) => {
        try {
            let response;
            if(userName){
                response = await axiosApi.get<CocktailCard[]>(`/cocktails?users=${userName}`);
                return response.data;
            }
            response = await axiosApi.get<CocktailCard[]>('/cocktails');
            return response.data;
        } catch (e) {
            if (isAxiosError(e) && e.response) {
                return rejectWithValue(e.response.data);
            }
            throw e;
        }

    }
);

export const fetchOneCocktail = createAsyncThunk<CocktailApi, string,{ rejectValue: GlobalError } >(
    'cocktails/fetchOne',
    async (id, {rejectWithValue}) => {
        try{
            const response = await axiosApi.get(`/cocktails/${id}`);
            return  response.data;
        }catch (e) {
            if (isAxiosError(e) && e.response) {
                return rejectWithValue(e.response.data);
            }
            throw e;
        }
    }
)
export const deleteCocktail = createAsyncThunk<string, string, { rejectValue: GlobalError }>(
    'cocktails/delete',
    async (id, {rejectWithValue}) => {
        try {
            const response = await axiosApi.delete(`/cocktails/${id}`);
            return response.data;
        } catch (e) {
            if (isAxiosError(e) && e.response) {
                return rejectWithValue(e.response.data);
            }
            throw e;
        }
    }
);