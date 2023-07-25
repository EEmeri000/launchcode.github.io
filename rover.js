const Command = require('./command.js');
const Message = require('./message.js');


class Rover {
    
  // create constructor that gets tests to pass (Test 7)
  constructor(position, mode = "NORMAL", generatorWatts = 110) {
    this.position = position;
    this.mode = mode;
    this.generatorWatts = generatorWatts;
  }
  // create receiveMessage(message) method
  receiveMessage(message) {
    // create response object, and set its message property (Test 8)
    let response = {
      message: message.name,
    
    // add a results property to response object, as an empty array (Test 9)
      results: []
    };
    
    // for each command in the message, add an item to the results array (Test 9)
for (let command of message.commands) {
      let result = {};

      // for each command, add {} (an empty object) (Test 9)

      // if the command.commandType is STATUS_CHECK (Test 10) 
if (command.commandType === "STATUS_CHECK") {
        // create a result object (empty to start)

        // set result.completed = true;
result.completed = true;
        // add a roverStatus object to the result object, with the status values of the rover
result.roverStatus = {
          mode: this.mode,
          generatorWatts: this.generatorWatts,
          position: this.position
        };
        // add the result object to the results array

      // if command.commandType is MODE_CHANGE (Test 11)
 } else if (command.commandType === "MODE_CHANGE") {
        // create a result obj

        // set result.completed = true
result.completed = true;
        // update rover's mode
this.mode = command.value;
        // add result to the results array

    // if command.commandType is MOVE (Test 12)

      // if rover mode is LOW_POWER, don't move and send competed = false in response
} else if (command.commandType === "MOVE") {
  if (this.mode === "LOW_POWER") {
          result.completed = false;

      // else if mode is NORMAL, change the position and send completed = true in response (Test 13)
} else {
          result.completed = true;
          this.position = command.value;
        }
      }

      response.results.push(result);
    }  
    // return the response object
      return response;
  }
}

module.exports = Rover;