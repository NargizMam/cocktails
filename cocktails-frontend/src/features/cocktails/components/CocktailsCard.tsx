import React from 'react';
import {Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, IconButton, Typography} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {NavLink, useNavigate} from "react-router-dom";
import LoadingButton from '@mui/lab/LoadingButton/LoadingButton';
import {CocktailCard} from '../../../types';
import {apiURL} from "../../../constants.ts";
import {selectUser} from "../../users/usersSlice.ts";
import {useAppDispatch, useAppSelector} from "../../../app/hooks.ts";
import {selectCocktailDeleting, selectCocktailsIsPublishedFetching} from "../cocktailsSlice.ts";
import {deleteCocktail, getCocktailsList, updatePublication} from "../cocktailsThunk.ts";
import {openErrorMessage, openSuccessMessage} from "../../WarningMessage/warningMessageSlice.ts";

interface Props {
    cocktail: CocktailCard;
}
const CocktailsCard: React.FC<Props> = ({ cocktail }) => {
    const {_id, title, isPublished, image, user } = cocktail;
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const userClient = useAppSelector(selectUser);
    const deleting = useAppSelector(selectCocktailDeleting);
    const updating = useAppSelector(selectCocktailsIsPublishedFetching);

    let publishedAction = null;

    let cardImage;

    if (image) {
        cardImage = apiURL + '/images/' + image;
    }
    const onDeleteCocktail = async () => {
        try {
            await dispatch(deleteCocktail(_id)).unwrap();
            dispatch(openSuccessMessage());
            dispatch(getCocktailsList());
            navigate('/');
        } catch (e) {
            dispatch(openErrorMessage());
        }
    };
    const toPublishedCocktail = async () => {
        try {
            await dispatch(updatePublication(_id)).unwrap();
            dispatch(openSuccessMessage());
            dispatch(getCocktailsList());
        } catch (e) {
            dispatch(openErrorMessage());
        }
    };
    if (isPublished && user) {
        if (userClient?.role === 'admin') {
            publishedAction = (<Grid>
                <LoadingButton loading={deleting} onClick={onDeleteCocktail}>Удалить</LoadingButton>
            </Grid>);
        }
    } else if (!isPublished && user) {
        if (userClient?.role === 'admin') {
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
        } else if (userClient?.role !== 'admin' && userClient?._id === user) {
            publishedAction = <Typography>Не опубликовано</Typography>;
        }
    }
    return (
        <Card sx={{width: '80%', m: 2, p: 2, alignItems: 'center', textDecoration: 'none', borderRadius: 2}}>
            <CardActionArea component={NavLink} to={'/cocktails/' + _id}
                            sx={{ borderRadius: 2}}
            >
            <CardMedia
                component="img"
                sx={{width:'95%', height: 175, borderRadius: 1}}
                image={cardImage}
                title={title}/>
            <CardContent>
                <Typography variant="h5">{title}</Typography>
            </CardContent>
                <IconButton style={{ position: 'absolute', bottom: 0, right: 0, margin: '16px' }}>
                    <ArrowForwardIcon/>
                </IconButton>
            </CardActionArea>
            <CardActions>
                {publishedAction}
            </CardActions>
        </Card>
    );
};

export default CocktailsCard;
