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

  // Array of objects of images that are shown on the home page
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
    getLikedPhotos: getLikedPhotos,

    homeListTransition: homeListTransition,

    getBucketEvents: getBucketEvents,
    getMoreBucketEvents: getMoreBucketEvents,

    getPlannerEvents: getPlannerEvents,
    setPlannerIndex: setPlannerIndex,
    addPlanner: addPlanner,
    deletePlanner: deletePlanner,
    finishPlanner: finishPlanner
  }



  // Home Page Functions -------------------------------------------------------

  // Sets up home page
  function initialSetupHome() {

    // Empties the homePhotos array, so we can proceed to add a brand new set
    // of random images
    for (var p = 0; p < homePhotos; p++) {
      homePhotos.pop();
    }

    // Performs a get request for images in the database
    // (image objects are stored in photosFromDB)
    getPhotos().then(function() {

      // Takes the number of photos and randomizes all integers below that number starting
      // from 1 and store them into the array randomPhotoIDs (see function below)
      randomize(photosFromDB.length);

      // Populates the array homePhotos using the first eight IDs in randomPhotoIDs
      // The purpose of the double for loop + if statement is to search for the
      // corresponding image object of the image IDs in randomPhotoIDs
      for(var i = 0; i <= 8; i++) {
        for (var j = 0; j < photosFromDB.length; j++) {
          if (randomPhotoIDs[i] == photosFromDB[j].id) {
            homePhotos.push(photosFromDB[j]);
          }
        }
      }

      // Makes sure that next time we populate homePhotos, it starts from the ninth ID
      // in randomPhotoIDs
      homePhotosIndex = 8;

    });

    // Performs a get request for events in the database
    // (image objects are stored in eventsFromDB)
    getEvents();

  }

  // Takes a number and randomizes all integers below that number starting
  // from 1 and store them into randomPhotoIDs
  function randomize(count) {

    // pushes first random number from 1 to "count" into randomPhotoIDs
    var randomNum = Math.floor(Math.random()*count + 1);
    randomPhotoIDs.push(randomNum);

    // While randomPhotoIDs is not finished getting populated, this loop runs
    while(randomPhotoIDs.length < count) {

      // Generates a number between 1 to "count"
      var randomNum = Math.floor(Math.random()*count + 1);
      var repeat = false;
      for(var j = 0; j < randomPhotoIDs.length; j++) {
        if (randomNum == randomPhotoIDs[j]) {
          // if the random number generated equals to any number in randomPhotoIDs,
          // repeat would equal true
          repeat = true;
        }
      }

      // if repeat is false, then push that random number to randomPhotoIDs
      if (!repeat) {
        randomPhotoIDs.push(randomNum);
      }
    }
  }

  // Returns array of objects of images that are shown on the home page
  function getHomePhotos() {
    return homePhotos;
  }

  // This function runs when infinite-scroll is triggered.
  // Populates the homePhotos array with more image objects
  function getMoreHomePhotos() {

    // Loops through the next 6 integers from where we left off in the
    // variable homePhotosIndex. These integers are used as indices to
    // extract the next six random IDs from randomPhotoIDs.
    // The double for loop and if statement searches for the corresponding
    // image object with these random IDs.
    for(var i = homePhotosIndex + 1; i <= homePhotosIndex + 6; i++) {

      // Loops through ALL the image objects
      for (var j = 0; j < photosFromDB.length; j++) {

        if (randomPhotoIDs[i] == photosFromDB[j].id) {
          // Adds the image object to homePhotos when the correct one is found
          homePhotos.push(photosFromDB[j]);
        }
      }
    }

    // Increments homePhotosIndex by 6 so next time we would start looping from
    // the correct index
    homePhotosIndex += 6;
  }

  // The parameter index is the index of the selected image in the home page
  // We can get the ID of that image at that index with randomPhotoIDs because
  // we populated the home page with images using the IDs in randomPhotoIDs
  function addLikedPhotos(index) {
    // Adds the ID of the selected image to likedPhotos array
    likedPhotos.push(randomPhotoIDs[index]);
  }

  // See the function above for explanation of "index"
  function removeLikedPhotos(index) {
    var removeIndex;

    // Loops through all the IDs of images that are liked/selected
    for (var i = 0; i < likedPhotos.length; i++) {

      // Searches for the index inside likedPhotos that we want to delete
      if (randomPhotoIDs[index] == likedPhotos[i]) {
        removeIndex = i;
      }
    }

    // Removes the photo ID from likedPhotos
    likedPhotos.splice(removeIndex, 1);
  }

  // Returns the array of IDs of selected/liked photos
  // Can be used in home page to show how many images are liked
  function getLikedPhotos() {
    return likedPhotos;
  }

  // Home-List Transition Functions --------------------------------------------

  // Executes when the list icon is clicked on in the home page
  function homeListTransition() {
    convertPhotosToEvents();
    eventsSorter();
  }

  // Converts the array of liked photos IDs into event IDs
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
