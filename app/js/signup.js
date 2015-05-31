
// Constructor
var signup = {
  createUser: function(email, password) {
    be.createUser({
      email    : email,
      password : password
    }, function(error, userData) {
      if (error) {
        console.log("Error creating user:", error);
      } else {
        console.log("Successfully created user account with uid:", userData.uid);
      }
    })
  }
}
module.exports = signup;
