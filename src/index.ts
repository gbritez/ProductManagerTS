import express from 'express'
import productRouter from './routes/Products'

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
//Routes
app.use('/products', productRouter)


app.listen(8080, () => console.log('Server running at port 8080'))
