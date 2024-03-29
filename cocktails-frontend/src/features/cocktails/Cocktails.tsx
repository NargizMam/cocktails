import {useEffect} from "react";
import {Grid, Typography} from "@mui/material";
import CocktailsCard from "./components/CocktailsCard.tsx";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {selectCocktailsList, selectCocktailsListFetching} from "./cocktailsSlice.ts";
import {getCocktailsList} from "./cocktailsThunk.ts";
import Loading from "../../components/UI/Loading/Loading.tsx";

const Cocktails = () => {
    const dispatch = useAppDispatch();
    const cocktailsList = useAppSelector(selectCocktailsList);
    const fetching = useAppSelector(selectCocktailsListFetching);

    useEffect(() => {
        dispatch(getCocktailsList());
    }, [dispatch]);

    return (
        <Grid container >
            <Typography mt={5}>All cocktails</Typography>
            {fetching ? <Loading/>:
                (<Grid container spacing={2} pt={2}>
                {cocktailsList.map(cocktail => (
                    <Grid item key={cocktail._id} xs={12} sm={6} md={4}>
                        <CocktailsCard cocktail={cocktail} />
                    </Grid>
                ))}
            </Grid>)}
        </Grid>
    );
};

export default Cocktails;