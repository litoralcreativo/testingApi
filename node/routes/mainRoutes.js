const express = require('express');
const { PORT } = require('../app');
const router = express.Router();


/**
 * @openapi
 * /:
 *   get:
 *     tags:
 *       - main
 *     description: main entry point of the aplication
 *     responses:
 *       200:
 *         description: returns json with message and controlers routes
 */
router.get('/', (req, res) => {
  res.json({
    messagge: "Server running",
    routes: {
      users: {
        getAll: `http://localhost:${PORT}/api/users`
      }
    }
  })
})

module.exports = router;