import { CartsController } from '../controllers/carts.controller';
import express from 'express'

const cartsRouter = express.Router();

const cartsController = new CartsController();
/**
 * @swagger
 * tags:
 *   name: Carts
 *   description: Operaciones relacionadas con los carritos
 */
/**
 * @swagger
 * /api/carts/{cid}:
 *   get:
 *     tags:
 *       - Carts
 *     summary: Obtener productos de un carrito por su ID
 *     parameters:
 *       - name: cid
 *         in: path
 *         description: ID del carrito
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Productos obtenidos exitosamente
 *       404:
 *         description: Carrito no encontrado
 *       500:
 *         description: Error del servidor
 */
cartsRouter.get('/:cid', cartsController.GetCartProductsById)

/**
 * @swagger
 * /api/carts/:
 *   post:
 *     tags:
 *       - Carts
 *     summary: Insertar un nuevo carrito
 *     responses:
 *       201:
 *         description: Carrito creado exitosamente
 *       500:
 *         description: Error del servidor
 */
cartsRouter.post('/', cartsController.Insert)

/**
 * @swagger
 * /api/carts/{cid}/product/{pid}:
 *   post:
 *     tags:
 *       - Carts
 *     summary: Actualizar producto en un carrito por su ID de carrito y ID de producto
 *     parameters:
 *       - name: cid
 *         in: path
 *         description: ID del carrito
 *         required: true
 *         schema:
 *           type: number
 *       - name: pid
 *         in: path
 *         description: ID del producto
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Producto actualizado en el carrito exitosamente
 *       404:
 *         description: Carrito o producto no encontrado
 *       500:
 *         description: Error del servidor
 */
cartsRouter.post('/:cid/product/:pid', cartsController.Update)

export = cartsRouter