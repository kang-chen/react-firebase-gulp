import c from "./const";

var Service = (function() {

  function Service() {
    this.firebaseRef = new Firebase(c.FIREBASE_ACCOUNT)
  }

  Service.prototype.createUser = function(email, password, callback) {
    this.firebaseRef.createUser({
      email    : email,
      password : password
    }, function(error, userData) {
      if (error) {
        console.log("Error creating user:", error);

      } else {
        console.log("Successfully created user account with uid:", userData.uid);
        return callback();
        // this.setState({signedup: true});
      }
    })
  };

  return Service;

})();

var inst = new Service();

export default inst;
