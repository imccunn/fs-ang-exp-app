'use strict';

var Composition = require('../models/Composition'),
    bodyparser = require('body-parser');

module.exports = function (app) {

  app.use(bodyparser.json());

  app.get('/', function(req, res) {
    res.sendfile('../app/index.html');
  });

  app.get('/compositions', function (req, res) {
    Composition.find({}, function (err, data) {
      if (err) {
        res.status(500).send({'msg': 'Error: Unable to retrieve compositions.'});
        return;
      }
      res.json(data);
    });
  });

  app.post('/compositions', function (req, res) {
    var newComposition = new Composition(req.body);
    newComposition.save(function (err, composition) {
      if (err) {
        res.status(500).send({'msg': 'Error: Unable to save composition data.'});
        return;
      }
      res.json(composition);
    });
  });

  app.put('/compositions/:id', function (req, res) {
    var updatedComposition = req.body;
    delete updatedComposition._id;
    Composition.update({_id: req.params.id}, updatedComposition, function (err) {
      if (err) {
        res.status(500).send({'msg': 'Error: Unable to update composition.'});
        return;
      }
      res.json(req.body);
    });
  });

  app.delete('/compositions/:id', function (req, res) {
    Composition.remove({_id: req.params.id}, function (err) {
      if (err) {
        res.status(500).send({'msg': 'Error: Unable to delete composition data.'});
        return;
      }
      res.json({'msg': 'Successfully removed composition.'});
    });
  });
};
