const Messages = {

  storage: [],

  add: function add(message) {
    console.log(`${message} added`);
    Messages.storage.push(message);
    console.log('storage: ', Messages.storage);
  }

};

module.exports.messages = Messages.storage;
module.exports.addMessage = Messages.add;