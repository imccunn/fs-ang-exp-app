'use strict';

require('angular/angular');

var compositionsApp = angular.module('compositionsApp', []);

require('./compositions/controllers/compositionsController')(compositionsApp);
