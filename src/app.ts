import express from 'express'
require('dotenv').config();
import swaggerUi from 'swagger-ui-express';
import cors from 'cors'
import { engine } from 'express-handlebars'
import { Server } from 'socket.io';
import Handlebars from 'handlebars';
import swaggerSpec from './config/swagger';
import './config/db.config'
import './config/passport.config'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import cookieParser from "cookie-parser";
import passport from "passport"
import { allowInsecurePrototypeAccess } from '@handlebars/allow-prototype-access';


import { cartsRouter, loginRouter, viewsRouter, productsRouter } from './routes/index';

import { ProductsService } from './services/products.dao.service';
import { ChatDaoService } from './services/chat.dao.service';


const app = express();
const httpServer = app.listen(process.env.PORT, () => console.log(`Server listening on port : http://localhost:${process.env.PORT}`))

app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(cors())
app.use(cookieParser("SecretCookie"));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(express.static(__dirname + '/public'))

//mongo
app.use(
    session({
        store: new MongoStore({ mongoUrl: process.env.DB_URI }),
        secret: 'secretSession',
        cookie: { maxAge: 60000 }
    })
)
// passport
app.use(passport.initialize());
app.use(passport.session());

//Routes
app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)
app.use('/api/', loginRouter)
app.use('/', viewsRouter)

//handlebars
app.engine('handlebars', engine({
    handlebars: allowInsecurePrototypeAccess(Handlebars)
}));
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

//server
const socketServer = new Server(httpServer);

socketServer.on('connection', async socket => {
    // let message = {}
    // //const productsService = new ProductsService()
    // const productsDaoService = new ProductsDaoService()
    // const chatDaoService = new ChatDaoService();
    // const products = await productsDaoService.GetProducts()
    // socket.emit("realTimeProducts", { products, undefined })

    // socket.on("Insert", async (data) => {
    //     message = { title: 'Success', icon: 'success', text: 'Product added successfully', timer: 1000 }
    //     try {
    //         await productsDaoService.AddProduct(data)
    //     }
    //     catch (error) {
    //         message = { title: 'Error', icon: 'error', text: error.message }
    //     }
    //     const products = await productsDaoService.GetProducts()
    //     socket.emit("realTimeProducts", { products: products, message: message, timer: 1000 })
    // })
    // socket.on("Delete", async (pid) => {
    //     message = { title: 'Success', icon: 'success', text: 'Product deleted successfully', timer: 1000 }
    //     try {
    //         await productsDaoService.DeleteProduct(pid)
    //     }
    //     catch (error) {
    //         message = { title: 'Error', icon: 'error', text: error.message }
    //     }
    //     const products = await productsDaoService.GetProducts()
    //     socket.emit("realTimeProducts", { products: products, message: message, timer: 1000 })
    // })
    // socket.on("newMessage", async (data) => {
    //     chatDaoService.CreateMessage(data);
    //     const messages = await chatDaoService.GetMessages();
    //     socket.broadcast.emit("messages", messages);
    // })
})
