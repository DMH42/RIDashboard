import express from 'express';
import path from 'path';

// Mongoose for database models and access.
import mongoose from 'mongoose';
var cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
const API_PORT = 3001;
const app = express();
app.use(cors());
const router = express.Router();
const researchers = require('./routes/researchers');
const departments = require('./routes/departments');
import elsevier from './elsevierFunctions'
import dimensions from './dimensionsFunctions'
import altmetic from './altmetricFunctions'



// this is our MongoDB database
//NEED TO MOVE THIS INTO AN ENVIRONMENT VARIABLE
const dbRoute =
  'mongodb+srv://RIDashboard:RushRheesLibrary2019@ridashboard-cg1kq.mongodb.net/test?retryWrites=true&w=majority';

// connects our back end code with the database
mongoose.connect(dbRoute, { useNewUrlParser: true });

let db = mongoose.connection;

db.once('open', () => {console.log('connected to the database')
dimensions.bootProcess();
});

// checks if connection with the database is successful
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

app.use('/api/researchers', researchers);
app.use('/api/departments', departments);


// elsevier.bootProcess();

// Catch all function, if route is not in form /api/ then
// this function return the index page and allows the client to
// handle the routing.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/core/index.html'));
});

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));
