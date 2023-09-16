import { ProductManager, Product } from '../ProductManager';
import express from 'express'

const router = express.Router()
const manager = new ProductManager('./database.txt');

router.get('/:pid', async (req, res) => {
    const id: number = +req.params.pid;
    try {
        const response = await manager.GetProductById(id);
        res.status(200).json({ response, status: 'success' });
    }
    catch (error) {
        res.status(500).json({ error: error.message, status: 'error' });
    }
})

router.get('/', async (req, res) => {
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

router.post('/', async (req, res) => {
    const product: Product = req.body;
    try {
        const response = await manager.AddProduct(product)
        res.status(201).json({ response, status: 'success' })
    }
    catch (error) {
        res.status(500).json({ error: error.message, status: 'error' })
    }
})

router.delete('/:pid', async (req, res) => {
    const id: number = +req.params.pid;
    try {
        const response = await manager.DeleteProduct(id)
        res.status(200).json({ status: 'success' });
    }
    catch (error) {
        res.status(500).json({ error: error.message, status: 'error' });
    }
})

router.put('/', async (req, res) => {
    const product: Product = req.body;
    try {
        const response = await manager.UpdateProduct(product)
        res.status(200).json({ response, status: 'success' })
    }
    catch (error) {
        res.status(500).json({ error: error.message, status: 'error' });
    }
})

export = router;