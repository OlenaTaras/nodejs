const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

const trainersRouter = require('./routes/trainers');
const groupsRouter = require('./routes/groups');
const clientsRouter = require('./routes/clients');
const clientDataRouter = require('./routes/clientData');


// mongoose.connect('mongodb://localhost:27017/fitnes');
mongoose.connect('mongodb://mongo/fitnes');

//mongoose.connect('mongodb+srv://olena:' + process.env.MONGO_ATLAS_PW + '@cluster0-xejaa.mongodb.net/fitnes');

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    return res.status(200).json({});
  }
  next()
});
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/trainers', trainersRouter);
app.use('/groups', groupsRouter);
app.use('/clients', clientsRouter);
app.use('/clientData', clientDataRouter);



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({error: 'error'});
});

module.exports = app;
