import axios from 'axios';
import { browserHistory } from 'react-router';
import {
  AUTH_USER,
  SIGNED_UP_USER,
  LOCK,
  ALL_BOOKS,
  TEXTBOX_OPACITY,
  TEXTBOX_DATA,
  BOOK_TRADE_REQUESTS,
  BOOKS_AWAITING_MY_APPROVAL,
  CONFIRMATION_OPACITY,
  MY_BOOKS,
  BOOKS_SEARCHED,
  ERROR_OPACITY,
  ADD_BOOK_MESSAGE,
  DETAILS_FORM_OPACITY,
  SIGNED_UP_MESSAGE_OPACITY,
  BOOKS_I_GOT,
  BOOKS_GIVEN_AWAY
} from './types';

const ROOT_URL = 'https://book-trade-server.herokuapp.com'

export function authLogin(userID,name,provider){
  return function(dispatch){
    axios.post(`${ROOT_URL}/auth/login`, {userID, name, provider})
      .then(response => {
          sessionStorage.setItem('token', response.data.token)
          sessionStorage.setItem('id', response.data.id);

        if(response.data.location){
          sessionStorage.setItem('signedUp', true);
          dispatch({
            type:AUTH_USER,
            payload:true
          })
          dispatch({
            type:SIGNED_UP_USER,
            payload:true
          })
          dispatch({
            type:SIGNED_UP_MESSAGE_OPACITY,
            payload:'hideSignedUpMessage'
          })
        }
        else{
          sessionStorage.setItem('signedUp', false);
          dispatch({
            type:AUTH_USER,
            payload:true
          })
        }
      })
      .catch((err) => console.error('caught error',err))
  }
}

export function logout(){
return function(dispatch){

    sessionStorage.removeItem('token');
    sessionStorage.removeItem('id');
    sessionStorage.removeItem('signedUp');
  dispatch({
    type:AUTH_USER,
    payload:false
  })
  return dispatch({
    type:SIGNED_UP_USER,
    payload:false
  })
}
}

export function authLock(lock){

  return{
    type:LOCK,
    payload:lock
  }
}


export function getAllBooks(){
  return function(dispatch){
    axios.get(`${ROOT_URL}/all/books`)
    .then(response => {
      if(response.data.success){
        return dispatch({type:ALL_BOOKS,
                         payload:response.data.allBooks})
      }
    }).catch((err) => console.error('there was an error retreiving the books:',err))
  }
}


export function textBoxStyle(styleObj){

  return{
    type:TEXTBOX_OPACITY,
    payload:styleObj
  }
}

export function getTextboxData(textboxData){

  return{
    type:TEXTBOX_DATA,
    payload:textboxData
  }
}

export function allBookRequests(){
  return function(dispatch){
    const id =  sessionStorage.getItem('id');
    axios.get(`${ROOT_URL}/all/trade/requests/${id}`, {
        headers: { authorization: sessionStorage.getItem('token') }})
    .then(response => {
      if(response.data.success === true){
        return dispatch({type:BOOK_TRADE_REQUESTS,
          payload:response.data.data})
      } else{
        console.error('there was an error retreiving data')
      }
    })
    .catch(err => {
      console.error('there was an error server side: ',err);
    })
  }

}


export function deleteTradeRequest(index, title, ownerID){
  return function(dispatch){
      const id = sessionStorage.getItem('id');
    axios.post(`${ROOT_URL}/delete/trade/request`,{id:id, index:index, title:title, ownerID:ownerID},{
        headers: { authorization: sessionStorage.getItem('token') }})
        .then(response => {
          if(response.data.success === true){

            return dispatch({ type:BOOK_TRADE_REQUESTS,
                              payload:response.data.data
            })
          }

        })
        .catch(err => {
          console.error('There was an error deleting this book request:', err);
        })
  }
}


export function booksApprovalNeeded(){
  return function(dispatch){
    const id = sessionStorage.getItem('id');

    axios.get(`${ROOT_URL}/all/other/requests/${id}`,{
        headers: { authorization: sessionStorage.getItem('token') }})
        .then(response => {
          if(response.data.success === true){

            return dispatch({type:BOOKS_AWAITING_MY_APPROVAL,
                             payload:response.data.data})
          }
        })
        .catch(err => {
          console.error('there was an error retrieving book data:', err);
        })
  }
}

export function deleteRequesterApproval(index, requestID, title){
return function(dispatch){
  const id = sessionStorage.getItem('id');

  axios.post(`${ROOT_URL}/delete/approval/request`,{id:id,index:index, requestID:requestID, title:title},{
      headers: { authorization: sessionStorage.getItem('token') }})
      .then(response => {
        if(response.data.success === true){
          return dispatch({
            type:BOOKS_AWAITING_MY_APPROVAL,
            payload:response.data.data
          })
        }
      })
      .catch(err => {
        console.error('there was an error deleting that request:', err);
      })
}

}


export function showConfirmation(){

  return{
    type:CONFIRMATION_OPACITY,
    payload: 'showConfirmation'
  }
}


export function hideConfirmation(){

  return{
    type:CONFIRMATION_OPACITY,
    payload: 'hideConfirmation'
  }
}


