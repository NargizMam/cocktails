import express from "express";
import auth, {RequestWithUser} from "../middleware/auth";
import {imagesUpload} from "../multer";
import {CocktailMutation, Ingredient} from "../types";
import Cocktail from "../models/Cocktail";

const cocktailsRouter = express.Router();

cocktailsRouter.post('/', auth, imagesUpload.single('image'), async (req: RequestWithUser, res, next) => {
    const user = req.user;
    try {
        if (!user?._id) return;

        const cocktailsData: CocktailMutation = {
            user: user._id.toString(),
            title: req.body.title,
            image: req.file ? req.file.filename : null,
            recipe: req.body.recipe,
            ingredients: req.body.ingredients,
        };
        const cocktail = new Cocktail(cocktailsData);
        await cocktail.save();
        return res.send('Cocktail was created!');
    } catch (e) {
        next(e);
    }
});


export default cocktailsRouter;
