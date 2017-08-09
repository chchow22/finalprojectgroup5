var app = angular.module('miModule');

app.factory('miFactory', function($http) {
  // Home Page Variables
  var eventsFromDB;
  var photosFromDB;

  var homePhotos = [];
  var randomPhotoIDs = [];
  var likedPhotos = [];

  // List Page Variables
  var likedEvents = [];
  var bucketEvents = [
      {id: 1,
      name: "Fox Theater",
      price: "$$$",
      category: "Arts & Culture",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse viverra enim id nunc facilisis vestibulum. Morbi porttitor libero a finibus tempus. Nullam condimentum, mi molestie convallis feugiat, odio leo molestie massa, sit amet consequat ipsum eros at lorem. Mauris rutrum pretium ex et molestie. Nam lorem lacus, cursus eget tempor non, cursus interdum nunc.",
      image1: "http://www.olympiaentertainment.com/assets/img/Fox-Theatre-Orchestra.jpg",
      image2: "http://res.cloudinary.com/miles-extranet-dev/image/upload/ar_16:9,c_fill,w_1000,g_face,q_50/Michigan/migration_photos/G4668/G4668-FoxTheaterinDetroit.jpg",
      image3: "https://bloximages.newyork1.vip.townnews.com/stltoday.com/content/tncms/assets/v3/editorial/0/d8/0d8432d5-64fc-5033-9ed5-1a946bc7fb37/5776020d8c34c.image.jpg?resize=1200%2C801",
      image4: "https://images1.westword.com/imager/u/745xauto/8540756/05thefray_nov25_2016.jpg",
      phone: "(313) 471-3200",
      address: "2211 Woodward Ave, Detroit, MI",
      website: "http://www.olympiaentertainment.com/venues/detail/fox-theatre"
      },

      {id: 2,
      name: "The Mall At Partridge Creek",
      price: "$$$",
      category: "Shopping",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse viverra enim id nunc facilisis vestibulum. Morbi porttitor libero a finibus tempus. Nullam condimentum, mi molestie convallis feugiat, odio leo molestie massa, sit amet consequat ipsum eros at lorem. Mauris rutrum pretium ex et molestie. Nam lorem lacus, cursus eget tempor non, cursus interdum nunc.",
      image1: "https://static1.squarespace.com/static/53066436e4b0fb69071dde49/5390a1bce4b0feb1af700ef7/5390a1c0e4b02e9e89522b9b/1401987525534/partridge+creek+01.jpg",
      image2: "http://www.whcanon.com/wp-content/uploads/2015/05/The-Patridge-Creek-Mall3.png",
      image3: "http://www.whcanon.com/wp-content/uploads/2015/05/The-Patridge-Creek-Mall4.png",
      image4: "https://s-media-cache-ak0.pinimg.com/736x/07/ec/49/07ec498d0297d8ad1f2a2da2d027d6f6.jpg",
      phone: "(586) 226-0330",
      address: "17420 Hall Rd, Charter Twp of Clinton, MI",
      website: "http://www.olympiaentertainment.com/venues/detail/fox-theatre"
      }
    ];

  var plannerEvents = [{
    id: 1,
    name: "Fox Theater",
    date: "Aug 9 2017",
    time: "17:00"
  },
  {
    id: 2,
    name: "The Mall At Partridge Creek",
    date: "Aug 10 2017",
    time: "18:00"
  },
  {
    id: 3,
    name: "Snowboarding",
    date: "Aug 11 2017",
    time: "17:00"
  },
  {
    id: 4,
    name: "Museum in Grand Rapids",
    date: "Aug 12 2017",
    time: "18:00"
  },
  {
    id: 5,
    name: "Museum in Ann Arbor",
    date: "Aug 13 2017",
    time: "17:00"
  },
  {
    id: 6,
    name: "McDonalds",
    date: "Aug 14 2017",
    time: "18:00"
  },
  {
    id: 7,
    name: "Walmart",
    date: "Aug 15 2017",
    time: "17:00"
  },
  {
    id: 8,
    name: "Costco",
    date: "Aug 16 2017",
    time: "18:00"
  }];

  return {
    initialSetupHome: initialSetupHome,
    getHomePhotos: getHomePhotos,
    getMoreHomePhotos: getMoreHomePhotos,
    jQuery: jQuery,

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
        for (var j = 1; j < photosFromDB.length; j++) {
          if (randomPhotoIDs[i] == photosFromDB[j].id) {
            homePhotos.push(photosFromDB[j]);
          }
        }
      }
      console.log(homePhotos);
      jQuery();
    });


  }

  function jQuery() {
    $(document).ready(function() {
      $('img').on('click', function() {
        $(this).toggleClass('selected');
      });

      $(window).scroll(function() {
        if ($(this).scrollTop() > 200) {
          $('.goToTop').fadeIn();
        } else {
          $('.goToTop').fadeOut();
        }
      });
      $('.goToTop').click(function() {
        $("html, body").animate({
          scrollTop: 0
        }, 1000);
        return false;
      });
    });
  }

  function randomize(count) {
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
    jQuery();
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
    bucketEvents.push({ id: 3,
    name: "Fox Theater",
    price: "$$$",
    category: "Arts & Culture",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse viverra enim id nunc facilisis vestibulum. Morbi porttitor libero a finibus tempus. Nullam condimentum, mi molestie convallis feugiat, odio leo molestie massa, sit amet consequat ipsum eros at lorem. Mauris rutrum pretium ex et molestie. Nam lorem lacus, cursus eget tempor non, cursus interdum nunc.",
    image1: "http://www.olympiaentertainment.com/assets/img/Fox-Theatre-Orchestra.jpg",
    image2: "http://res.cloudinary.com/miles-extranet-dev/image/upload/ar_16:9,c_fill,w_1000,g_face,q_50/Michigan/migration_photos/G4668/G4668-FoxTheaterinDetroit.jpg",
    image3: "https://bloximages.newyork1.vip.townnews.com/stltoday.com/content/tncms/assets/v3/editorial/0/d8/0d8432d5-64fc-5033-9ed5-1a946bc7fb37/5776020d8c34c.image.jpg?resize=1200%2C801",
    image4: "https://images1.westword.com/imager/u/745xauto/8540756/05thefray_nov25_2016.jpg",
    phone: "(313) 471-3200",
    address: "2211 Woodward Ave, Detroit, MI",
    website: "http://www.olympiaentertainment.com/venues/detail/fox-theatre"
  },

    {id: 4,
    name: "The Mall At Partridge Creek",
    price: "$$$",
    category: "Shopping",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse viverra enim id nunc facilisis vestibulum. Morbi porttitor libero a finibus tempus. Nullam condimentum, mi molestie convallis feugiat, odio leo molestie massa, sit amet consequat ipsum eros at lorem. Mauris rutrum pretium ex et molestie. Nam lorem lacus, cursus eget tempor non, cursus interdum nunc.",
    image1: "https://static1.squarespace.com/static/53066436e4b0fb69071dde49/5390a1bce4b0feb1af700ef7/5390a1c0e4b02e9e89522b9b/1401987525534/partridge+creek+01.jpg",
    image2: "http://www.whcanon.com/wp-content/uploads/2015/05/The-Patridge-Creek-Mall3.png",
    image3: "http://www.whcanon.com/wp-content/uploads/2015/05/The-Patridge-Creek-Mall4.png",
    image4: "https://s-media-cache-ak0.pinimg.com/736x/07/ec/49/07ec498d0297d8ad1f2a2da2d027d6f6.jpg",
    phone: "(586) 226-0330",
    address: "17420 Hall Rd, Charter Twp of Clinton, MI",
    website: "http://www.olympiaentertainment.com/venues/detail/fox-theatre"
    });

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
      console.log(photosFromDB);
    });
    return p;
  };


});
