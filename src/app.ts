import express from 'express'
import swaggerUi from 'swagger-ui-express';
import cors from 'cors'
import { engine } from 'express-handlebars'

import swaggerSpec from './swagger';
import productsRouter from './routes/products.route';
import cartsRouter from './routes/carts.route'
import viewsRouter from './routes/views.route';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(cors())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//Routes
app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)
app.use('/', viewsRouter)

//handlebars
app.engine('handlebars', engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

app.listen(8080, () => {
    console.log('Server running at port 8080')
})
