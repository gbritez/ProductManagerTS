import express from 'express'
import { ProductsViewController } from '../controllers/view-controllers/products.view-controller'
import { CartsViewController } from '../controllers/view-controllers/carts.view-controller';
import { LoginViewController } from '../controllers/view-controllers/login.view-controller';

const viewsRouter = express.Router();

const productViewController = new ProductsViewController();
const cartViewController = new CartsViewController();
const loginViewController = new LoginViewController();

const isLoggedIn = (req, res, next) => {
    if (req.session.user) {
        return res.redirect('/');
    }
    next();
};

const hasActiveSession = (req, res, next) => {
    if (!req.session.passport) {
        return res.redirect('/login')
    }
    next()
}
viewsRouter.get('/login', isLoggedIn, loginViewController.Login)
viewsRouter.get('/register', isLoggedIn, loginViewController.Register)
viewsRouter.get("/error", (req, res) => { res.render("error", { layout: 'loginLayout.handlebars' }) });


viewsRouter.get('/', hasActiveSession, productViewController.GetAll)
viewsRouter.get('/products/:pid', hasActiveSession, productViewController.GetById)
viewsRouter.get('/realTimeProducts', hasActiveSession, productViewController.GetRealTimeProducts)
viewsRouter.get('/cart/:cid', hasActiveSession, cartViewController.Get)
viewsRouter.get('/chat', hasActiveSession, (req, res) => {
    res.render("chat");
})


export = viewsRouter