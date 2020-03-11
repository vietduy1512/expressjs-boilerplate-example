var events = require('events');
var eventEmitter = new events.EventEmitter();
var eventEmitterInstance = events.EventEmitter;

exports.basic = (req, res) => {
  res.writeHead(200, {'Content-Type': 'text/html'});

  var myEventHandler = () => {
    res.write("Basic successfully!");
    res.end();
  }
  // eventEmitter.on('doSomething', myEventHandler);  // if send request twice, this will fail with 'NodeError: write after end' because there are two async eventHandler listening
  eventEmitter.once('doSomething', myEventHandler);
  
  eventEmitter.emit('doSomething');   // Fire 'doSomething' event 
}

exports.usingListener = (req, res) => {
  res.writeHead(200, {'Content-Type': 'text/html'});

  var event = 'doSomething';

  var myEventListener = () => {
    res.write("Using Listener successfully!");
    res.end();
  }

  countListener(eventEmitter, event, "Before add, listeners: ");

  eventEmitter.addListener(event, myEventListener);
  countListener(eventEmitter, event, "After add, listeners: ");
  
  eventEmitter.emit(event);   // Fire 'doSomething' event 

  eventEmitter.removeListener(event, myEventListener);
  countListener(eventEmitter, event, "After remove, listeners: ");
}

function countListener(emitter, event, message) {
  var eventListeners = eventEmitterInstance.listenerCount(emitter, event);
  console.log(message + eventListeners);
}