var React = require('react');
var User = require('../models/user.js').User;
var Backbone = require('backbone');

var SignUpForm = React.createClass({
  getInitialState: function(){
    return {
      username: '',
      password: ''
    };
  },
  handleEmail: function(e){
    this.setState({username: e.target.value});
  },
  handlePassword: function(e){
    this.setState({password: e.target.value});
  },
  handleSubmit: function(e){
    e.preventDefault();
    var username = this.state.username,
      password = this.state.password;

    this.props.signUp(username, password);

    this.setState({username: '', password: ''});
  },
  render: function(){
    return(
      <div className="col-md-6">
        <h1>Sign Up</h1>
        <form onSubmit={this.handleSubmit} id='sign-up-form'>
          <div className="form-group">
            <label htmlFor="SignUpInputEmail1">Email address</label>
            <input type="email" onChange={this.handleEmail} className="form-control" value={this.state.username} id="SignUpInputEmail1" placeholder="Email" />
          </div>
          <div className="form-group">
            <label htmlFor="SignUpInputPassword1">Password</label>
            <input type="password" onChange={this.handlePassword} className="form-control" value={this.state.password} id="SignUpInputPassword1" placeholder="Password" />
          </div>
          <button type="submit" className="btn btn-default">Submit</button>
        </form>
      </div>
    );
  }
});

var LoginForm = React.createClass({
  getInitialState: function(){
    return {
      username: '',
      password: ''
    };
  },
  handleEmail: function(e){
    this.setState({username: e.target.value});
  },
  handlePassword: function(e){
    this.setState({password: e.target.value});
  },
  handleLogin: function(e){
    e.preventDefault();
    var username = this.state.username,
      password = this.state.password;

    this.props.login(username, password);

    this.setState({username: '', password: ''});
  },
  render: function(){
    return(
      <div className="col-md-6">
        <h1>Login</h1>
        <form onSubmit={this.handleLogin} id='sign-up-form'>
          <div className="form-group">
            <label htmlFor="SignUpInputEmail1">Email address</label>
            <input type="email" onChange={this.handleEmail} className="form-control" value={this.state.username} id="SignUpInputEmail1" placeholder="Email" />
          </div>
          <div className="form-group">
            <label htmlFor="SignUpInputPassword1">Password</label>
            <input type="password" onChange={this.handlePassword} className="form-control" value={this.state.password} id="SignUpInputPassword1" placeholder="Password" />
          </div>
          <button type="submit" className="btn btn-default">Submit</button>
        </form>
      </div>
    );
  }
});

var UserAccessContainer = React.createClass({
  getInitialState: function(){
    var user = new User();

    return{
      user: user
    };
  },
  login: function(username, password){
    this.state.user.login(username, password, function(){
      Backbone.history.navigate('messages/', {trigger: true});
    });
  },
  signUp: function(username, password){
    this.state.user.signUp(username, password, function(){
      Backbone.history.navigate('messages/', {trigger: true});
    });
  },
  render: function(){
    return(
      <div className="container">
        <div className="row">
          <LoginForm login={this.login}/>
          <SignUpForm signUp={this.signUp}/>
        </div>
      </div>
    );
  }
});

module.exports = {
  UserAccessContainer: UserAccessContainer
};
