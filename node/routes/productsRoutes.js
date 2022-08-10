const express = require("express");
const router = express.Router();
const productsController = require('../controllers/productsController');

/** 
 * @openapi
 * definitions:
 *    Product:
 *       type: object
 *       properties:
 *          name:
 *             type: string
 *             example: Arroz
 *          price:
 *             type: number
 *             example: 10.54
 */

/**
 * @openapi
 * /api/products/:
 *   get:
 *     tags:
 *       - products
 *     summary: Get all products
 *     description: Get all products
 *     responses:
 *       200:
 *         description: returns the list of products
 */
router.get('/', productsController.getAll)

/**
 * @swagger
 * /api/products/:
 *   post:
 *     tags:
 *       - products
 *     summary: Add new product to the list
 *     description: Creates a single product and add it to the list
 *     consumes:
 *     - "application/json"
 *     produces:
 *     - "application/xml"
 *     - "application/json"
 *     requestBody:
 *       description: Body of the product to be added
 *       content:
 *          application/json:
 *             schema:
 *                $ref: '#/definitions/Product'
 *     responses:
 *       405:
 *         description: Invalid input
 */
router.post('/', productsController.createOne)

/**
 * @openapi
 * /api/products/{id}:
 *   delete:
 *     tags:
 *       - products
 *     summary: Delete a product
 *     description: Delete single product by id
 *     parameters:
 *     - name: id
 *       in: path
 *       description: ID of product to delete
 *       required: true
 *       schema:
 *          type: integer
 *          format: int32
 *     responses:
 *       200:
 *         description: Returns a single products with specified id thath was deleted
 */
router.delete('/:id', productsController.deleteOne)

/**
 * @openapi
 * /api/products/{id}:
 *   patch:
 *     tags:
 *       - products
 *     summary: Edit a product
 *     description: Edit a product with provided id
 *     parameters:
 *     - name: id
 *       in: path
 *       description: ID of product to restore
 *       required: true
 *       schema:
 *          type: integer
 *          format: int32
 *     responses:
 *       200:
 *         description: Returns a single products with specified id that was modified
 */
router.patch('/:id', productsController.patchOne)


/**
 * @openapi
 * /api/products/restore/{id}:
 *   patch:
 *     tags:
 *       - products
 *     summary: Restore a deleted product
 *     description: Restore a single product by id
 *     parameters:
 *     - name: id
 *       in: path
 *       description: ID of product to restore
 *       required: true
 *       schema:
 *          type: integer
 *          format: int32
 *     responses:
 *       200:
 *         description: Returns a single products with specified id that was restored
 */
router.patch('/restore/:id', productsController.restoreOne)

module.exports = router
