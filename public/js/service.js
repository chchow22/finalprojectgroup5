var app = angular.module('miModule');

app.factory('miFactory', function($http) {
  // Database Variables --------------------------------------------------------

  // Stores ALL event objects from the events table in the database
  // Event objects contain id, name, price, category, description, four image URLs,
  // address, phone number, and website
  var eventsFromDB;

  // Stores ALL image objects from the events table in the database
  // Event objects contain id, image URL, and the foreign key of event ID
  var photosFromDB;

  // Home Page Variables -------------------------------------------------------

  // Array of IDs of images that are shown on the home page
  var homePhotos = [];

  // "The number of images shown on home page" - 1.
  var homePhotosIndex;

  // Array of randomized image IDs
  var randomPhotoIDs = [];

  // Array of IDs of images that are selected
  var likedPhotos = [];

  // List Page Variables -------------------------------------------------------

  // Array of IDs of events that are selected
  var likedEvents = [];

  // Array of objects of events that are displayed on the page
  var bucketEvents = [];

  // Planner Page Variables ----------------------------------------------------

  // Array of planner objects. Objects contain event name, event ID, data, and time
  var plannerEvents = [];

  // Variable that saves the planner event index when "add to planner" is clicked
  // on the page
  var plannerIndex;

  // Profile Page Variables ----------------------------------------------------

  // Array of objects of planner events that have been saved to profile that
  // have been "been there done that" by the user
  // Objects contain event name, event ID, data, and time
  var beenThereEvents = [];

  // Returns functions that should be accessible from other files
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
    setPlannerIndex: setPlannerIndex
  }



  // Home Page Functions -------------------------------------------------------
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
          if (rep == 4) {
            fourRep.push(likedEvents[x - 1]);
          }
          rep = 1;
        }

        if (x == likedEvents.length - 1) {
          if (likedEvents[x] == likedEvents[x - 1]) {
            rep += 1;
          }
          if (rep == 1) {
            oneRep.push(likedEvents[x]);
          }
          if (rep == 2) {
            twoRep.push(likedEvents[x]);
          }
          if (rep == 3) {
            threeRep.push(likedEvents[x]);
          }
          if (rep == 4) {
            fourRep.push(likedEvents[x]);
          }
        }
    }

    likedEvents = fourRep.concat(threeRep,twoRep,oneRep);
    console.log("reps", fourRep, threeRep, twoRep, oneRep);

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

  }

  function deleteDuplicates(array) {
    for(var i = array.length - 2; i >= 0; i--) {
      if (array[i] == array[i + 1]) {
        array.splice(i + 1, 1);
      }
    }
    return array;
  }

  // Quick sort where pivot is always the first element of the array
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

  function setPlannerIndex(idString) {
    plannerIndex = idString;
    console.log(plannerIndex);
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

  // Planner Page Functions ----------------------------------------------------
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
      console.log(response);
    });
    return p;
  };

  function getPhotos() {
    var p = $http({
      url: '/db/photos',
      method: 'GET'
    }).then(function(response) {
      photosFromDB = response.data;
      console.log(photosFromDB);
    });
    return p;
  };


});
