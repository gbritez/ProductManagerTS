import { CartsController } from '../controllers/carts.controller';
import express from 'express'

export const cartsRouter = express.Router();

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
 *           type: string
 *     responses:
 *       200:
 *         description: Productos obtenidos exitosamente
 *       404:
 *         description: Carrito no encontrado
 *       500:
 *         description: Error del servidor
 */
cartsRouter.get('/:cid', cartsController.Get)

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
cartsRouter.post('/', cartsController.Create)

/**
 * @swagger
 * /api/carts/{cid}/product/{pid}:
 *   put:
 *     tags:
 *       - Carts
 *     summary: Actualizar producto en un carrito por su ID de carrito y ID de producto
 *     parameters:
 *       - name: cid
 *         in: path
 *         description: ID del carrito
 *         required: true
 *         schema:
 *           type: string
 *       - name: pid
 *         in: path
 *         description: ID del producto
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               quantity:
 *                 type: number 
 *     responses:
 *       200:
 *         description: Producto actualizado en el carrito exitosamente
 *       404:
 *         description: Carrito o producto no encontrado
 *       500:
 *         description: Error del servidor
 */
cartsRouter.put('/:cid/product/:pid', cartsController.UpdateProduct)

/**
 * @swagger
 * /api/carts/{cid}:
 *   put:
 *     tags:
 *       - Carts
 *     summary: Actualizar carrito
 *     parameters:
 *       - name: cid
 *         in: path
 *         description: ID del carrito
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productIds:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Producto actualizado en el carrito exitosamente
 *       404:
 *         description: Carrito o producto no encontrado
 *       500:
 *         description: Error del servidor
 */
cartsRouter.put('/:cid', cartsController.Update)

/**
 * @swagger
 * /api/carts/{cid}/product/{pid}:
 *   delete:
 *     tags:
 *       - Carts
 *     summary: Eliminar un producto de un carrito por su ID de carrito y ID de producto
 *     parameters:
 *       - name: cid
 *         in: path
 *         description: ID del carrito
 *         required: true
 *         schema:
 *           type: string
 *       - name: pid
 *         in: path
 *         description: ID del producto
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Producto eliminado del carrito exitosamente
 *       404:
 *         description: Carrito o producto no encontrado
 *       500:
 *         description: Error del servidor
 */
cartsRouter.delete('/:cid/product/:pid', cartsController.DeleteOne);

/**
 * @swagger
 * /api/carts/{cid}:
 *   delete:
 *     tags:
 *       - Carts
 *     summary: Eliminar todos los productos de un carrito por su ID
 *     parameters:
 *       - name: cid
 *         in: path
 *         description: ID del carrito
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Todos los productos eliminados del carrito exitosamente
 *       404:
 *         description: Carrito no encontrado
 *       500:
 *         description: Error del servidor
 */
cartsRouter.delete('/:cid', cartsController.DeleteAll);


