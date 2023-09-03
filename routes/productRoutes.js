const express = require('express')
const router = express.Router()

const { createProduct, getAllProducts } = require('../controllers/productController')
const { uploadProductImage } = require('../controllers/uploadsController')

/**
 * @openapi
 * /:
 *   post:
 *     tags:
 *       - product
 *     summary: Create Products
 *     description: Responds if the app is up and running
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *               - image
 *             properties:
 *               email:
 *                 type: string
 *               image:
 *                 type: string
 *               price:
 *                 type: string
 *     responses:
 *       '200':
 *         description: App is up and running
 */
router.route('/').post(createProduct)

/**
 * @openapi
 * /products:
 *   get:
 *     tags:
 *       - products
 *     summary: Get created products
 *     description: Responds if the app is up and running
 *     responses:
 *       '200':
 *         description: App is up and running
 */
router.route('/products').get(getAllProducts)

/**
 * @openapi
 * /uploads:
 *   post:
 *     tags:
 *       - product
 *     summary: Upload Product Image
 *     description: Uploads a product image
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       '200':
 *         description: Image uploaded successfully
 */
router.route('/uploads').post(uploadProductImage)

module.exports = router;
