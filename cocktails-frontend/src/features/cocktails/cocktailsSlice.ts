import {CocktailApi, CocktailCard, GlobalError} from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import {createCocktail, deleteCocktail, getCocktailsList, updatePublication} from "./cocktailsThunk.ts";
import { RootState } from "../../app/store.ts";

interface CocktailsState {
    cocktailsList: CocktailCard[];
    fetchLoading: boolean;
    cocktail: CocktailApi | null;
    fetchOneLoading: boolean;
    creating: boolean,
    deleting: boolean;
    isPublishedFetching: boolean;
    successMessage: string | null;
    errorMessage: GlobalError | null;
}
const initialState: CocktailsState = {
    cocktailsList: [],
    fetchLoading: false,
    cocktail: null,
    fetchOneLoading: false,
    creating: false,
    deleting: false,
    isPublishedFetching: false,
    successMessage: null,
    errorMessage: null,
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
                state.errorMessage = null;
                state.successMessage = null;
            })
            .addCase(updatePublication.fulfilled, (state, {payload: success}) => {
                state.isPublishedFetching = false;
                state.successMessage = success;
            })
            .addCase(updatePublication.rejected, (state, {payload: error}) => {
                state.isPublishedFetching = false;
                state.errorMessage = error || null;
                state.successMessage = null;
            })
            .addCase(createCocktail.pending, (state) => {
                state.creating = true;
                state.successMessage = null;
                state.errorMessage = null;
            })
            .addCase(createCocktail.fulfilled, (state, {payload: success}) => {
                state.creating = false;
                state.successMessage = success;
                state.errorMessage = null;
            })
            .addCase(createCocktail.rejected, (state, {payload: error}) => {
                state.creating = false;
                state.errorMessage = error || null;
                state.successMessage = null;
            })
            .addCase(deleteCocktail.pending, (state) => {
                state.creating = true;
                state.successMessage = null;
                state.errorMessage = null;
            })
            .addCase(deleteCocktail.fulfilled, (state, {payload: success}) => {
                state.creating = false;
                state.successMessage = success;
                state.errorMessage = null;
            })
            .addCase(deleteCocktail.rejected, (state, {payload: error}) => {
                state.creating = false;
                state.errorMessage = error || null;
                state.successMessage = null;
            });

    }
});

export const cocktailsReducer = cocktailsSlice.reducer;

export const selectCocktailsList = (state: RootState) => state.cocktails.cocktailsList
export const selectCocktailsListFetching = (state: RootState) => state.cocktails.fetchLoading;

export const selectCocktailsCreating = (state: RootState) => state.cocktails.creating;
export const selectCocktailsIsPublishedFetching = (state: RootState) => state.cocktails.isPublishedFetching;

export const selectCocktailDeleting = (state: RootState) => state.cocktails.deleting;
export const selectSuccessMessage = (state: RootState) => state.cocktails.successMessage;
export const selectErrorMessage = (state: RootState) => state.cocktails.errorMessage;
