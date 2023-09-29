import { ProductsController } from '../controllers/products.controller';
import express from 'express'

const productsRouter = express.Router()
const productsController = new ProductsController();
/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Operaciones relacionadas con los productos
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     tags:
 *       - Products
 *     summary: Obtiene todos los productos
 *     parameters:
 *       - in: query
 *         name: limit
 *         description: Número máximo de productos a devolver
 *         schema:
 *           type: integer
 *           format: int32
 *     responses:
 *       200:
 *         description: OK
 *       500:
 *         description: Error del servidor
 */
productsRouter.get('/', productsController.GetAll)

/**
 * @swagger
 * /api/products/{pid}:
 *   get:
 *     tags:
 *       - Products
 *     summary: Obtiene un producto por su ID
 *     parameters:
 *       - in: path
 *         name: pid
 *         required: true
 *         description: ID del producto
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 *       404:
 *         description: Producto no encontrado
 */
productsRouter.get('/:pid', productsController.GetById)

/**
 * @swagger
 * /api/products:
 *   post:
 *     tags:
 *       - Products
 *     summary: Crea un nuevo producto
 *     requestBody:
 *       description: Datos del producto a crear
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: number
 *                 description: Identificador único del producto (opcional)
 *               title:
 *                 type: string
 *                 description: Título del producto
 *               description:
 *                 type: string
 *                 description: Descripción del producto
 *               price:
 *                 type: number
 *                 description: Precio del producto
 *               code:
 *                 type: number
 *                 description: Código del producto
 *               stock:
 *                 type: number
 *                 description: Stock del producto
 *               thumbnail:
 *                 type: string
 *                 description: URL de la imagen del producto
 *     responses:
 *       201:
 *         description: Producto creado exitosamente
 *       500:
 *         description: Error del servidor
 */
productsRouter.post('/', productsController.Insert)

/**
 * @swagger
 * /api/products:
 *   put:
 *     tags:
 *       - Products  
 *     summary: Actualiza un producto 
 *     requestBody:
 *       description: Datos del producto a crear
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: number
 *                 description: Identificador único del producto (opcional)
 *               title:
 *                 type: string
 *                 description: Título del producto
 *               description:
 *                 type: string
 *                 description: Descripción del producto
 *               price:
 *                 type: number
 *                 description: Precio del producto
 *               code:
 *                 type: number
 *                 description: Código del producto
 *               stock:
 *                 type: number
 *                 description: Stock del producto
 *               thumbnail:
 *                 type: string
 *                 description: URL de la imagen del producto
 *     responses:
 *       200:
 *         description: Producto actualizado exitosamente
 *       404:
 *         description: Producto no encontrado
 */
productsRouter.put('/', productsController.Update)

/**
 * @swagger
 * /api/products/{pid}:
 *   delete:
 *     tags:
 *       - Products 
 *     summary: Elimina un producto por su ID
 *     parameters:
 *       - in: path
 *         name: pid
 *         required: true
 *         description: ID del producto
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Producto eliminado exitosamente
 *       404:
 *         description: Producto no encontrado
 */
productsRouter.delete('/:pid', productsController.Delete)

export = productsRouter;