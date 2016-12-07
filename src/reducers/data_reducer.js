import {
  ALL_BOOKS,
  TEXTBOX_DATA,
  BOOK_TRADE_REQUESTS,
  BOOKS_AWAITING_MY_APPROVAL,
  MY_BOOKS,
  BOOKS_SEARCHED,
  BOOKS_I_GOT,
  BOOKS_GIVEN_AWAY
}from '../actions/types';

const INITIAL_STATE = {
  allBooks:[],
  textboxData:{},
  bookTradeRequests:[],
  booksAwaitingMyApproval:[],
  myBooks:[],
  booksSearched:[],
  booksIGot:[],
  booksGivenAway:[]
}
export default function(state = INITIAL_STATE,action){
  switch(action.type){
    case ALL_BOOKS:
      return {...state, allBooks:action.payload}
    case TEXTBOX_DATA:
      return {...state, textboxData:action.payload}
    case BOOK_TRADE_REQUESTS:
     return {...state, bookTradeRequests:action.payload}
    case BOOKS_AWAITING_MY_APPROVAL:
      return {...state, booksAwaitingMyApproval:action.payload}
    case MY_BOOKS:
      return {...state, myBooks:action.payload}
    case BOOKS_SEARCHED:
      return {...state, booksSearched:action.payload}
    case BOOKS_I_GOT:
      return {...state, booksIGot:action.payload}
    case BOOKS_GIVEN_AWAY:
      return {...state, booksGivenAway:action.payload}
  }

  return state;
}
