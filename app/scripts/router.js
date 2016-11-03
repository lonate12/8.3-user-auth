var $ = require('jquery');
var Backbone = require('backbone');
var React = require('react');
var ReactDOM = require('react-dom');

var UserAccessContainer = require('./components/login.jsx').UserAccessContainer;
var MessageContainer = require('./components/messages.jsx').MessageContainer;

var AppRouter = Backbone.Router.extend({
  initialize: function(){
    $.ajaxSetup({
      beforeSend: function(xhr){
        xhr.setRequestHeader('X-Parse-Application-Id', 'zugzwang'),
        xhr.setRequestHeader('X-Parse-REST-API-Key', 'tosche station')
      }
    });
  },
  execute: function(){
    if(localStorage.sessionToken){
      router.navigate('Messages/', {trigger: true});
      $.ajaxSetup({
        beforeSend: function(xhr){
          xhr.setRequestHeader('X-Parse-Application-Id', 'zugzwang'),
          xhr.setRequestHeader('X-Parse-REST-API-Key', 'tosche station'),
          xhr.setRequestHeader('X-Parse-Session-Token', localStorage.sessionToken)
        }
      });
    }else{
      router.navigate('', {trigger: true});
    }

    Backbone.Router.prototype.execute.apply(this, arguments);
  },
  routes: {
    '': 'index',
    'Messages/': 'showMessages'
  },
  index: function(){
    ReactDOM.render(
      React.createElement(UserAccessContainer),
      document.getElementById('app')
    );
  },
  showMessages: function(){
    ReactDOM.render(
      React.createElement(MessageContainer),
      document.getElementById('app')
    );
  }
});

var router = new AppRouter();

module.export = router;
