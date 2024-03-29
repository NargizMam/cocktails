import {selectUser} from "../users/usersSlice.ts";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {useEffect} from "react";
import {getCocktailsList} from "./cocktailsThunk.ts";
import {Button, Grid, Typography} from "@mui/material";
import Loading from "../../components/UI/Loading/Loading.tsx";
import CocktailsCard from "./components/CocktailsCard.tsx";
import {selectCocktailsList, selectCocktailsListFetching} from "./cocktailsSlice.ts";
import {NavLink} from "react-router-dom";

const UsersCocktails = () => {
    const user = useAppSelector(selectUser);
    const dispatch = useAppDispatch();
    const cocktailsList = useAppSelector(selectCocktailsList);
    const fetching = useAppSelector(selectCocktailsListFetching);

    if (!user) return;

    useEffect(() => {
        dispatch(getCocktailsList(user.displayName));
    }, [dispatch]);

    return (
        <>
            <Grid container>
                {fetching && <Loading/>}
                {cocktailsList.length === 0 ? (
                    <Grid container direction="column">
                        <Typography>Вы еще не добавляли коктейль</Typography>
                        <Button component={NavLink} to='/new-cocktail'>Добавьте свой рецепт</Button>
                    </Grid>
                ) : (
                    <>
                        <Typography mt={5}>Your cocktails</Typography>
                        <Grid container spacing={2} pt={2}>
                            {cocktailsList.map(cocktail => (
                                <Grid item key={cocktail._id} xs={12} sm={6} md={4}>
                                    <CocktailsCard cocktail={cocktail}/>
                                </Grid>
                            ))}
                        </Grid>
                    </>
                )}
            </Grid>
        </>
    );
};

export default UsersCocktails;