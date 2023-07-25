class Message {
   // Write code here!
   constructor(name, commands) {
      this.name = name;
      if (!name) { // Same as commandType === undefined
        throw Error("Name parameter required.");
      }
      this.commands = commands;
   }
}

module.exports = Message;