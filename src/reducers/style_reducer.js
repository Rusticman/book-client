import {
  TEXTBOX_OPACITY,
  CONFIRMATION_OPACITY,
  ERROR_OPACITY,
  ADD_BOOK_MESSAGE,
  DETAILS_FORM_OPACITY,
  SIGNED_UP_MESSAGE_OPACITY
}from '../actions/types';

const INITIAL_STATE = {
  textboxOpacity:{},
  confirmationOpacity:'hideConfirmation',
  errorOpacity:'errorHide',
  addBookMessage:'hideAddBookMessage',
  detailsFormOpacity:'hideForm',
  signedUpMessageOpacity:'showSignedUpMessage'
}
export default function(state = INITIAL_STATE,action){
  switch(action.type){
    case TEXTBOX_OPACITY:
      return {...state, textboxOpacity:action.payload}
    case CONFIRMATION_OPACITY:
     return {...state, confirmationOpacity:action.payload}
    case ERROR_OPACITY:
     return {...state, errorOpacity:action.payload}
    case ADD_BOOK_MESSAGE:
      return {...state, addBookMessage:action.payload}
    case DETAILS_FORM_OPACITY:
      return {...state, detailsFormOpacity:action.payload}
    case SIGNED_UP_MESSAGE_OPACITY:
      return {...state, signedUpMessageOpacity:action.payload}  
  }

  return state;
}
