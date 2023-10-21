import express from 'express'
import { ProductsViewController } from '../controllers/view-controllers/products.view-controller'

const viewsRouter = express.Router();

const productViewController = new ProductsViewController();

viewsRouter.get('/', productViewController.GetAll)
viewsRouter.get('/realTimeProducts', productViewController.GetRealTimeProducts)
viewsRouter.get('/chat', (req, res) => {
    res.render("chat");
})


export = viewsRouter