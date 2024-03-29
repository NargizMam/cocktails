import {useNavigate, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {useEffect} from "react";
import {deleteCocktail, fetchOneCocktail, getCocktailsList, updatePublication} from "./cocktailsThunk.ts";
import {
    selectCocktailDeleting,
    selectCocktailsIsPublishedFetching,
    selectOneCocktail,
    selectOneCocktailFetching
} from "./cocktailsSlice.ts";
import {CardMedia, Grid, List, ListItem, ListItemIcon, ListItemText, Paper, Typography} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
import {selectUser} from "../users/usersSlice.ts";
import {openErrorMessage, openSuccessMessage} from "../WarningMessage/warningMessageSlice.ts";
import Loading from "../../components/UI/Loading/Loading.tsx";
import {apiURL} from "../../constants.ts";

const CocktailsInfo = () => {
    const {id} = useParams();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const cocktail = useAppSelector(selectOneCocktail);
    const fetchLoading = useAppSelector(selectOneCocktailFetching);
    const userClient = useAppSelector(selectUser);
    const deleting = useAppSelector(selectCocktailDeleting);
    const updating = useAppSelector(selectCocktailsIsPublishedFetching);

    let cocktailsInfo;
    let publishedAction;
    let cardImage;
    if (!id || !userClient) {
        return navigate('/');
    }

    useEffect(() => {
        dispatch(fetchOneCocktail(id));
    }, [dispatch, id]);
    const onDeleteCocktail = async () => {
        try {
            await dispatch(deleteCocktail(id)).unwrap();
            dispatch(openSuccessMessage());
            dispatch(getCocktailsList());
            navigate('/');
        } catch (e) {
            dispatch(openErrorMessage());
        }
    };
    const toPublishedCocktail = async () => {
        try {
            await dispatch(updatePublication(id)).unwrap();
            dispatch(openSuccessMessage());
            dispatch(getCocktailsList());
            navigate('/');
        } catch (e) {
            dispatch(openErrorMessage());
        }

    };

    if (!cocktail) {
        return cocktailsInfo = (<Typography variant='h4'>Не найдено информации о данном коктейле!</Typography>)
    }

    const {image, title, recipe, ingredients, isPublished, user} = cocktail;

    if (isPublished) {
        if (userClient.role === 'admin') {
            publishedAction = (
                <Grid>
                    <LoadingButton variant="contained"
                                   color="warning"
                                   loading={deleting}
                                   onClick={onDeleteCocktail}
                    >Удалить</LoadingButton>
                </Grid>);
        }
    } else if (!isPublished) {
        if (userClient.role === 'admin') {
            publishedAction = (
                <Grid>
                    <LoadingButton sx={{ml: 1}}
                                   variant="contained"
                                   color="warning"
                                   loading={updating}
                                   onClick={toPublishedCocktail}
                    >Опубликовать</LoadingButton>
                </Grid>
            );
        } else if (userClient.role !== 'admin' && userClient._id === user) {
            publishedAction = <Typography>Не опубликовано</Typography>;
        }
    }
    if (image) {
        if (!image.includes('fixtures')) {
            cardImage = apiURL + '/images/' + image;
        }else{
            cardImage = apiURL + '/' + image;
        }
    }
    cocktailsInfo = (
        <Grid container justifyContent="space-between" sx={{margin: 'auto', maxWidth: '800px'}}>
            <Grid item xs={12} md={6}>
                <CardMedia component="img" height="450" image={cardImage} alt={title}/>
            </Grid>
            <Grid item xs={12} md={6} sx={{paddingLeft: 2}}>
                <Typography variant="h5" component="div" gutterBottom>
                    {title}
                </Typography>
                <Typography variant="body1" color="text.secondary" gutterBottom>
                    Ingredients:
                </Typography>
                <List>
                    {ingredients.map((ingredient, index) => (
                        <ListItem key={index}>
                            <ListItemIcon>
                                <Typography>{ingredient.title} : </Typography>
                            </ListItemIcon>
                            <ListItemText primary={ingredient.amount}/>
                        </ListItem>
                    ))}
                </List>
            </Grid>
            <Grid item xs={12} sx={{marginTop: 2}}>
                <Paper>
                    <Typography variant="body1" color="text.secondary" gutterBottom>
                        Recipe:
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                        {recipe}
                    </Typography>
                </Paper>
                {publishedAction}
            </Grid>
        </Grid>
    )


    return (
        <>
            {fetchLoading && <Loading/>}
            {cocktailsInfo}
        </>
    );
};

export default CocktailsInfo;

