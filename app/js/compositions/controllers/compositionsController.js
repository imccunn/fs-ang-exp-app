'use strict';

module.exports = function (app) {
  app.controller('compositionsController', ['$scope', '$http', function ($scope, $http) {
    $scope.compositions = [];

    $scope.getAll = function () {
      $http({
        method: 'GET',
        url: '/api/v1/compositions'
      })
      .success(function (data) {
        $scope.compositions = data;
      })
      .error(function (data) {
        console.log(data);
      });
    };

    $scope.create = function (composition) {
      $http({
        method: 'POST',
        url: '/api/v1/compositions',
        data: composition
      })
      .success(function (data) {
        $scope.compositions.push(data);
      })
      .error(function (data) {
        console.log(data);
      });
    };

    $scope.save = function (composition) {
      $http({
        method: 'PUT',
        url: '/api/v1/compositions/' + composition._id,
        data: composition
      })
      .success(function () {
        composition.editing = false;
      })
      .error(function (data) {
        console.log(data);
      });
    };

    $scope.remove = function (composition) {
      $http({
        method: 'DELETE',
        url: '/api/v1/compositions/' + composition._id
      })
      .success(function () {
        $scope.compositions.splice($scope.compositions.indexOf(composition), 1);
      })
      .error(function (data) {
        console.log(data);
      });
    };

    $scope.editToggle = function (composition) {
      if (composition.editing) {
        composition.title = composition.oTitle;
        composition.subtitle = composition.oSubtitle;
        composition.opusNumber = composition.oOpusNumber;
        composition.yearWritten = composition.oYearWritten;
        composition.composer = composition.oComposer;
        composition.duration = composition.oDuration;
        composition.publisher = composition.oPublisher;
        composition.copyright = composition.oCopyright;
        composition.description = composition.oDescription;
        composition.editing = false;
      } else {
         composition.oTitle = composition.title;
         composition.oSubtitle = composition.subtitle;
         composition.oOpusNumber = composition.opusNumber;
         composition.oYearWritten = composition.yearWritten;
         composition.oComposer = composition.composer;
         composition.oDuration = composition.duration;
         composition.oPublisher = composition.publisher;
         composition.oCopyright = composition.copyright;
         composition.oDescription = composition.description;
         composition.editing = true;
      }
    };
  }]);
};
