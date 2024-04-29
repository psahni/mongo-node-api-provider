import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import * as filestack from 'filestack-js';
import mongodb from 'mongodb';
import { FILE_STACK_API_KEY, DB_CONNECTION_ADDRESS } from './src/constants.js';

import * as formidable from 'formidable';
const app = express();
const port = 9000;
const { MongoClient, ObjectID } = mongodb;
//--------------------------------------------------------------------------

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


const connectionAddr = DB_CONNECTION_ADDRESS;
const client = filestack.init(FILE_STACK_API_KEY);

let dbConnection;

//--------------------------------------------------------------------------

const connectToDb = () => {
  console.log('connectToDb()');
  MongoClient.connect(connectionAddr, { useUnifiedTopology: true },(err, client) => {
      if (err) return console.error(err);
      console.log('Connected to Database');
      dbConnection = client.db('mongo-node-api');
  });
};

app.listen(port , function() {
  console.log('listening on: ', port)
  connectToDb();
});


app.get('/', function(req, res) {
  console.log('[server.js] /', dbConnection);
  res.sendFile(__dirname + '/index.html');
});

app.get('/profiles', function (req, res) {
  const profiles = dbConnection.collection('profiles');
  profiles.find().toArray().then(results => {
    res.end(JSON.stringify(results));
  }).catch(error => console.error(error));
});

app.get('/profiles/new', function (req, res) {});

app.post('/profiles', function(req, res) {
  const form = new formidable.IncomingForm();
  const profiles = dbConnection.collection('profiles');

  form.parse(req, (_, fields, files) => {
   console.log('Fields', fields);
   console.log('Received:', files['file']);
   profiles.insertOne(fields).then(result => {
     res.end(JSON.stringify(fields));
   }).catch(error => console.error(error));

   /*
   // The response is not correct, so file uploading is done at the client side.
   client.upload(files['file'].path).then(
    function(result){
      console.log(result);
    },
    function(error){
      console.log(error);
    }
    ); */
 });
});

app.get('/profiles/:id', function(req, res) {
  console.log('Get()');
  const profiles = dbConnection.collection('profiles');
  profiles.findOne({ "_id": ObjectID(req.params.id) }).then((result) => {
    console.log(result);
    res.send(JSON.stringify(result));
  });
});

app.delete('/profiles/:id', function(req, res) {
  console.log('-->', req.params);
  const profiles = dbConnection.collection('profiles');
  profiles.deleteOne({ "_id": ObjectId(req.params.id) }).then(result => {
    res.send(req.params.id);
  });
});

/*
    LOGIN | AUTHENTICATION
*/
 app.post('/login', function(req, res) {
   const loginCollection = dbConnection.collection('login_information');
   console.log(req.body);
   loginCollection.insertOne({ netID: req.body.netID }).then(result => {
     res.end(JSON.stringify({ message: 'Logged In Successfylly!', status: 200 }));
   }).catch(error => console.error(error));
});
