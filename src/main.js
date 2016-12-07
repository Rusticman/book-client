import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import reduxThunk from 'redux-thunk';
import RequireAuth from './components/auth/require_auth';
import App from './containers/app';
import Homepage from './components/homepage';
import Signout from './components/auth/sign_out';
import AllBooks from './containers/all_books_container';
import MyProfile from './containers/my_profile_container';
import reducers from './reducers';
import { AUTH_USER, SIGNED_UP_MESSAGE_OPACITY, SIGNED_UP_USER } from './actions/types';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

const token = sessionStorage.getItem('token');
const signedUp = sessionStorage.getItem('signedUp');
// If we have a token, consider the user to be signed in
if (token) {
  // we need to update application state
  store.dispatch({ type: AUTH_USER, payload:true });
}

if(signedUp){
  store.dispatch({type:SIGNED_UP_MESSAGE_OPACITY, payload:"hideSignedUpMessage"});
  store.dispatch({type:SIGNED_UP_USER, payload:true})
}

ReactDOM.render(
  <Provider store={store}>
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Homepage}/>
        <Route path="allbooks" component={AllBooks}/>
        <Route path="profile" component={RequireAuth(MyProfile)} />
        <Route path="signout" component={Signout} />
    </Route>
  </Router>

  </Provider>
  , document.getElementById('root'));
