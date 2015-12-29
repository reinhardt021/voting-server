import {createStore} from 'redux';
import reducer from './reducer';

export default function makeStore() {
  return createStore(reducer);
}

// So, the Redux store ties things together into something 
// we'll be able to use as the central point of our application: 
// It holds the current state, and over time can receive actions 
// that evolve the state from one version to the next, 
// using the core application logic we have written and exposed through the reducer.

// Question: How many variables do you need in a Redux application?
// Answer: One. The one inside the store.

// This notion may sound ludicrous at first 
// - at least if you haven't done much functional programming. 
// How can you do anything useful with just one variable?

// But the fact is we don't need any more variables than that. 
// The current state tree is the only thing that varies over time in our core application. 
// The rest is all constants and immutable values.


