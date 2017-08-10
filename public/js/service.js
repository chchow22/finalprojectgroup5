var app = angular.module('miModule');

app.factory('miFactory', function($http) {
  // Home Page Variables
  var eventsFromDB;
  var photosFromDB;

  var homePhotos = [];
  var homePhotosIndex = 0;
  var randomPhotoIDs = [];
  var likedPhotos = [];

  // List Page Variables
  var likedEvents = [];
  var bucketEvents = [];

  var plannerEvents = [];

  return {
    initialSetupHome: initialSetupHome,
    getHomePhotos: getHomePhotos,
    getMoreHomePhotos: getMoreHomePhotos,

    homeListTransition: homeListTransition,

    getBucketEvents: getBucketEvents,
    getMoreBucketEvents: getMoreBucketEvents,
    getPlannerEvents: getPlannerEvents,
    addPlanner: addPlanner,
    deletePlanner: deletePlanner,
    finishPlanner: finishPlanner,

    getPhotos: getPhotos
  }



  // Home Page Functions
  function initialSetupHome() {

    getPhotos().then(function() {
      randomize(photosFromDB.length);
      for(var i = 1; i <= 9; i++) {
        for (var j = 0; j < photosFromDB.length; j++) {
          if (randomPhotoIDs[i] == photosFromDB[j].id) {
            homePhotos.push(photosFromDB[j]);
          }
        }
      }
      homePhotosIndex = 8;

    });


  }

  function randomize(count) {

    var randomNum = Math.floor(Math.random()*count + 1);
    randomPhotoIDs.push(randomNum);


    while(randomPhotoIDs.length < count) {
      var randomNum = Math.floor(Math.random()*count + 1);
      var repeat = false;
      for(var j = 0; j < randomPhotoIDs.length; j++) {
        if (randomNum == randomPhotoIDs[j]) {
          repeat = true;
        }
      }
      if (!repeat) {
        randomPhotoIDs.push(randomNum);
      }
    }

  }

  function getHomePhotos() {
    return homePhotos;
  }

  function getMoreHomePhotos() {
    for(var i = homePhotosIndex + 1; i <= homePhotosIndex + 6; i++) {
      for (var j = 0; j < photosFromDB.length; j++) {

        if (randomPhotoIDs[i] == photosFromDB[j].id) {
          homePhotos.push(photosFromDB[j]);
        }
      }
    }
    homePhotosIndex += 6;
  }

  // Transition Functions
  function homeListTransition() {

  }

  function convertPhotosToEvents() {

  }

  function eventsSorter() {

  }

  // List Page Functions

  function getBucketEvents() {
    return bucketEvents;
  }

  function getMoreBucketEvents() {

  }

  function getPlannerEvents() {
    return plannerEvents;
  }

  function addPlanner(idString) {
    console.log(idString);
    plannerSorter();
  }

  function deletePlanner(idString) {
    console.log(idString);

  }

  function finishPlanner(idString) {
    console.log(idString);

  }

  function plannerSorter() {

  }

  // Database Functions

  function getEvents() {
    var p = $http({
      url: '/db/events',
      method: 'GET'
    }).then(function(response) {
      eventsFromDB = response.data;
    });
    return p;
  };

  function getPhotos() {
    var p = $http({
      url: '/db/photos',
      method: 'GET'
    }).then(function(response) {
      photosFromDB = response.data;
    });
    return p;
  };


});
