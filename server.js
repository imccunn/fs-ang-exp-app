'use strict';

var express = require('express'),
	mongoose = require('mongoose'),
	compositionsRoutes = require('./routes/composition-routes'),
	app,
	mainRouter;

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/compositionapp_dev');

app = express();
app.use(express.static(__dirname + '/build'));

mainRouter = express.Router();

compositionsRoutes(mainRouter);

app.use('/api/v1', mainRouter);

app.listen(process.env.PORT || 3333, function () {
  console.log('Server listening on port ' + (process.env.PORT || 3333));
});
