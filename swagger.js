const Express = require('express')
const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
const version = require('../starter/package.json')


const options = {
    swaggerDefinition: {
        info: {
            title: 'File_Upload API Documentation',
            version,
            description: 'API documentation for your Express.js app',
        },
        components: {
            securitySchemas: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat:"JWT",
              },
          },
        },
        security: [
            {
                bearerAuth:[],
            },
        ],
        // basePath: '/', // Base URL for your API
    },
    apis: ['./routes/*.js'], 
};

// const swaggerSpec = swaggerJSDoc(options)

// function swaggerDocs(app, port) {
//     //Swagger page
//     app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
    
//     //Docs in JSON format
//     app.use('/docs.json', (req,res) => {
//         res.setHeader('Content-Type', 'application/json');
//         res.send(swaggerSpec);
//     })

//     console.log(`Docs available at http://localhost:${port}/docs`)
// }

module.exports = swaggerJSDoc(options);
