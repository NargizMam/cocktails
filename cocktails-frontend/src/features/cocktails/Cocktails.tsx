import {Grid} from "@mui/material";
import CocktailsCard from "./components/CocktailsCard.tsx";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {selectCocktailsList} from "./cocktailsSlice.ts";
import {useEffect} from "react";
import {getCocktailsList} from "./cocktailsThunk.ts";

const Cocktails = () => {
    const dispatch = useAppDispatch();
    const cocktailsList = useAppSelector(selectCocktailsList);

    useEffect(() => {
        dispatch(getCocktailsList());
    }, [dispatch]);
    return (
        <>
            <Grid container spacing={2}>
                {cocktailsList.map(cocktail => (
                    <Grid item key={cocktail._id} xs={12} sm={6} md={4}>
                        <CocktailsCard cocktail={cocktail} />
                    </Grid>
                ))}
            </Grid>
        </>
    );
};

export default Cocktails;