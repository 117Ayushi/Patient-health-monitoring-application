process.on(`uncaughtException`, console.error);

import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import multer from 'multer';
import morgan from 'morgan';
import fs from 'fs';
require('dotenv').config();

import user from './routes/user';
import auth from './routes/auth';
import bloodPressure from './routes/bloodPressure';
import electroCardioGraphy from './routes/electroCardioGraphy';
import temperature from './routes/temperature';
import seizure from './routes/seizure';


let app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use(multer({
  dest: `./upload_files/`
}).fields([{
  name: 'photo',
  maxCount: 1,
}, ]));

app.use('/upload_files',express.static('upload_files'))

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


// Signup
app.use('/api/user', user);

//Login
app.use('/api/auth', auth);

//BloodPressure
app.use('/api/bp', bloodPressure);

//ElectroCardioGraphy
app.use('/api/ecg', electroCardioGraphy);

//Temperature
app.use('/api/temperature', temperature);

//Seizure
app.use('/api/seizure', seizure);




app.listen(process.env.PORT || 5000, () => console.log('Running on localhost:5000'));
