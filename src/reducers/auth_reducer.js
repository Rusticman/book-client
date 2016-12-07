import {
  AUTH_USER,
  LOCK,
  SIGNED_UP_USER
}from '../actions/types';

const INITIAL_STATE = {
  authenticated:false,
  lock:null,
  signedUp:false
}
export default function(state = INITIAL_STATE,action){
  switch(action.type){
    case AUTH_USER:
      return {...state, authenticated:action.payload}
    case LOCK:
      return {...state, lock:action.payload}
    case SIGNED_UP_USER:
      return {...state, signedUp:action.payload}  
  }

  return state;
}