export function addBooksToTradeRequests(bookData){
  return function(dispatch){
    const id = sessionStorage.getItem('id');
    const ownerID = bookData.owner;
    axios.post(`${ROOT_URL}/request/book`,{id:id, ownerID:ownerID, book:bookData}, {
        headers: { authorization: sessionStorage.getItem('token') }})
        .then(response => {
             return dispatch({
               type:BOOK_TRADE_REQUESTS,
               payload:response.data.data
             })
        })
        .catch(err => {
          console.error('there was an error adding book to trade requests:', err);
        })
  }
}

export function getMyBooks(){
  return function(dispatch){

    const id = sessionStorage.getItem('id');

    axios.get(`${ROOT_URL}/users/books/${id}`)
    .then(response => {
      if(response.data.success === true){
          dispatch({
            type:BOOKS_I_GOT,
            payload:response.data.booksIGot
          })
          dispatch({type:BOOKS_GIVEN_AWAY,
                    payload:response.data.booksGivenAway
                  })
        return dispatch({
          type:MY_BOOKS,
          payload:response.data.myBooks
        })
      }
    })
    .catch(err => {
      console.error('there was an error retrieving your books:', err);
    })
  }
}

export function deleteBookIOwn(index){
  return function(dispatch){

    const id = sessionStorage.getItem('id');
    axios.post(`${ROOT_URL}/delete/users/book`,{index:index, id:id},{
        headers: { authorization: sessionStorage.getItem('token') }})
        .then(response => {
          if(response.data.success === true){

            return dispatch({
              type:MY_BOOKS,
              payload:response.data.data
            })
          }
        })
        .catch(err => {
          console.error('there was an error deleting book:', err);
        })
  }
}

export function bookQuery(query){
  return function(dispatch){
    axios.get(`${ROOT_URL}/search/books/${query}`)
    .then(response => {
        if(response.data.data.length  < 1){
          dispatch({
            type:ERROR_OPACITY,
            payload:'errorShow'
          })
          return setTimeout(() => {
            dispatch({
            type:ERROR_OPACITY,
            payload:'errorHide'
          })
        },2000);
        }
       else{
         return dispatch({
           type:BOOKS_SEARCHED,
           payload:response.data.data
         })
         }
        }).catch(err => {
      console.error('there was an error retrieving the search query:', err);
    })
  }
}


export function addBookToMyCollection(book){
  return function(dispatch){
    const bookData = [book];
    const id = sessionStorage.getItem('id');

    axios.post(`${ROOT_URL}/add/books`,{id:id, bookData:bookData},{
        headers: { authorization: sessionStorage.getItem('token') }})
        .then(response => {
          if(response.data.locationRequired){
            return dispatch({
               type:DETAILS_FORM_OPACITY,//this is to show the form for location & email details
               payload:'showForm'
             })
          }
          else{
            dispatch({
              type:MY_BOOKS,
              payload:response.data.data
            })
            dispatch({
              type:ADD_BOOK_MESSAGE,
              payload:'showAddBookMessage'
            })
            setTimeout(() => dispatch({type:ADD_BOOK_MESSAGE, payload:'hideAddBookMessage'}),2000)
              }
        })
        .catch(err => {
          console.error('there was an error adding new book:', err);
        })
  }
}


export function locationAndEmailDetails(location, email){
 return function(dispatch){
   const id = sessionStorage.getItem('id');

   axios.post(`${ROOT_URL}/add/details`, {id:id, location:location, email:email},{
       headers: { authorization: sessionStorage.getItem('token') }})
       .then(response => {
         if(response.data.success){
           dispatch({
             type:DETAILS_FORM_OPACITY,
             payload:'hideForm'
           })
         }
       })
       .catch(err => {
         console.error('there was an error trying to save details:', err);
       })
 }
}

export function booksIHaveGot(index){
  return function(dispatch){
    const id = sessionStorage.getItem('id');

    axios.post(`${ROOT_URL}/request/approved`,{id:id, index:index},{
        headers: { authorization: sessionStorage.getItem('token') }})
        .then(response => {
          dispatch({
            type:BOOKS_GIVEN_AWAY,
            payload:response.data.booksGivenAway
          })
          dispatch({
            type:BOOKS_AWAITING_MY_APPROVAL,
            payload:response.data.booksAwaitingApproval
          })
        })
        .catch(err => console.error('there was an error approving book:', err))
  }
}


export function deleteApprovedBooks(boolean, index){
  //boolean decides if its given away or given
  return function(dispatch){
    const id = sessionStorage.getItem('id');
    axios.post(`${ROOT_URL}/delete/approved/book`,{boolean:boolean, index:index, id:id },{
        headers: { authorization: sessionStorage.getItem('token') }})
    .then(response => {
      if(boolean){
        return dispatch({
          type:BOOKS_GIVEN_AWAY,
          payload:response.data.booksGivenAway
        })
      }
      else{
        return dispatch({
          type:BOOKS_I_GOT,
          payload:response.data.booksIGot
        })
      }
    })
    .catch(err => console.error('there was a problem deleting the approved book:',err))

  }
}

export function addDetailsToMyProfile(){
  return {
     type:DETAILS_FORM_OPACITY,//this is to show the form for location & email details
     payload:'showForm'
   }
}
