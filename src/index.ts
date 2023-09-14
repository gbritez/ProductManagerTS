import { ProductManager, Product } from './ProductManager';
import express from 'express'

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

const manager = new ProductManager('database.txt');

app.get('/products/:pid', async (req, res) => {
    const id: number = +req.params.pid;
    try {
        const response = await manager.GetProductById(id);
        res.status(200).json({ response, status: 'success' });
    }
    catch (error) {
        res.status(500).json({ error: error.message, status: 'error' });
    }
})

app.get('/products', async (req, res) => {
    const { limit } = req.query;
    try {
        let response = await manager.GetProducts();
        if (limit) {
            response = response.slice(0, limit)
        }
        res.status(200).json({ response, status: 'success' });
    }
    catch (error) {
        res.status(500).json({ error: error.message, status: 'success' });
    }
})

app.post('/products', async (req, res) => {
    const product: Product = req.body;
    try {
        const response = await manager.AddProduct(product)
        res.status(200).json({ response, status: 'success' })
    }
    catch (error) {
        res.status(500).json({ error: error.message, status: 'error' })
    }
})

app.delete('/products/:pid', async (req, res) => {
    const id: number = +req.params.pid;
    try {
        const response = await manager.DeleteProduct(id)
        res.status(201).json({ status: 'success' });
    }
    catch (error) {
        res.status(500).json({ error: error.message, status: 'error' });
    }
})

app.put('/products/', async (req, res) => {
    const product: Product = req.body;
    try {
        const response = await manager.UpdateProduct(product)
        res.status(200).json({ response, status: 'success' })
    }
    catch (error) {
        res.status(500).json({ error: error.message, status: 'error' });
    }
})

app.listen(8080, () => console.log('Server running at port 8080'))
