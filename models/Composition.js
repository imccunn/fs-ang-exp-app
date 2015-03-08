'use strict';

var mongoose = require('mongoose');

var compositionSchema = new mongoose.Schema({
  
  title: String,
  subtitle: String,
  opusNumber: Number,
  yearWritten: Number,
  composer: String,
  duration: Number,
  publisher: String,
  copyright: String,
  description: String
});

module.exports = mongoose.model('Composition', compositionSchema);
