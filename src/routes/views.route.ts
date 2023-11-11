import express from 'express'
import { ProductsViewController } from '../controllers/view-controllers/products.view-controller'
import { CartsViewController } from '../controllers/view-controllers/carts.view-controller';
import { LoginViewController } from '../controllers/view-controllers/login.view-controller';

const viewsRouter = express.Router();

const productViewController = new ProductsViewController();
const cartViewController = new CartsViewController();
const loginViewController = new LoginViewController();

const isLoggedIn = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }
    next();
};

const hasActiveSession = (req, res, next) => {
    if (req.session.passport) {
        return res.redirect('/')
    }
    next()
}
viewsRouter.get('/login', hasActiveSession, loginViewController.Login)
viewsRouter.get('/register', hasActiveSession, loginViewController.Register)
viewsRouter.get("/error", (req, res) => { res.render("error", { layout: 'loginLayout.handlebars' }) });

viewsRouter.get('/', isLoggedIn, productViewController.GetAll)
viewsRouter.get('/products/:pid', isLoggedIn, productViewController.GetById)
viewsRouter.get('/realTimeProducts', isLoggedIn, productViewController.GetRealTimeProducts)
viewsRouter.get('/cart/:cid', isLoggedIn, cartViewController.Get)
viewsRouter.get('/chat', isLoggedIn, (req, res) => {
    res.render("chat");
})


export = viewsRouter