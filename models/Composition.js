'use strict';

var mongoose = require('mongoose'),
	compositionSchema = new mongoose.Schema({
	  title: String,
	  subtitle: String,
	  opusNumber: String,
	  yearWritten: String,
	  composer: String,
	  duration: String,
	  publisher: String,
	  copyright: String,
	  description: String
	});

module.exports = mongoose.model('Composition', compositionSchema);
