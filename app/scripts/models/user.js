var Backbone = require('backbone');

var User = Backbone.Model.extend({
  urlRoot: 'https://zugzwang.herokuapp.com/classes/users',
  signUp: function(username, password){
    
  }
});

module.exports = {
  User: User
};
