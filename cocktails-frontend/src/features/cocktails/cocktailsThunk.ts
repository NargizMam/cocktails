import {CocktailApi, CocktailMutation, GlobalError} from "../../types";
import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi.ts";
import {isAxiosError} from "axios";

export const createCocktail = createAsyncThunk<string, CocktailMutation, { rejectValue: GlobalError }>(
    'cocktails/create',
    async (cocktailMutation, {rejectWithValue}) => {
        try {
            const formData = new FormData();

            const keys = Object.keys(cocktailMutation);
            keys.forEach(key => {
                const value = cocktailMutation[key];

                if (value !== null) {
                    formData.append(key, value);
                }
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
export const getCocktailsList = createAsyncThunk<CocktailApi[], void, { rejectValue: GlobalError }>(
    'cocktails/fetch',
    async (_, {rejectWithValue}) => {
        try {
            const response = await axiosApi.get<CocktailApi[]>('/cocktails');
            return response.data;
        } catch (e) {
            if (isAxiosError(e) && e.response) {
                return rejectWithValue(e.response.data);
            }
            throw e;
        }

    }
);
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