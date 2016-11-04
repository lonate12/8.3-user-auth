var $ = require('jquery');
var Backbone = require('backbone');

var User = Backbone.Model.extend({
  idAttribute: 'objectId',
  urlRoot: 'https://zugzwang.herokuapp.com/users',
  setLocalStorage: function(response){
    localStorage.setItem('sessionToken', response.sessionToken);
    localStorage.setItem('username', response.username);
    localStorage.setItem('user', response.objectId);
  },
  setHeader: function(response){
    $.ajaxSetup({
      beforeSend: function(xhr){
        xhr.setRequestHeader('X-Parse-Application-Id', 'zugzwang'),
        xhr.setRequestHeader('X-Parse-REST-API-Key', 'tosche station'),
        xhr.setRequestHeader('X-Parse-Session-Token', response.sessionToken);
      }
    });
  },
  signUp: function(username, password){
    var newUserInput = {username: username, password: password};
    var self = this;
    console.log(newUserInput);
    this.save(newUserInput).then(function(response){

      if(response.sessionToken){
        self.setLocalStorage(response);
      }

      self.setHeader(response);
    });
  },
  login: function(username, password){
      var url = 'https://zugzwang.herokuapp.com/login';
      var self = this;

      $.get(url+'?username='+username+'&password='+password).then(function(response){

        self.setLocalStorage(response);

        self.setHeader(response);
      });
  }
});

module.exports = {
  User: User
};
