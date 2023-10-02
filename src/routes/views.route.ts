import express from 'express'
import { ProductsViewController } from '../controllers/view-controllers/products.view-controller'

const viewsRouter = express.Router();

const productViewController = new ProductsViewController();

viewsRouter.get('/', productViewController.GetAll)

//real time products
viewsRouter.get('/realTimeProducts', productViewController.GetRealTimeProducts)

export = viewsRouter