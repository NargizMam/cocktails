import React from 'react';
import {Card, CardActionArea, CardContent, CardMedia, IconButton, Typography} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {NavLink} from "react-router-dom";
import {CocktailCard} from '../../../types';
import {apiURL} from "../../../constants.ts";

interface Props {
    cocktail: CocktailCard;
}
const CocktailsCard: React.FC<Props> = ({ cocktail }) => {
    let cardImage;

    if (cocktail.image) {
        cardImage = apiURL + '/images/' + cocktail.image;
    }
    return (
        <Card sx={{width: '80%', m: 2, p: 2, alignItems: 'center', textDecoration: 'none', borderRadius: 2}}>
            <CardActionArea component={NavLink} to={'/cocktails/' + cocktail._id}
                            sx={{ borderRadius: 2}}
            >
            <CardMedia
                sx={{width:'95%', height: 175, borderRadius: 1}}
                image={cardImage}
                title={cocktail.title}/>
            <CardContent>
                <Typography variant="h5">{cocktail.title}</Typography>
            </CardContent>
                <IconButton style={{ position: 'absolute', bottom: 0, right: 0, margin: '16px' }}>
                    <ArrowForwardIcon/>
                </IconButton>
            </CardActionArea>
        </Card>
    );
};

export default CocktailsCard;
