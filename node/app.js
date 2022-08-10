const express = require('express');
const cors = require('cors')
const app = express();
const PORT = 3001
module.exports = { PORT }

app.use(express.json())
app.use(cors())

/* Swagger Documentation */
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'MultiFramework-crud',
      version: '1.0.0',
    },
  },
  apis: ['./routes/*.js'], // files containing annotations as above
};
const swaggerSpec = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


const mainRoutes = require('./routes/mainRoutes');
app.use('/', mainRoutes)

const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes)

const productsRoutes = require('./routes/productsRoutes');
app.use('/api/products', productsRoutes)

const brandsRoutes = require('./routes/brandsRoutes');
app.use('/api/brands', brandsRoutes)

app.listen(PORT, () => {
  console.log(`listen on http://localhost:${PORT}`);
  console.log(`swagger: http://localhost:${PORT}/api-docs`);
})
