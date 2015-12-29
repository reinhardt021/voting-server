import {List, Map} from 'immutable'; // note that the List and Map are taken here so that dont have to use the constructor with keyword new

export const INITIAL_STATE = Map(); // this is the initial state of the application as if an empty map is given

export function setEntries(state, entries) {
  return state.set('entries', List(entries));
}

function getWinners(vote) {
  if (!vote) return [];
  // note that .get() gets the value related to the key within the vote Map
  const [a, b] = vote.get('pair'); 
  // note that .getIn() goes into a nested data structure pathto grab a value
  // if not set then sets to 0
  const aVotes = vote.getIn(['tally', a], 0);
  const bVotes = vote.getIn(['tally', b], 0);
  if      (aVotes > bVotes) return [a];
  else if (aVotes < bVotes) return [b];
  else                      return [a,b];
}

export function next(state) {
  const entries = state.get('entries')
                        .concat(getWinners(state.get('vote')));
  if (entries.size === 1) {
    // We could have just returned Map({winner: entries.first()}) here. 
    // But instead we still take the old state as the starting point 
    // and explicitly remove 'vote' and 'entries' keys from it. 
    // The reason for this is future-proofing: 
    // At some point we might have some unrelated data in the state, 
    // and it should pass through this function unchanged
    // generally a good idea in these state transformation functions 
    // to always morph the old state into the new one 
    // instead of building the new state completely from scratch
    return state.remove('vote')
                  .remove('entries')
                  .set('winner', entries.first());
  } else {
    return state.merge({
      vote: Map({pair: entries.take(2)}),
      entries: entries.skip(2)
    });  
  }
}

export function vote(voteState, entry) {
  return voteState.updateIn(
   // reaches into the nested data structure path  and apply this function there
   // if there are keys missing along the path, create new Maps in their place
   ['tally', entry], 
   
   // if the value at the end is missing, initialize it with 0
    0,  
    tally => tally + 1
  );

}



