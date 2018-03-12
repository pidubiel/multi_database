const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb://localhost/multi_database');
mongoose.Promise = global.Promise;

app.use(bodyParser.json());

app.use('/api', require('./routes/api'));

//Error handling middleware
app.use((err,req,res,next) => res.status(422).send({error: err.message}));

app.listen(3000, () => console.log("App listening on port 3000"));