import { ProductManager, Product } from './ProductManager';
import express from 'express'

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

const manager = new ProductManager('database.txt');

app.get('/product-management/products/:id', async (req, res) => {
    const id: number = +req.params.id;
    const products = await manager.GetProductById(id);
    res.json(products);
})

app.get('/product-management/products', async (req, res) => {
    const products = await manager.GetProducts();
    res.json(products);
})

app.post('/product-management/products', async (req, res) => {
    const product: Product = req.body;
    const response = await manager.AddProduct(product)
    res.send(response)
})

app.delete('/product-management/products/:id', async (req, res) => {
    const id: number = +req.params.id;
    const response = await manager.DeleteProduct(id)
    res.send(response)
})


app.listen(8080, () => console.log('Server running at port 8080'))
