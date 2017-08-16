var app = angular.module('miModule');

app.factory('miFactory', function($http) {
  // Database Variables --------------------------------------------------------

  var eventsFromDB;

  var photosFromDB;

  // Home Page Variables -------------------------------------------------------

  var randomPhotoIDs = [];

  var homePhotos = [];

  var likedPhotos = [];

  var homeInitialized = false;

  // List Page Variables -------------------------------------------------------

  var likedEvents = [];

  var bucketEvents = [];

  // Planner Page Variables ----------------------------------------------------

  var plannerEvents = [];

  var plannerIndex;


  // Returns functions that should be accessible from other files
  return {
    initialSetupHome: initialSetupHome,
    getHomeInitializedBool: getHomeInitializedBool,
    getHomePhotos: getHomePhotos,
    addLikedPhotos: addLikedPhotos,
    removeLikedPhotos: removeLikedPhotos,
    removeAllLikedPhotos: removeAllLikedPhotos,

    homeListTransition: homeListTransition,

    getBucketEvents: getBucketEvents,

    getPlannerEvents: getPlannerEvents,
    setPlannerIndex: setPlannerIndex,
    addPlanner: addPlanner,
    deletePlanner: deletePlanner
  }



  // Home Page Functions -------------------------------------------------------

  function initialSetupHome() {

    getPhotos().then(function() {

      randomize(photosFromDB.length);

      getEvents().then(function() {

        for(var i = 0; i < photosFromDB.length; i++) {
          for(var j = 0; j < eventsFromDB.length; j++) {
            if (photosFromDB[i].event_id == eventsFromDB[j].id) {
              photosFromDB[i].city = eventsFromDB[j].city;
              photosFromDB[i].category = eventsFromDB[j].category;
              photosFromDB[i].description = eventsFromDB[j].description;
            }
          }
        }


        for(var i = 0; i < randomPhotoIDs.length; i++) {
          for (var j = 0; j < photosFromDB.length; j++) {
            if (randomPhotoIDs[i] == photosFromDB[j].id) {
              homePhotos.push(photosFromDB[j]);
            }
          }
        }
      });

    });


    homeInitialized = true;


  }

  function getHomeInitializedBool() {
    return homeInitialized;
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

      if (repeat == false) {
        randomPhotoIDs.push(randomNum);
      }
    }
  }

  function getHomePhotos() {
    return homePhotos;
  }

  function addLikedPhotos(imageID) {
    likedPhotos.push(imageID);
  }

  function removeLikedPhotos(imageID) {
    var removeIndex;

    for (var i = 0; i < likedPhotos.length; i++) {

      if (imageID == likedPhotos[i]) {
        removeIndex = i;
      }
    }

    likedPhotos.splice(removeIndex, 1);
  }

  function removeAllLikedPhotos() {
      likedPhotos = [];
  }

  // Home-List Transition Functions --------------------------------------------

  function homeListTransition() {
    convertPhotosToEvents();
    eventsSorter();
  }

  function convertPhotosToEvents() {
    console.log("photos", likedPhotos);
    for(var i = 0; i < likedPhotos.length; i++) {
      for(var j = 0; j < photosFromDB.length; j++) {
        if(likedPhotos[i] == photosFromDB[j].id) {
          likedEvents.push(photosFromDB[j].event_id)
        }
      }
    }

    console.log("events", likedEvents);
  }

  function eventsSorter() {

    likedEvents = quicksortBasic(likedEvents);
    console.log("sorted Events", likedEvents);

    var oneRep = [];
    var twoRep = [];
    var threeRep = [];
    var fourRep = [];

    var rep = 1;

    for (var x = 1; x < likedEvents.length; x++) {

        if (likedEvents[x] == likedEvents[x - 1]) {
          rep += 1;
        }
        else {
          if (rep == 1) {
            oneRep.push(likedEvents[x - 1]);
          }
          if (rep == 2) {
            twoRep.push(likedEvents[x - 1]);
          }
          if (rep == 3) {
            threeRep.push(likedEvents[x - 1]);
          }
          if (rep >= 4) {
            fourRep.push(likedEvents[x - 1]);
          }
          rep = 1;
        }

        if (x == likedEvents.length - 1) {
          if (rep == 1) {
            oneRep.push(likedEvents[x]);
          }
          if (rep == 2) {
            twoRep.push(likedEvents[x]);
          }
          if (rep == 3) {
            threeRep.push(likedEvents[x]);
          }
          if (rep >= 4) {
            fourRep.push(likedEvents[x]);
          }
        }
    }

    if (likedEvents.length == 1) {
      oneRep.push(likedEvents[0]);
    }
    console.log("reps4", fourRep);
    console.log("reps3", threeRep);
    console.log("reps2", twoRep);
    console.log("rep1", oneRep);

    var noDuplicateEvents = fourRep.concat(threeRep,twoRep,oneRep);

    bucketEvents = [];

    for(var k = 0; k < noDuplicateEvents.length; k++) {
      for(var l = 0; l < eventsFromDB.length; l++) {
        if(noDuplicateEvents[k] == eventsFromDB[l].id) {
          bucketEvents.push(eventsFromDB[l]);
        }
      }
    }

  }

  function quicksortBasic(array) {
    if(array.length < 2) {
      return array;
    }

    var pivot = array[0];
    var lesser = [];
    var greater = [];

    for(var i = 1; i < array.length; i++) {
      if(array[i] < pivot) {
        lesser.push(array[i]);
      } else {
        greater.push(array[i]);
      }
    }

    return quicksortBasic(lesser).concat(pivot, quicksortBasic(greater));
  }

  // List Page Functions -------------------------------------------------------

  function getBucketEvents() {
    return bucketEvents;
  }

  function getPlannerEvents() {
    return plannerEvents;
  }

  function setPlannerIndex(idString) {
    plannerIndex = idString;
  }

  function addPlanner(dateTime) {
    plannerEvents.push({
      id: bucketEvents[plannerIndex].id,
      name: bucketEvents[plannerIndex].name,
      dateTime: dateTime,
      address: bucketEvents[plannerIndex].address,
      phone: bucketEvents[plannerIndex].phone,
      price: bucketEvents[plannerIndex].price,
      website: bucketEvents[plannerIndex].website
    });
    plannerSorter();
  }

  // Planner Page Functions ----------------------------------------------------

  function deletePlanner(index) {
    plannerEvents.splice(index, 1);

  }

  function plannerSorter() {

    for(var t = 0; t < plannerEvents.length; t++) {
      var tenth = 0;
      if (plannerEvents[t].dateTime[13] == ":") {
        tenth = 1;
      }
      var month = parseInt(plannerEvents[t].dateTime.substring(0,2));
      var day = parseInt(plannerEvents[t].dateTime.substring(3,5));
      var year = parseInt(plannerEvents[t].dateTime.substring(6,10));
      var hour = parseInt(plannerEvents[t].dateTime.substring(11,12 + tenth));
      var minute = parseInt(plannerEvents[t].dateTime.substring(13 + tenth,15 + tenth));
      var noon;

      if (plannerEvents[t].dateTime.substring(16 + tenth, 18 + tenth) == "AM") {
        noon = 0;
      }
      else {
        noon = 12;
      }

      plannerEvents[t].priorityNumber = minute + hour * 100 + noon * 100 + day * 10000 + month * 1000000 + year * 100000000;
    }
    plannerEvents.sort(function(a, b) {
      return a.priorityNumber - b.priorityNumber;
    });

  }


  // Database Functions ------------------------------------------------------

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
