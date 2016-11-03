var React = require('react');
var MessageCollection = require('../models/message.js').MessageCollection;
var Message = require('../models/message.js').Message;

var MessageList = React.createClass({
  render: function(){
    var messages = this.props.messages;
    return(
      <div className="col-md-12">
        <ul>
          <li>This</li>
          <li>That</li>
          <li>Other</li>
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
  },
  handleChange: function(e){
    this.setState({message: e.target.value});
    console.log(this.state.message);
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
    this.state.messageCollection.create({
      message: message,
      username: localStorage.getItem('username'),
      user: localStorage.getItem('username')
    });
  },
  componentWillMount: function(){
    var self = this;
    this.state.messageCollection.fetch().then(function(data){
      console.log(data.results);
      console.log(self.state.messageCollection);
    });
  },
  render: function(){
    return(
      <div className="container">
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
