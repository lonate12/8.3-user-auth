var React = require('react');
var MessageCollection = require('../models/message.js').MessageCollection;
var Message = require('../models/message.js').Message;
var User = require('../models/user.js').User;
require('bootstrap-sass/assets/javascripts/bootstrap.min.js');

var MessageList = React.createClass({
  getInitialState: function(){
    return{
      messages: []
    }
  },
  componentWillReceiveProps: function(nextProps){
    this.setState({messages: nextProps.messages});
  },
  render: function(){
    var messages = this.state.messages;
    var messageList = messages.map(function(message){
      console.log(message);
      return(
        <li key={message.cid} className="list-group-item">{message.get('message')}</li>
      );
    });
    return(
      <div className="col-md-12">
        <ul className="list-group">
          {messageList}
        </ul>
      </div>
    );
  }
});

var MessageForm = React.createClass({
  getInitialState: function(){
    return {
      message: ''
    };
  },
  handleSubmit: function(e){
    e.preventDefault();

    this.props.sendMessage(this.state.message);
    this.setState({message: ''});
  },
  handleChange: function(e){
    this.setState({message: e.target.value});
  },
  render: function(){
    return(
      <form onSubmit={this.handleSubmit} className="form-inline">
        <div className="form-group">
          <label htmlFor="message">Message</label>
          <input onChange={this.handleChange} type="text" className="form-control" id="message" placeholder="Your message" value={this.state.message} />
        </div>
        <button type="submit" className="btn btn-default">Submit Message</button>
      </form>
    );
  }
});

var MessageContainer = React.createClass({
  getInitialState: function(){
    var message = new Message();
    var messageCollection = new MessageCollection();

    return {
      message: message,
      messageCollection: messageCollection
    }
  },
  sendMessage: function(message){
    var user = localStorage.getItem('user');
    var self = this;
    this.state.messageCollection.create({
      message: message,
      username: localStorage.getItem('username'),
      user: {__type: "Pointer", className: "_User", objectId: user}
    });

    this.setState({messageCollection: this.state.messageCollection});
  },
  componentWillMount: function(){
    var self = this;
    this.state.messageCollection.fetch().then(function(data){
      self.setState({messageCollection: self.state.messageCollection});
    });
  },
  logout: function(e){
    e.preventDefault();

    User.logout();
  },
  render: function(){
    return(
      <div className="container">
        <div className="row">
          <header className="col-md-12">
            <h3 className="pull-left">{localStorage.getItem('username')}</h3>
            <nav className="navbar navbar-light bg-faded pull-right">
              <ul className="nav navbar-nav">
                <li onClick={this.logout} className="nav-item active">
                  <a className="nav-link" href="#">Logout <span className="sr-only">(current)</span></a>
                </li>
              </ul>
            </nav>
          </header>
        </div>
        <div className="row">
          <MessageList messages={this.state.messageCollection}/>
          <MessageForm sendMessage={this.sendMessage}/>
        </div>
      </div>
    );
  }
});

module.exports = {
  MessageContainer: MessageContainer
};
