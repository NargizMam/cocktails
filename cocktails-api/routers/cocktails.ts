import express from "express";
import auth, {RequestWithUser} from "../middleware/auth";
import {imagesUpload} from "../multer";
import {CocktailForList, CocktailMutation} from "../types";
import Cocktail from "../models/Cocktail";
import client from "../middleware/client";

const cocktailsRouter = express.Router();

cocktailsRouter.get('/', client, async (req: RequestWithUser, res, next) => {
    const user = req.user;
    console.log(user, 'user');

    let cocktailsList: CocktailForList[] = [];
    const hhh = await  Cocktail.find();
    console.log(hhh, 0)
    try {
        cocktailsList = await Cocktail.find({isPublished: true}, 'title user image isPublished');
        console.log(cocktailsList, 1)

        if (user) {
            cocktailsList = await Cocktail.find({$or: [{isPublished: true}, {user: user._id.toString(), isPublished: false}]}, 'title user image isPublished');
            console.log(cocktailsList, 2)

            if (user.role === 'admin') {
                cocktailsList = await Cocktail.find().select('-recipe -ingredients');
                console.log(cocktailsList, 3)
            }
        }
        console.log(cocktailsList, 4);
        return res.send(cocktailsList);
    } catch
        (e) {
        next(e);
    }
});
cocktailsRouter.post('/', auth, imagesUpload.single('image'), async (req: RequestWithUser, res, next) => {
    const user = req.user;
    try {
        if (!user?._id) return;
        const ingredients = Array.isArray(req.body.ingredients) ? req.body.ingredients : [];

        const cocktailsData: CocktailMutation = {
            user: user._id.toString(),
            title: req.body.title,
            image: req.file ? req.file.filename : null,
            recipe: req.body.recipe,
            ingredients: ingredients,
        };
        const cocktail = new Cocktail(cocktailsData);
        await cocktail.save();
        return res.send('Cocktail was created!');
    } catch (e) {
        next(e);
    }
});


export default cocktailsRouter;
