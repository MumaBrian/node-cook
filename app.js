require('dotenv').config();
require('express-async-errors');
const swaggerDocs = require('./swagger')
const express = require('express');
const app = express();
const fileUpload = require('express-fileupload');
const cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
})
const swaggerUi = require('swagger-ui-express')
const sendEmail=require('../starter/controllers/sendEmail')


// database
const connectDB = require('./db/connect');

//product router
const productRouter=require('./routes/productRoutes')

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(express.static('./public'));
app.use(express.json()); 
app.use(fileUpload({useTempFiles:true})); 

//routes
app.get('/upload', (req, res) => {
  res.send('<h1>File Upload Starter</h1>');
});
app.get('/email', (req, res) => {
  res.send('<h1>Email Project</h1> <a href="/send"> send email</a>')
})
app.use('/send', sendEmail)


app.use('/products',productRouter)
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;
// swaggerDocs(app,port)
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);

    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
    
  } catch (error) {
    console.log(error);
  }
};

start();
