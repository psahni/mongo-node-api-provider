const express = require('express');
const cors = require('cors');
const app = express();
const port = 9000;
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

const mongoClient = require('mongodb').MongoClient;
const connectionAddr = 'mongodb+srv://admin:admin@cluster0-stxeq.mongodb.net/test?retryWrites=true&w=majority';
let dbConnection;


const connectToDb = () => {
    console.log('connectToDb()');
    mongoClient.connect(connectionAddr, { useUnifiedTopology: true },(err, client) => {
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
    console.log('=============>', profiles);
    profiles.find().toArray().then(results => {
        res.end(JSON.stringify(results));
    }).catch(error => console.error(error))
});

app.get('/profiles/new', function (req, res) {

});

app.post('/profiles', function(req, res) {
    const profiles = dbConnection.collection('profiles');
    console.log('Request to create profile:-', req.body);
    profiles.insertOne(req.body).then(result => {
        res.end(JSON.stringify(req.body))
    }).catch(error => console.error(error))
});