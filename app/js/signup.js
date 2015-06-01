import React from 'react';
import service from "./service";

var Signup = React.createClass({

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
          <p>Thanks or signing up, we''ll be sending you an email shortly.</p>
        </div>
      );
    }
  }
});

export default Signup;
