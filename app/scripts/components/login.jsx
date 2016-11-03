var React = require('react');

var SignUpForm = React.createClass({
  getInitialState: function(){
    return {
      email: '',
      password: ''
    };
  },
  handleEmail: function(e){
    this.setState({email: e.target.value});
  },
  handlePassword: function(e){
    this.setState({password: e.target.value});
  },
  handleSubmit: function(e){
    e.preventDefault();
    var email = this.state.email,
      password = this.state.password;

    this.props.signUp(email, password);
  },
  render: function(){
    return(
      <form onSubmit={this.handleSubmit} id='sign-up-form'>
        <div className="form-group">
          <label htmlFor="SignUpInputEmail1">Email address</label>
          <input type="email" onChange={this.handleEmail} className="form-control" value={this.state.email} id="SignUpInputEmail1" placeholder="Email" />
        </div>
        <div className="form-group">
          <label htmlFor="SignUpInputPassword1">Password</label>
          <input type="password" onChange={this.handlePassword} className="form-control" value={this.state.password} id="SignUpInputPassword1" placeholder="Password" />
        </div>
        <button type="submit" className="btn btn-default">Submit</button>
      </form>
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
  getInitialState: function(){
    
  },
  signUp: function(email, password){
    console.log(email);
    console.log(password);
  },
  render: function(){
    return(
      <div className="container">
        <LoginForm />
        <SignUpForm signUp={this.signUp}/>
      </div>
    );
  }
});

module.exports = {
  UserAccessContainer: UserAccessContainer
};
