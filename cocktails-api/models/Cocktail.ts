import mongoose, {Types} from "mongoose";
import User from "./User";
import {Cocktail} from "../types";

const Schema = mongoose.Schema;
const CocktailSchema = new Schema({
    user: {
        type: String,
        required: true,
        ref: 'User',
        validate: {
            validator: async (value: Types.ObjectId) => {
                const user = await User.findById(value);
                return Boolean(user);
            },
            message: 'Пользователь не найден!',
        },
    },
    title: {
        required: true,
        type: String
    },
    image: {
        required: true,
        type: String
    },
    recipe: {
        required: true,
        type: String
    },
    isPublished: {
        required: true,
        default: false,
        type: Boolean
    },
    ingredients: [{
        title: { type: String, required: true },
        amount: { type: String, required: true }
    }]
});

const Cocktail = mongoose.model('Cocktail', CocktailSchema);
export default Cocktail;