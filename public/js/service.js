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
    addLikedPhotos: addLikedPhotos,
    removeLikedPhotos: removeLikedPhotos,

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

  // Transition Functions
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

    for(var i = likedEvents.length - 2; i >= 0; i--) {
      if (likedEvents[i] == likedEvents[i + 1]) {
        likedEvents.splice(i + 1, 1);
      }
    }

    console.log("deleted duplicates", likedEvents);

    bucketEvents = [];

    for(var k = 0; k < likedEvents.length; k++) {
      for(var l = 0; l < eventsFromDB.length; l++) {
        if(likedEvents[k] == eventsFromDB[l].id) {
          bucketEvents.push(eventsFromDB[l]);
        }
      }
    }

    //
    // for (var m = 0; m < bucketEvents.length; m++) {
    //   bucketEvents[m].images = [];
    //   for (var n = 0; n < photosFromDB.length; n++) {
    //     if (photosFromDB[n].event_id == bucketEvents[m].id) {
    //       bucketEvents[m].images.push(photosFromDB[n].img_url);
    //     }
    //   }
    // }


  }


  // Sorting Functions
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

// swap function helper
function swap(array, i, j) {
  var temp = array[i];
  array[i] = array[j];
  array[j] = temp;
}

// classic implementation (with Hoare or Lomuto partition scheme, you can comment either one method or the other to see the difference)
function quicksort(array, left, right) {
  left = left || 0;
  right = right || array.length - 1;

  // var pivot = partitionLomuto(array, left, right); // you can play with both partition
  var pivot = partitionHoare(array, left, right); // you can play with both partition

  if(left < pivot - 1) {
    quicksort(array, left, pivot - 1);
  }
  if(right > pivot) {
    quicksort(array, pivot, right);
  }
  return array;
}
// Lomuto partition scheme, it is less efficient than the Hoare partition scheme
function partitionLomuto(array, left, right) {
  var pivot = right;
  var i = left;

  for(var j = left; j < right; j++) {
    if(array[j] <= array[pivot]) {
      swap(array, i , j);
      i = i + 1;
    }
  }
  swap(array, i, j);
  return i;
}
// Hoare partition scheme, it is more efficient than the Lomuto partition scheme because it does three times fewer swaps on average
function partitionHoare(array, left, right) {
  var pivot = Math.floor((left + right) / 2 );

  while(left <= right) {
    while(array[left] < array[pivot]) {
      left++;
    }
    while(array[right] > array[pivot]) {
      right--;
    }
    if(left <= right) {
      swap(array, left, right);
      left++;
      right--;
    }
  }
  return left;
}

console.log(quicksort(array.slice()));


  // List Page Functions

  function getBucketEvents() {
    return bucketEvents;
  }

  function getMoreBucketEvents() {

  }

  function getPlannerEvents() {
    return plannerEvents;
  }

  function addPlanner(idString, date, time) {
    console.log(idString);
    plannerEvents.push({
      id: bucketEvents[idString].id,
      name: bucketEvents[idString].name,
      date: date,
      time: time
    });
    console.log(plannerEvents);
    plannerSorter();
  }

  function deletePlanner(idString) {
    plannerEvents.splice(idString, 1);
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
