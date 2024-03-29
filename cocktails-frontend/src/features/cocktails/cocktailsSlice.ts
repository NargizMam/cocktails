import {CocktailApi, CocktailCard, GlobalError} from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import {createCocktail, deleteCocktail, getCocktailsList, updatePublication} from "./cocktailsThunk.ts";
import { RootState } from "../../app/store.ts";

interface CocktailsState {
    cocktailsList: CocktailCard[];
    fetchLoading: boolean;
    fetchListError: GlobalError | null;
    cocktail: CocktailApi | null;
    fetchOneLoading: boolean;
    fetchOneError: GlobalError | null;
    creating: boolean,
    createMessage: string | null;
    createError: GlobalError | null;
    deleting: boolean;
    deleteError: GlobalError | null;
    deleteMessage: string | null;
    isPublishedFetching: boolean;
    isPublishedMessage: string | null;
    isPublishedError: GlobalError | null;
}
const initialState: CocktailsState = {
    cocktailsList: [],
    fetchLoading: false,
    fetchListError: null,
    cocktail: null,
    fetchOneLoading: false,
    fetchOneError: null,
    creating: false,
    createMessage: null,
    createError: null,
    deleting: false,
    deleteError: null,
    deleteMessage: null,
    isPublishedFetching: false,
    isPublishedMessage: null,
    isPublishedError: null,
}
const cocktailsSlice = createSlice({
    name: 'cocktails',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCocktailsList.pending, (state) => {
                state.fetchLoading = true;
            })
            .addCase(getCocktailsList.fulfilled, (state, {payload: cocktails}) => {
                state.fetchLoading = false;
                state.cocktailsList = cocktails;
            })
            .addCase(getCocktailsList.rejected, (state) => {
                state.fetchLoading = false;
            })
            .addCase(updatePublication.pending, (state) => {
                state.isPublishedFetching = true;
                state.isPublishedError = null;
                state.isPublishedMessage = null;
            })
            .addCase(updatePublication.fulfilled, (state, {payload: success}) => {
                state.isPublishedFetching = false;
                state.isPublishedMessage = success;
            })
            .addCase(updatePublication.rejected, (state, {payload: error}) => {
                state.isPublishedFetching = false;
                state.isPublishedError = error || null;
            })
            .addCase(createCocktail.pending, (state) => {
                state.creating = true;
                state.createMessage = null;
                state.createError = null;

            })
            .addCase(createCocktail.fulfilled, (state, {payload: success}) => {
                state.creating = false;
                state.createMessage = success;
            })
            .addCase(createCocktail.rejected, (state, {payload: error}) => {
                state.creating = false;
                state.createError = error || null;
                state.createMessage = null;
            })
            .addCase(deleteCocktail.pending, (state) => {
                state.creating = true;
                state.deleteMessage = null;
                state.deleteError = null;
            })
            .addCase(deleteCocktail.fulfilled, (state, {payload: success}) => {
                state.creating = false;
                state.deleteMessage = success;
            })
            .addCase(deleteCocktail.rejected, (state, {payload: error}) => {
                state.creating = false;
                state.deleteError = error || null;
                state.deleteMessage = null;
            });

    }
});

export const cocktailsReducer = cocktailsSlice.reducer;

export const selectCocktailsList = (state: RootState) => state.cocktails.cocktailsList
export const selectCocktailsFetching = (state: RootState) => state.cocktails.fetchLoading;

export const selectCocktailsCreating = (state: RootState) => state.cocktails.creating;
export const selectCocktailCreateSuccess = (state: RootState) => state.cocktails.createMessage;
export const selectCocktailCreateError = (state: RootState) => state.cocktails.createError;

export const selectCocktailsIsPublishedFetching = (state: RootState) => state.cocktails.isPublishedFetching;
export const selectCocktailIsPublishedSuccess = (state: RootState) => state.cocktails.isPublishedMessage;
export const selectCocktailIsPublishedError = (state: RootState) => state.cocktails.isPublishedError;

export const selectCocktailDeleting = (state: RootState) => state.cocktails.deleting;
export const selectCocktailDeleteSuccess = (state: RootState) => state.cocktails.deleteMessage;
export const selectCocktailDeleteError = (state: RootState) => state.cocktails.deleteError;
