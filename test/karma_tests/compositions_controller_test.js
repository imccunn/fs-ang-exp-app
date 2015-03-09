'use strict'

require('../../app/js/client');
require('angular-mocks');

describe('compositions controller', function() {
  var $ControllerConstructor;
  var $httpBackend;
  var $scope;
  
  beforeEach(angular.mock.module('compositionsApp'));

  beforeEach(angular.mock.inject(function($rootScope, $controller){
    $scope = $rootScope.$new();
    $ControllerConstructor = $controller;
  }));

  it('should be able to create a controller', function() {
    var compositionsController = $ControllerConstructor('compositionsController', {$scope: $scope});
    expect(typeof compositionsController).toBe('object');
    expect(Array.isArray($scope.compositions)).toBe(true);
  });

  describe('REST Requests', function() {
    beforeEach(angular.mock.inject(function(_$httpBackend_) {
      $httpBackend = _$httpBackend_;
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should have an index function', function() {
      $httpBackend.expectGET('/api/v1/compositions').respond(200, [{title: 'test title'}]);

      var compositionsController = $ControllerConstructor('compositionsController', {$scope: $scope});
      $scope.getAll();
      $httpBackend.flush();
      expect($scope.compositions[0].title).toBe('test title');
    });

    it('should be able to save', function() {
      $httpBackend.expectPOST('/api/v1/compositions').respond(200, {_id: 1, title: 'test title'});

      $ControllerConstructor('compositionsController', {$scope: $scope});
      $scope.create({title: 'test title', subtitle: 'test subtitle', composer: 'Bob Smith'});
      $httpBackend.flush();

      expect($scope.compositions[0]._id).toBe(1);
    });

    it('should be able to delete a composition', function() {
      $httpBackend.expectDELETE('/api/v1/compositions/1').respond(200);

      $ControllerConstructor('compositionsController', {$scope: $scope});
      var note = {noteBody: 'test note', _id: 1, editing: true};
      $scope.compositions.push(note);
      $scope.remove(note);
      $httpBackend.flush();

      expect($scope.compositions.length).toBe(0);
    });
  });
});
