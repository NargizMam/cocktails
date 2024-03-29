import {LoadingButton} from "@mui/lab";
import {Button, Grid, TextField, Typography} from "@mui/material";
import React, {useState} from "react";
import IngredientForm from "./components/IngredientForm.tsx";
import FileInput from "../../components/UI/FileInput/FileInput.tsx";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {selectCocktailsCreating} from "./cocktailsSlice.ts";
import {useNavigate} from "react-router-dom";
import {createCocktail, getCocktailsList} from "./cocktailsThunk.ts";
import {openErrorMessage, openSuccessMessage} from "../WarningMessage/warningMessageSlice.ts";

const initialState = {
    title: '',
    image: '',
    recipe: '',
    ingredients: [{
        title: '',
        amount: ''
    }]
}


const NewCocktail = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [cocktail, setCocktail] = useState(initialState);
    const creating = useAppSelector(selectCocktailsCreating);
    const handleAddIngredient = () => {
        setCocktail({
            ...cocktail,
            ingredients: [...cocktail.ingredients, { title: '', amount: '' }],
        });
    };
    const handleIngredientChange = (value: string, field: 'title' | 'amount', index: number) => {
        const updatedIngredients = [...cocktail.ingredients];
        updatedIngredients[index][field] = value;
        setCocktail({ ...cocktail, ingredients: updatedIngredients });
    };
    const handleRemoveIngredient = (index: number) => {
        const updatedIngredients = [...cocktail.ingredients];
        updatedIngredients.splice(index, 1);
        setCocktail({ ...cocktail, ingredients: updatedIngredients });
    };

    const changeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCocktail(prevState => {
            return { ...prevState, [name]: value };
        });
    };
    const fieldsError = !cocktail.title || !cocktail.recipe || !cocktail.image || !cocktail.ingredients[0].title || !cocktail.ingredients[0].amount;
    const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, files} = e.target;
        if (files) {
            setCocktail(prevState => ({
                ...prevState, [name]: files[0]
            }));
        }
    };
    const onImageClear = (() => {
        setCocktail(prev => ({
            ...prev,
            image: ''
        }));
    });
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try{
            console.log(cocktail)
            await dispatch(createCocktail(cocktail));
            dispatch(openSuccessMessage());
            dispatch(getCocktailsList());
            navigate('/');
        }catch (e) {
            dispatch(openErrorMessage());
        }

    };

    return (
        <Grid container direction="column" pt={2}>
            <form onSubmit={handleSubmit}>
                <Typography p={2}>Add new cocktail</Typography>
                <TextField
                    label="Cocktails name"
                    value={cocktail.title}
                    name="title"
                    required
                    onChange={changeInput}
                />
                <Grid item xs>
                    <FileInput
                        label="Image"
                        name="image"
                        onChange={fileInputChangeHandler}
                        onClear={onImageClear}
                    />
                </Grid>
                <TextField
                    label="Recipe"
                    multiline
                    name="recipe"
                    required
                    rows={4}
                    value={cocktail.recipe}
                    onChange={changeInput}
                />
                <Grid item xs={12}>
                    <Typography>Ingredients</Typography>
                    {cocktail.ingredients.map((ingredient, index) => (
                        <IngredientForm
                            key={index}
                            ingredient={ingredient}
                            onChange={(value: string, field: 'title' | 'amount') => handleIngredientChange(value, field, index)}
                            onRemove={() => handleRemoveIngredient(index)}
                        />
                    ))}
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained"  onClick={handleAddIngredient}>
                        Add Ingredient
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <LoadingButton
                        loading={creating}
                        disabled={fieldsError}
                        variant="contained"
                        color="primary"
                        type="submit">
                        Create
                    </LoadingButton>
                </Grid>
            </form>
        </Grid>

    );
};

export default NewCocktail;
