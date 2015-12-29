import Server from 'socket.io';

export default function startServer(store) {
  // creates Socket server & regular HTTP Server bound to port 8090
  // port arbitrary but must match port used later to connect from clients
  const io = new Server().attach(8090);


  // What we'll do is subscribe a listener to the store that reads the current state, 
  // turns it into a plain JavaScript object, 
  // and emits it as a state event on the Socket.io server. 
  // The result will be that a JSON-serialized snapshot of the state 
  // is sent over all active Socket.io connections.
  store.subscribe(
    () => io.emit('state', store.getState().toJS())
    // We are now publishing the whole state to everyone whenever any changes occur. 
    // This may end up causing a lot of data transfer. 
    // One could think of various ways of optimizing this 
    // (e.g. just sending the relevant subset, sending diffs instead of snapshots...), 
    // but this implementation has the benefit of being easy to write, 
    // so we'll just use it for our example app.
  );

   // can listen to 'connection' events on our Socket.io server. 
   // We get one each time a client connects. 
   // In the event listener we can emit the current state right away
   io.on('connection', (socket) => {
    socket.emit('state', store.getState().toJS());

    // should also be able to receive updates from them: 
      // Voters will be assigning votes, 
      // and the vote organizer will be moving the contest forward 
      // using the NEXT action.
    // The solution we'll use for this is actually quite simple. 
    // What we can do is simply have our clients emit 'action' events 
    // that we feed directly into our Redux store
    socket.on('action', store.dispatch.bind(store));
    // go beyond "regular Redux", 
    // since we are now essentially accepting remote actions into our store

    // There are some obvious security considerations here. 
      // We're allowing any connected Socket.io client to dispatch any action 
      // into the Redux store.
      // In most real-world cases, 
      // there should be some kind of firewall here, 
      // probably not dissimilar to the one in the Vert.x Event Bus Bridge. 
      // Apps that have an authentication mechanism should also plug it in here
   });
}

// Our server now operates essentially like this:

// 1. A client sends an action to the server.
// 2. The server hands the action to the Redux Store.
// 3. The Store calls the reducer and the reducer executes the logic related to the action.
// 4. The Store updates its state based on the return value of the reducer.
// 5. The Store executes the listener function subscribed by the server.
// 6. The server emits a 'state' event.
// 7. All connected clients - including the one that initiated the original action - receive the new state.

