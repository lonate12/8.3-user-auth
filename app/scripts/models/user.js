var $ = require('jquery');
var Backbone = require('backbone');

var User = Backbone.Model.extend({
  idAttribute: 'objectId',
  urlRoot: 'https://zugzwang.herokuapp.com/users',
  signUp: function(username, password){
    var newUserInput = {username: username, password: password};
    console.log(newUserInput);
    this.save(newUserInput).then(function(response){
      if(response.sessionToken){
        localStorage.setItem('sessionToken', response.sessionToken);
        localStorage.setItem('username', response.username);
      }
      $.ajaxSetup({
        beforeSend: function(xhr){
          xhr.setRequestHeader('X-Parse-Application-Id', 'zugzwang'),
          xhr.setRequestHeader('X-Parse-REST-API-Key', 'tosche station'),
          xhr.setRequestHeader('X-Parse-Session-Token', response.sessionToken);
        }
      });
    });
  },
  login: function(username, password){
      var url = 'https://zugzwang.herokuapp.com/login';

      $.get(url+'?username='+username+'&password='+password).then(function(response){
        console.log(response);
        localStorage.setItem('username', response.username);
        localStorage.setItem('sessionToken', response.sessionToken);

        $.ajaxSetup({
          beforeSend: function(xhr){
            xhr.setRequestHeader('X-Parse-Application-Id', 'zugzwang'),
            xhr.setRequestHeader('X-Parse-REST-API-Key', 'tosche station'),
            xhr.setRequestHeader('X-Parse-Session-Token', response.sessionToken);
          }
        });
      });
  }
});

module.exports = {
  User: User
};
