import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import path from 'path';
import productRoutes from './src/routes/product.js';
const app = express();
const port = 9000;
//--------------------------------------------------------------------------

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


const __dirname = path.resolve(path.dirname(''));
let dbConnection;

//--------------------------------------------------------------------------

const connectToDb = async  () => {
  console.log('connectToDb()');
  dbConnection = await mongoose.connect('mongodb://127.0.0.1:27017/e_commerce_db');
  return dbConnection;
};

//--------------------------------------------------------------------------

app.listen(port , function() {
  console.log('listening on: ', port)
  connectToDb();
});

//--------------------------------------------------------------------------

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.use('/v1/api/products', productRoutes)