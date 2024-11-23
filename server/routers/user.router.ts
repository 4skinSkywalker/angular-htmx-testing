import { Router } from "express";
import { create, deleteUser, find } from "../controllers/user.controller";
import { body, matchedData, param, validationResult } from "express-validator";
import { IUser } from "../models/user.model";

export const userRouter = Router();

userRouter.get(
    '/list',
    async (req, res) => {
        await new Promise(r => setTimeout(r, 150));
        res.send(find());
    }
);

userRouter.post(
    '/find',
    body("name").isString(),
    async (req, res) => {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            res.send({ errors: result.array() });
            return;
        }
        await new Promise(r => setTimeout(r, 150));
        const data = matchedData(req);
        res.send(find(data));
    }
);

userRouter.post(
    '/create',
    body('id').isInt(),
    body('name').isString(),
    async (req, res) => {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            res.send({ errors: result.array() });
            return;
        }
        await new Promise(r => setTimeout(r, 150));
        const data = matchedData(req) as IUser;
        res.send(create(data));
    }
);

userRouter.delete(
    '/:id',
    param('id').isInt(),
    async (req, res) => {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            res.send({ errors: result.array() });
            return;
        }
        await new Promise(r => setTimeout(r, 150));
        const data = matchedData(req);
        res.send(deleteUser(data.id));
    }
);