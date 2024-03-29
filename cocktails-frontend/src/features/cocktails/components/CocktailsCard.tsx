import React from 'react';
import { Card, CardContent, Grid, IconButton, Typography } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {NavLink} from "react-router-dom";
import { CocktailCard } from '../../../types';
interface Props {
    cocktail: CocktailCard;
}
const CocktailsCard: React.FC<Props> = ({ cocktail }) => {
    return (
        <Card>
            <img src={cocktail.image} alt={cocktail.title} style={{ width: '100%', height: 'auto' }} />
            <CardContent>
                <Typography variant="h5">{cocktail.title}</Typography>
            </CardContent>
            <Grid item>
                <IconButton component={NavLink} to={'/cocktails/' + cocktail._id}>
                    <ArrowForwardIcon/>
                </IconButton>
            </Grid>
        </Card>
    );
};

export default CocktailsCard;
