console.log("loading scripts")

var Firebase = require("firebase");
var backend = new Firebase("https://arrowpen.firebaseio.com/");

// backend.set({
//   title: "exiting!",
//   author: "Kang",
//   location: {
//     city: "Sydney"
//   }
// });
//
//
// backend.child("location/city").on("value", function(snapshot) {
//   alert(snapshot.val());
// });

backend.set({
  users: null
});


backend.child("location/city").on("value", function(snapshot) {
  alert(snapshot.val());
});
