var $ = require('jquery');
var Backbone = require('backbone');
var React = require('react');
var ReactDOM = require('react-dom');

var UserAccessContainer = require('./components/login.jsx').UserAccessContainer;
var MessageContainer = require('./components/messages.jsx').MessageContainer;

var AppRouter = Backbone.Router.extend({
  initialize: function(){
    if(localStorage.getItem('sessionToken')){
      $.ajaxSetup({
        beforeSend: function(xhr){
          xhr.setRequestHeader('X-Parse-Application-Id', 'zugzwang'),
          xhr.setRequestHeader('X-Parse-REST-API-Key', 'tosche station'),
          xhr.setRequestHeader('X-Parse-Session-Token', localStorage.getItem('sessionToken'))
        }
      });
    }else{
      $.ajaxSetup({
        beforeSend: function(xhr){
          xhr.setRequestHeader('X-Parse-Application-Id', 'zugzwang'),
          xhr.setRequestHeader('X-Parse-REST-API-Key', 'tosche station')
        }
      });
    }
  },
  routes: {
    '': 'index',
    'messages/': 'showMessages'
  },
  index: function(){
    if(localStorage.getItem('sessionToken')){
      this.navigate('messages/', {trigger: true});
    }else{
      ReactDOM.render(
        React.createElement(UserAccessContainer),
        document.getElementById('app')
      );
    }
  },
  showMessages: function(){
    if(!localStorage.getItem('sessionToken')){
      this.navigate('', {trigger: true});
    }else{
      ReactDOM.render(
        React.createElement(MessageContainer),
        document.getElementById('app')
      );
    }
  }
});

var router = new AppRouter();

module.export = router;
