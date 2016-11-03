var $ = require('jquery');
var Backbone = require('backbone');
var React = require('react');
var ReactDOM = require('react-dom');

var UserAccessContainer = require('./components/login.jsx').UserAccessContainer;

var AppRouter = Backbone.Router.extend({
  routes: {
    '': 'index'
  },
  index: function(){
    ReactDOM.render(
      React.createElement(UserAccessContainer),
      document.getElementById('app')
    );
  }
});

var router = new AppRouter();

module.export = router;
