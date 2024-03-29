import React from 'react';
import {Card, CardActionArea, CardActions, CardContent, CardMedia, IconButton, Typography} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {NavLink} from "react-router-dom";
import {CocktailCard} from '../../../types';
import {apiURL} from "../../../constants.ts";
import {selectUser} from "../../users/usersSlice.ts";
import {useAppSelector} from "../../../app/hooks.ts";

interface Props {
    cocktail: CocktailCard;
}
const CocktailsCard: React.FC<Props> = ({ cocktail }) => {
    const {_id, title, isPublished, image } = cocktail;
    const userClient = useAppSelector(selectUser);

    let publishedAction = null;

    let cardImage;
    if (image) {
        if (!image.includes('fixtures')) {
            cardImage = apiURL + '/images/' + image;
        }else{
            cardImage = apiURL + '/' + image;
        }
    }

     if (!isPublished) {
         if(userClient?.role === 'admin' && userClient?._id === cocktail.user)
            publishedAction = <Typography>Не опубликовано</Typography>;
        }

    return (
        <Card sx={{width: '95%',height: '350px', m: 2, p: 2, alignItems: 'center', textDecoration: 'none', borderRadius: 2}}>
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
                <IconButton style={{ position: 'absolute', bottom: 0, right: 0, margin: '25px' }}>
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
