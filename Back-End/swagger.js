const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Gestão de Eventos',
      version: '1.0.0',
      description: 'API para gerenciar dados de cadastro de organizadores participantes de Eventos.',
    },
    servers: [
      {
        url: 'http://localhost:8080',
      },
    ],
  },
 
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
