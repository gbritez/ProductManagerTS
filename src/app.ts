import express from 'express'
import swaggerUi from 'swagger-ui-express';
import cors from 'cors'
import { engine } from 'express-handlebars'
import { Server } from 'socket.io';

import swaggerSpec from './swagger';

import productsRouter from './routes/products.route';
import cartsRouter from './routes/carts.route'
import viewsRouter from './routes/views.route';
import { ProductsService } from './services/products.service';

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
    const productsService = new ProductsService()
    const products = await productsService.GetProducts()
    socket.emit("realTimeProducts", products)

    socket.on("Insert", async (data) => {
        console.log(data)
        await productsService.AddProduct(data)
        const products = await productsService.GetProducts()
        socket.emit("realTimeProducts", products)
    })
    socket.on("Delete", async (pid) => {
        await productsService.DeleteProduct(pid)
        const products = await productsService.GetProducts()
        socket.emit("realTimeProducts", products)
    })
    console.log('cliente conectado')
})
