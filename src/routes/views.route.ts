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
viewsRouter.use(['/products/:pid', '/realTimeProducts', '/cart/:cid', '/chat'], isLoggedIn);
viewsRouter.get('/', isLoggedIn, productViewController.GetAll)
viewsRouter.get('/products/:pid', productViewController.GetById)
viewsRouter.get('/realTimeProducts', productViewController.GetRealTimeProducts)
viewsRouter.get('/cart/:cid', cartViewController.Get)
viewsRouter.get('/login', loginViewController.Login)
viewsRouter.get('/register', loginViewController.Register)
viewsRouter.get('/chat', (req, res) => {
    res.render("chat");
})


export = viewsRouter