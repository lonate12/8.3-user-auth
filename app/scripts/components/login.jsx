var React = require('react');

var SignUpForm = React.createClass({
  render: function(){
    return(
      <h1>Sign Up</h1>
    );
  }
});

var LoginForm = React.createClass({
  render: function(){
    return(
      <h1>test</h1>
    );
  }
});

var UserAccessContainer = React.createClass({
  render: function(){
    return(
      <div className="container">
        <LoginForm />
        <SignUpForm />
      </div>
    );
  }
});

module.exports = {
  UserAccessContainer: UserAccessContainer
};
