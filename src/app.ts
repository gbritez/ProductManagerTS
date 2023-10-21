import express from 'express'
import swaggerUi from 'swagger-ui-express';
import cors from 'cors'
import { engine } from 'express-handlebars'
import { Server } from 'socket.io';

import swaggerSpec from './swagger';
import './dbConfig'

import productsRouter from './routes/products.route';
import cartsRouter from './routes/carts.route'
import viewsRouter from './routes/views.route';
import { ProductsService } from './services/products.service';
import { ProductsDaoService } from './services/products.dao.service';
import { ChatDaoService } from './services/chat.dao.service';

const app = express();
const httpServer = app.listen(8080)

app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(cors())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(express.static(__dirname + '/public'))

//Routes
app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)
app.use('/', viewsRouter)

//handlebars
app.engine('handlebars', engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')


//server
const socketServer = new Server(httpServer);

socketServer.on('connection', async socket => {
    let message = {}
    //const productsService = new ProductsService()
    const productsDaoService = new ProductsDaoService()
    const chatDaoService = new ChatDaoService();
    const products = await productsDaoService.GetProducts()
    socket.emit("realTimeProducts", { products, undefined })

    socket.on("Insert", async (data) => {
        message = { title: 'Success', icon: 'success', text: 'Product added successfully', timer: 1000 }
        try {
            await productsDaoService.AddProduct(data)
        }
        catch (error) {
            message = { title: 'Error', icon: 'error', text: error.message }
        }
        const products = await productsDaoService.GetProducts()
        socket.emit("realTimeProducts", { products: products, message: message, timer: 1000 })
    })
    socket.on("Delete", async (pid) => {
        message = { title: 'Success', icon: 'success', text: 'Product deleted successfully', timer: 1000 }
        try {
            await productsDaoService.DeleteProduct(pid)
        }
        catch (error) {
            message = { title: 'Error', icon: 'error', text: error.message }
        }
        const products = await productsDaoService.GetProducts()
        socket.emit("realTimeProducts", { products: products, message: message, timer: 1000 })
    })
    socket.on("newMessage", async (data) => {
        chatDaoService.CreateMessage(data);
        const messages = await chatDaoService.GetMessages();
        socket.broadcast.emit("messages", messages);
    })
})
