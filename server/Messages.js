const Messages = {

  storage: [],
  messageId: 0,

  add: function add(message) {
    message = JSON.parse(message);
    message['createdAt'] = Date.now();
    Messages.messageId++;
    message['message_id'] = Messages.messageId;
    Messages.storage.push(message);
    console.log(Messages.storage);
  }

};

module.exports.messages = Messages.storage;
module.exports.addMessage = Messages.add;