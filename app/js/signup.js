
// Plain JS constructor

// var signup = {
//   createUser: function(email, password) {
//
//   }
// }
// module.exports = signup;

import React from 'react';
// import c from "./const";
import service from "./service";
// import ReactFire from 'reactfire';

var Signup = React.createClass({
  // mixins: [ ReactFire ]

  getInitialState: function() {
    return {
      email: null,
      password: null,
      signedup: false
    }
  },
  componentWillMount: function() {
    // this.firebaseRef = new Firebase(c.FIREBASE_ACCOUNT)
  },
  handleCreateUser() {
    // this.firebaseRef.createUser({
    //   email    : this.state.email,
    //   password : this.state.password
    // }, function(error, userData) {
    //   if (error) {
    //     console.log("Error creating user:", error);
    //   } else {
    //     console.log("Successfully created user account with uid:", userData.uid);
    //     this.setState({signedup: true});
    //   }
    // })
    service.createUser(this.state.email, this.state.password,
      function() {
        console.log("created success");
      }
    );


  },
  handleEmailChange: function(event) {
    this.setState({email: event.target.value});
  },
  handlePasswordChange: function(event) {
    this.setState({password: event.target.value});
  },
  render() {
    if (this.state.signedup == false) {
      return(
        <div className="signup">
          <h3>Signup</h3>
          <label for="email" >Email</label>
          <input id="email" type="text" value={this.state.email} onChange={this.handleEmailChange} />
          <label for="password">Password</label>
          <input id="password" type="text" value={this.state.password} onChange={this.handlePasswordChange}/>
          <button onClick={this.handleCreateUser}>Signup</button>
        </div>
      );
    }
    else {
      return(
        <div className="signup complete">
          <h3>Signup</h3>
          <p>Thanks or signing up, we'll be sending you an email shortly.</p>
        </div>
      );
    }
  }
});

export default Signup;
