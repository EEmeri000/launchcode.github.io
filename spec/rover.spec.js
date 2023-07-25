const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {

  // Test 7: "constructor sets position and default values for mode and generatorWatts"
  it("constructor sets position and default values for mode and generatorWatts", function(){
    // create a new Rover object w/ a given initial position
  let rover = new Rover(500);
    
    // check that rover's position is correct
  expect(rover.position).toEqual(500);
    
    // check that mode is correct
  expect(rover.mode).toEqual("NORMAL");
    // check that generatorWatts is correct
expect(rover.generatorWatts).toEqual(110);
  });

  // Test 8
  it("response returned by receiveMessage contains name of message", function(){
  let message = new Message("MSG005", []);
  let rover = new Rover(78);
  let response = rover.receiveMessage(message);

    // verify that response.message has the correct value
    expect(response.message).toEqual("MSG005")
  });

  // Test 9
  it("response returned by receiveMessage includes two results if two commands are sent in the message", function(){

    // build test objects: 1) Message w/ 2 commands and 2) a rover
 let commands = [
      new Command('STATUS_CHECK'),
      new Command('MODE_CHANGE', 'LOW_POWER')
   ];
  let message = new Message('Checking Status, Changing Mode', commands);
    let rover = new Rover(68);
    
    // pass the message to the rover by calling rover.receiveMessage
  let response = rover.receiveMessage(message);
    
    // verify that response.results.length is 2
  expect(response.results.length).toEqual(2);
  });

  // TEST 10
  it("responds correctly to status check command", function(){

    // build test objects: 1) Message w/ STATUS_CHECK command and 2) a rover
  let commands = [new Command('STATUS_CHECK')];
  let message = new Message('Checking Status', commands);
  let rover = new Rover(200);

    // pass the message to the rover by calling rover.receiveMessage
  let response = rover.receiveMessage(message);
    // verify response.results:
    //   - get the single item (the result) from the array
  let result = response.results[0];   
    //   - verify that the result has a completed property that is true
    expect(result.completed).toBe(true);

    //   - verify that the result has a roverStatus property w/ correct values (3 tests)
expect(result.roverStatus).toEqual({
      position: 200,
      mode: "NORMAL",
      generatorWatts: 110
    });
  });

  // Test 11
  it("responds correctly to mode change command", function(){

    // build test objects: 1) Message w/ MODE_CHANGE command and 2) a rover
  let commands = [new Command('MODE_CHANGE', 'LOW_POWER')];
  let message = new Message('Shifting to LOW_POWER mode', commands);
  let rover = new Rover(90);
    // pass the message to the rover by calling rover.receiveMessage
  let response = rover.receiveMessage(message);
    // verify that response.results contains the correct object 
  let result = response.results[0];
  expect(result.completed).toBe(true);
    // verify that the rover's mode property was updated 
    expect(rover.mode).toEqual('LOW_POWER');
  });

  // Test 12
  it("responds with false completed value when attempting to move in LOW_POWER mode", function(){

    // build rover object
  let rover = new Rover(734);
    // send a message+command to change into LOW_POWER mode
  let commands = [new Command('MODE_CHANGE', 'LOW_POWER')];
  let message = new Message('Shifting to LOW_POWER mode', commands);
    rover.receiveMessage(message);

    // send a message+command to attempt to MOVE the rover
  commands = [new Command('MOVE', 50)];
  message = new Message('Attempting Traversal', commands);
  let response = rover.receiveMessage(message);
    // verify that the given result object has completed === false
  let result = response.results[0];
  expect(result.completed).toBe(false);

    // verify that the rover's position did not change
  expect(rover.position).toEqual(734);  
  });

  // Test 13
  it("responds with position for move command", function(){

    // build a rover, and also build a message with a MOVE command
  let commands = [new Command('MOVE', 50)];
  let message = new Message('Attempting Traversal', commands);
  let rover = new Rover(42);

    // send the message to the rover
  let response = rover.receiveMessage(message);

    // verify that the result object has completed === true
  let result = response.results[0];
  expect(result.completed).toBe(true);

    // verify that the rover has the correct position value 
  expect(rover.position).toEqual(50);    
  });

});
