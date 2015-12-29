import {setEntries, next, vote, INITIAL_STATE} from './core';

// set default as initial state
export default function reducer(state = INITIAL_STATE, action) {
  // Figure out which function to call and call it
  switch (action.type) {
  case 'SET_ENTRIES':
    return setEntries(state, action.entries);
  case 'NEXT':
    return next(state);
  case 'VOTE':
    return state.update('vote', voteState => vote(voteState, action.entry)); 
  }
  return state; // Note that if the reducer doesn't recognize the action, it just returns the current state
}

// An important additional requirement of reducers is that if they are called with an undefined state, 
// they know how to initialize it to a meaningful value. 
// In our case, the initial value is a Map. 
// So, giving an undefined state should work as if an empty Map had been given

// What is interesting about the way this reducer works is 
// how it can be generically used to take the application 
// from one state to the next, given any type of action

// Actually, given a collection of past actions, 
// you can actually just reduce that collection into the current state

// That's why the function is called a reducer: 
// It fulfills the contract of a reduce callback function

// This ability to batch and/or replay a collection of actions 
// is a major benefit of the action/reducer model of state transitions, 
// when compared to calling the core functions directly. 
// For example, given that actions are just objects that you can also serialize to JSON, 
// you could easily send them over to a Web Worker and run your reducer logic there. 
// Or you can even send them over the network, as we're going to do later

// Note that we are using plain objects as actions instead of Immutable data structures. 
// This is something Redux actually requires us to do.

// It is a much better idea to, whenever you can, 
// make operations work on the smallest piece (or subtree) of the state possible. 
// What we're talking about is modularization: 
// Have the functionality that deals with a given piece of data
//  deal with only that part of the data, as if the rest didn't exist.

// This is a small example of the kind of pattern 
// that becomes much more important the larger an application gets: 
// The main reducer function only hands parts of the state to lower-level reducer functions. 
// We separate the job of finding the right location in the state tree
//  from applying the update to that location




