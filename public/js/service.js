var app = angular.module('miModule');

app.factory('miFactory', function($http) {
  // Home Page Variables
  var eventsFromDB;
  var photosFromDB;

  var homePhotos = [];
  var homePhotosIndex = 0;
  var randomPhotoIDs = [];
  var likedPhotos = [];

  // List Page & Planner Page Variables
  var likedEvents = [];
  var bucketEvents = [];

  var plannerEvents = [];
  var plannerIndex = 0;

  // Profile Page Variables
  var beenThereEvents = [];

  return {
    initialSetupHome: initialSetupHome,
    getHomePhotos: getHomePhotos,
    getMoreHomePhotos: getMoreHomePhotos,
    addLikedPhotos: addLikedPhotos,
    removeLikedPhotos: removeLikedPhotos,

    homeListTransition: homeListTransition,

    getBucketEvents: getBucketEvents,
    getMoreBucketEvents: getMoreBucketEvents,
    getPlannerEvents: getPlannerEvents,
    addPlanner: addPlanner,
    deletePlanner: deletePlanner,
    finishPlanner: finishPlanner,
    setPlannerIndex: setPlannerIndex,

    getPhotos: getPhotos,
    quicksortBasic: quicksortBasic
  }



  // Home Page Functions
  function initialSetupHome() {
    for (var p = 0; p < homePhotos; p++) {
      homePhotos.pop();
      console.log("popped");
    }
    getPhotos().then(function() {
      randomize(photosFromDB.length);
      for(var i = 0; i <= 8; i++) {
        for (var j = 0; j < photosFromDB.length; j++) {
          if (randomPhotoIDs[i] == photosFromDB[j].id) {
            homePhotos.push(photosFromDB[j]);
          }
        }
      }
      homePhotosIndex = 8;

    });

    getEvents();

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

  function addLikedPhotos(index) {
    likedPhotos.push(randomPhotoIDs[index]);
  }

  function removeLikedPhotos(index) {
    var removeIndex;

    for (var i = 0; i < likedPhotos.length; i++) {
      if (randomPhotoIDs[index] == likedPhotos[i]) {
        removeIndex = i;
      }
    }
    likedPhotos.splice(removeIndex, 1);
  }

  // Transition Functions ------------------------------------------------------
  function homeListTransition() {
    convertPhotosToEvents();
    eventsSorter();
  }

  function convertPhotosToEvents() {
    likedEvents = [];
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
    var fiveRep = [];

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
        if (rep == 4) {
          fourRep.push(likedEvents[x - 1]);
        }
        if (rep == 5) {
          fiveRep.push(likedEvents[x - 1]);
        }
        rep = 1;
      }
    }

    likedEvents = fiveRep.concat(fourRep,threeRep,twoRep,oneRep);
    console.log("reps", fiveRep, fourRep, threeRep, twoRep, oneRep);

    likedEvents = deleteDuplicates(likedEvents);
    console.log("deleted duplicates", likedEvents);

    bucketEvents = [];

    for(var k = 0; k < likedEvents.length; k++) {
      for(var l = 0; l < eventsFromDB.length; l++) {
        if(likedEvents[k] == eventsFromDB[l].id) {
          bucketEvents.push(eventsFromDB[l]);
        }
      }
    }


    for (var m = 0; m < bucketEvents.length; m++) {
      bucketEvents[m].images = [];
      for (var n = 0; n < photosFromDB.length; n++) {
        if (photosFromDB[n].event_id == bucketEvents[m].id) {
          bucketEvents[m].images.push(photosFromDB[n].img_url);
        }
      }
    }


  }

  function deleteDuplicates(array) {
    for(var i = array.length - 2; i >= 0; i--) {
      if (array[i] == array[i + 1]) {
        array.splice(i + 1, 1);
      }
    }
    return array;
  }

  // Sorting Functions --------------------------------------------------------
  // basic implementation (pivot is the first element of the array)
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

  function getMoreBucketEvents() {

  }

  function getPlannerEvents() {
    return plannerEvents;
  }

  function addPlanner(date, time) {
    plannerEvents.push({
      id: bucketEvents[plannerIndex].id,
      name: bucketEvents[plannerIndex].name,
      date: date,
      time: time
    });
    console.log(plannerEvents);
    plannerSorter();
  }

  function setPlannerIndex(idString) {
    plannerIndex = idString;
    console.log(plannerIndex);
  }

  function deletePlanner(idString) {
    plannerEvents.splice(idString, 1);
  }

  function finishPlanner(idString) {
    beenThereEvents.push(plannerEvents[idString]);
    console.log(beenThereEvents);

  }

  function plannerSorter() {

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
