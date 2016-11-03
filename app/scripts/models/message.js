var Backbone = require('backbone');

var Message = Backbone.Model.extend({
  idAttribute: '_id'
});

var MessageCollection = Backbone.Model.extend({
  model: Message,
  url: 'https://zugzwang.herokuapp.com/classes/messages'
});

module.exports = {
  Message: Message,
  MessageCollection: MessageCollection
};
