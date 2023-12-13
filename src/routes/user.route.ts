import { ProductsController } from '../controllers/products.controller';
import express from 'express'
import { UsersController } from '../controllers/users.controller';

export const userRouter = express.Router()
const userController = new UsersController();

userRouter.get("/:uid", userController.GetById)