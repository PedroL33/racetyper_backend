var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

require('dotenv').config();
var app = express();
const cors = require('cors');
app.use(cors());
app.options('*', cors())

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/user');

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
