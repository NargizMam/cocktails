import React from 'react';
import {Grid, IconButton, TextField} from '@mui/material';

interface Props {
    ingredient: {
        title: string;
        amount: string;
    };
    onChange: (value: string, field: 'title' | 'amount') => void;
    onRemove: () => void;
}

const IngredientForm: React.FC<Props> = ({ ingredient, onChange, onRemove }) => {
    return (
        <Grid container spacing={2} alignItems="center" >
            <Grid item xs={6}>
                <TextField
                    fullWidth
                    label="Title"
                    required
                    value={ingredient.title}
                    onChange={(e) => onChange(e.target.value, 'title')}
                />
            </Grid>
            <Grid item xs={4}>
                <TextField
                    fullWidth
                    required
                    label="Amount"
                    value={ingredient.amount}
                    onChange={(e) => onChange(e.target.value, 'amount')}
                />
            </Grid>
            <Grid item xs={2}>
                <IconButton onClick={onRemove}>X</IconButton>
            </Grid>
        </Grid>
    );
};

export default IngredientForm;
