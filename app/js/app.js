
console.log("check if the be is even compilling hello");

var Firebase = require("firebase");
var Backbone = require("backbone");
var React = require("react");
var Router = require("react-router");
import { DefaultRoute, Link, Route, RouteHandler } from 'react-router';

import login from  "./login.js";
import signup from "./signup.js";


// var _ = require("underscore");

// var be = new Firebase("https://arrowpen.firebaseio.com/");
//
// be.set({
//   author: "Kang",
//   location: {
//     city: "Sydney"
//   }
// });
//
// be.child("location/city").on("value", function(snapshot) {
//   alert(snapshot.val());
// });



// signup.createUser("wangchen@gmail.com", "khcd43");

// be.set({
//   users: null
// });


var App = React.createClass({
  render() {
    return (
      <div className="nav">
        <Link to="app">Home</Link>
        <Link to="login">Login</Link>
        <Link to="signup">Signup</Link>
        <RouteHandler/>
      </div>
    );
  }
});

var routes = (
  <Route name="app" path="/" handler={App}>
    <Route name="login" path="/login" handler={login}/>
    <Route name="signup" path="/signup" handler={signup}/>
  </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.body);
});
