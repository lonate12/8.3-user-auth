var $ = require('jquery');
var Backbone = require('backbone');

var User = Backbone.Model.extend({
  idAttribute: 'objectId',
  urlRoot: 'https://zugzwang.herokuapp.com/users',
  setLocalStorage: function(response){
    var JSONResponse = JSON.stringify(response);
    localStorage.setItem('sessionToken', response.sessionToken);
    localStorage.setItem('username', response.username);
    localStorage.setItem('user', response.objectId);
    localStorage.setItem('currentUser', JSONResponse);
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
  signUp: function(username, password, callback){
    var newUserInput = {username: username, password: password};
    var self = this;

    this.save(newUserInput).then(function(response){

      if (response.sessionToken){
        self.setLocalStorage(response);
      }

      self.setHeader(response);

      callback();
    });
  },
  login: function(username, password, callback){
      var url = 'https://zugzwang.herokuapp.com/login';
      var self = this;

      $.get(url+'?username='+username+'&password='+password).then(function(response){

        self.setLocalStorage(response);

        self.setHeader(response);

        callback();
      });
  }
},{
  logout: function(){
    $.post('https://zugzwang.herokuapp.com/logout/').then(function(){
      localStorage.clear();
      $.ajaxSetup({
        beforeSend: function(xhr){
          xhr.setRequestHeader("X-Parse-Application-Id", "zugzwang");
          xhr.setRequestHeader("X-Parse-REST-API-Key", "tosche station");
        }
      });
      Backbone.history.navigate('', {trigger:true});
    });
  }
});

module.exports = {
  User: User
};
