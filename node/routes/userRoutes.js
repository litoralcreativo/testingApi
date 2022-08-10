const express = require('express');
const { PORT } = require('../app');
const router = express.Router();
const userController = require('../controllers/userController');

/** 
 * @openapi
 * definitions:
 *    User:
 *       type: object
 *       properties:
 *          firstName:
 *             type: string
 *             example: Julio
 *          lastName:
 *             type: string
 *             example: Iglesias
 *          bday:
 *             type: string
 *             example: "1988-06-13T03:35:35.824Z"
 *          salary:
 *             type: double
 *             example: 85000
 */

/**
 * @openapi
 * /api/users/:
 *   get:
 *     tags:
 *       - users
 *     summary: Get all users
 *     description: Get all users
 *     responses:
 *       200:
 *         description: returns the list of users
 */
router.get('/', userController.getAll)

/**
 * @swagger
 * /api/users/:
 *   post:
 *     tags:
 *       - users
 *     summary: Add new user to the list
 *     description: Creates a single user and add it to the list
 *     consumes:
 *     - "application/json"
 *     produces:
 *     - "application/xml"
 *     - "application/json"
 *     requestBody:
 *       description: Body of the User to be added
 *       content:
 *          application/json:
 *             schema:
 *                $ref: '#/definitions/User'
 *     responses:
 *       405:
 *         description: Invalid input
 */
router.post('/', userController.createOne)

/**
 * @openapi
 * /api/users/{id}:
 *   get:
 *     tags:
 *       - users
 *     summary: Get user by id
 *     description: Get single user by id
 *     parameters:
 *     - name: id
 *       in: path
 *       description: ID of user to return
 *       required: true
 *       schema:
 *          type: integer
 *          format: int32
 *     responses:
 *       200:
 *         description: Returns a single users with specified id
 */
router.get('/:id', userController.getSingle)

/**
 * @openapi
 * /api/users/{id}:
 *   delete:
 *     tags:
 *       - users
 *     summary: Delete a user
 *     description: Delete single user by id
 *     parameters:
 *     - name: id
 *       in: path
 *       description: ID of user to delete
 *       required: true
 *       schema:
 *          type: integer
 *          format: int32
 *     responses:
 *       200:
 *         description: Returns a single users with specified id thath was deleted
 */
router.delete('/:id', userController.removeOne)

/**
 * @openapi
 * /api/users/{id}:
 *   patch:
 *     tags:
 *       - users
 *     summary: Restore a deleted user
 *     description: Restore a single user by id
 *     parameters:
 *     - name: id
 *       in: path
 *       description: ID of user to restore
 *       required: true
 *       schema:
 *          type: integer
 *          format: int32
 *     responses:
 *       200:
 *         description: Returns a single users with specified id thath was restored
 */

router.patch('/:id', userController.restoreOne)

/**
 * @openapi
 * /api/users/verify/{id}:
 *   patch:
 *     tags:
 *       - users
 *     summary: Verify a deleted user
 *     description: Verify a single user by id
 *     parameters:
 *     - name: id
 *       in: path
 *       description: ID of user to verify
 *       required: true
 *       schema:
 *          type: integer
 *          format: int32
 *     responses:
 *       200:
 *         description: Returns a single users with specified id thath was verified
 */
router.patch('/verify/:id', userController.verifyOne)

/**
 * @openapi
 * /api/users/random/{number}:
 *   get:
 *     tags:
 *       - users
 *     summary: Get a random generated users
 *     description: Get random users
 *     parameters:
 *     - name: number
 *       in: path
 *       description: number of users to be generated
 *       required: true
 *       schema:
 *          type: integer
 *          format: int32
 *     responses:
 *       200:
 *         description: returns a random list of users 
 */
router.get('/random/:number', userController.getRandom)

module.exports = router;