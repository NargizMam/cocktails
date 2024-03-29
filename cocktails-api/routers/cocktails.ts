import express from "express";
import auth, {RequestWithUser} from "../middleware/auth";
import {imagesUpload} from "../multer";
import {CocktailForList, CocktailMutation} from "../types";
import Cocktail from "../models/Cocktail";
import client from "../middleware/client";
import permit from "../middleware/permit";

const cocktailsRouter = express.Router();

cocktailsRouter.get('/', client, async (req: RequestWithUser, res, next) => {
    const user = req.user;
    const userName = req.query.users;
    let cocktailsList: CocktailForList[] = [];
    try {
        if (user?.role === 'admin') {
            cocktailsList = await Cocktail.find().select('-recipe -ingredients');
        }
        if(userName){
          cocktailsList = await Cocktail.find({user: user?._id.toString()}).select('-recipe -ingredients');
        }else{
            cocktailsList = await Cocktail.find({isPublished: true});
        }
        return res.send(cocktailsList);
    } catch (e) {
        next(e);
    }
});
cocktailsRouter.get('/:id', async (req, res, next) => {
    try {
        const selectCocktail = await Cocktail.findById(req.params.id);

        if (!selectCocktail) {
            return res.status(404).send({ error: 'Коктейл не найден!' });
        }
        return res.send(selectCocktail);
    } catch (e) {
        next(e);
    }
});
cocktailsRouter.post('/', auth, imagesUpload.single('image'), async (req: RequestWithUser, res, next) => {
    const user = req.user;
    try {
        if (!user?._id) return;
        const ingredients = req.body.ingredients || [];
        const cocktailsData: CocktailMutation = {
            user: user._id.toString(),
            title: req.body.title,
            image: req.file ? req.file.filename : null,
            recipe: req.body.recipe,
            ingredients: ingredients,
        };
        const cocktail = new Cocktail(cocktailsData);
        await cocktail.save();
        return res.send('Ваш коктейль находится на рассмотрении модератора!');
    } catch (e) {
        next(e);
    }
});
cocktailsRouter.patch('/:id/togglePublished',auth, permit('admin'), async (req, res, next) => {
    try {
        const cocktailsId = req.params.id;

        Cocktail.findById(cocktailsId).then((cocktail) => {
            if (!cocktail) {
                throw new Error('Данный коктейль не найден!');
            }
            cocktail.isPublished = !cocktail.isPublished;

            cocktail.save();
        });
        return res.send('Коктейль успешно опубликован!');
    } catch (e) {
        next(e);
    }
});
cocktailsRouter.delete('/:id', auth, permit('admin'), async (req: RequestWithUser, res, next) => {
    const id = req.params.id;
    const user = req.user!;

    try {
        let deletedAlbums;
        deletedAlbums = await Cocktail.findByIdAndDelete(id);

        if (!deletedAlbums) {
            return res.send('Коктейль, возможно, был удален!');
        }
        return res.send('Коктейль был успешно удален!');
    } catch (e) {
        next(e);
    }
});

export default cocktailsRouter;
