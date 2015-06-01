import Firebase from "firebase";
import Backbone from "backbone";
import React from  "react";
import Router from "react-router";
import { DefaultRoute, Link, Route, RouteHandler } from 'react-router';
import login from  "./login.js";
import signup from "./signup.js";

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
