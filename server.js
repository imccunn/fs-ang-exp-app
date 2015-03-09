'use strict';

var express = require('express');
var mongoose = require('mongoose');
var compositionsRoutes = require('./routes/composition-routes');

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/compositionapp_dev');

var app = express();
app.use(express.static(__dirname + '/build'));

var mainRouter = express.Router();

compositionsRoutes(mainRouter);

app.use('/api/v1', mainRouter);

app.listen(process.env.PORT || 3333, function() {
  console.log('Server listening on port ' + (process.env.PORT || 3333));
});
