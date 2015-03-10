'use strict'

require('../../app/js/client');
require('angular-mocks');

  var testObj = {
    title: 'test title',
    subtitle: 'test subtitle',
    opusNumber: '22',
    yearWritten: '2013',
    composer: 'John Doe',
    duration: '35',
    publisher: 'John',
    copyright: 'John 2015',
    description: 'A quartet about life.'
  };

describe('compositions controller', function () {
  var $ControllerConstructor,
      $httpBackend,
      $scope;

  beforeEach(angular.mock.module('compositionsApp'));

  beforeEach(angular.mock.inject(function ($rootScope, $controller) {
    $scope = $rootScope.$new();
    $ControllerConstructor = $controller;
  }));

  it('should be able to create a controller', function () {
    var compositionsController = $ControllerConstructor('compositionsController', {$scope: $scope});
    expect(typeof compositionsController).toBe('object');
    expect(Array.isArray($scope.compositions)).toBe(true);
  });

  describe('REST Requests', function () {
    beforeEach(angular.mock.inject(function (_$httpBackend_) {
      $httpBackend = _$httpBackend_;
    }));

    afterEach(function () {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('Call to getAll should send back all compositions', function () {
      $httpBackend.expectGET('/api/v1/compositions').respond(200, [testObj]);

      var compositionsController = $ControllerConstructor('compositionsController', {$scope: $scope});
      $scope.getAll();
      $httpBackend.flush();
      expect($scope.compositions[0].title).toBe('test title');
      expect($scope.compositions[0].subtitle).toBe('test subtitle');
      expect($scope.compositions[0].opusNumber).toBe('22');
      expect($scope.compositions[0].yearWritten).toBe('2013');
      expect($scope.compositions[0].composer).toBe('John Doe');
      expect($scope.compositions[0].duration).toBe('35');
      expect($scope.compositions[0].publisher).toBe('John');
      expect($scope.compositions[0].copyright).toBe('John 2015');
      expect($scope.compositions[0].description).toBe('A quartet about life.');
    });

    it('should be able to create a new note', function () {
      $httpBackend.expectPOST('/api/v1/compositions').respond(200, {_id: 1, title: 'test title', subtitle: 'test subtitle', composer: 'Bob Smith'});

      $ControllerConstructor('compositionsController', {$scope: $scope});
      $scope.create({title: 'test title', subtitle: 'test subtitle', composer: 'Bob Smith'});
      $httpBackend.flush();

      expect($scope.compositions[0]._id).toBe(1);
      expect($scope.compositions[0].title).toBe('test title');
      expect($scope.compositions[0].subtitle).toBe('test subtitle');
      expect($scope.compositions[0].composer).toBe('Bob Smith');
    });

    // Add test for editing an saving functionality here *************

    it('should be able to delete a composition', function () {
      $httpBackend.expectDELETE('/api/v1/compositions/1').respond(200);

      $ControllerConstructor('compositionsController', {$scope: $scope});
      var comp = {noteBody: 'test title', _id: 1, editing: true};
      $scope.compositions.push(comp);
      $scope.remove(comp);
      $httpBackend.flush();

      expect($scope.compositions.length).toBe(0);
    });
  });
});
