const EventEmitter = require('events');

// Create an event emitter instance
const myEmitter = new EventEmitter();

// Register an event listener
myEmitter.on('greet', () => {
    console.log('Hello there!');
});

myEmitter.emit('greet'); // Outputs: Hello there!
// Emit the event