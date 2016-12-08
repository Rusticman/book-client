import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions';
import Header from '../components/header';
import Footer from '../components/footer';


 class App extends Component {
  componentWillMount(){

    const options = {
      allowedConnections: ['twitter', 'facebook'],
      auth: {
         redirectUrl: 'https://book-trade-rustic.herokuapp.com/allbooks',
         responseType: 'token'
    }
    }



    const lock = new Auth0Lock(
      process.env.AUTH0_ID,
      process.env.AUTH0_DOMAIN,
      options
    );
    this.lock = lock;

    lock.on("authenticated", function(authResults){

      lock.getProfile(authResults.idToken, function(err, profile){
        if(err){
          console.error('there was an error authenticating user',err);
          throw err;
        }
          this.props.authLogin(profile.user_id,profile.name,profile.identities[0].provider)

      }.bind(this));
    }.bind(this));

this.props.authLock(this.lock);
  }


  render() {
    const childrenWithProps = React.cloneElement(this.props.children, this.props);

    return (
      <div id="app">
       <div className="page-wrap">
        <Header lock={this.lock}
                auth={this.props.auth}
                logout={this.props.logout}
                confirmationOpacity={this.props.confirmationOpacity}
                signedUp={this.props.signedUp}
                signedUpMessageOpacity={this.props.signedUpMessageOpacity}
                signedUpMessageTransparency={this.props.signedUpMessageTransparency}/>
        {childrenWithProps}
       </div>
       <Footer />
      </div>
    );
  }
}

function mapStateToProps(state){

  return{
    auth:state.auth.authenticated,
    lock:state.auth.lock,
    signedUp:state.auth.signedUp,
    signedUpMessageOpacity:state.style.signedUpMessageOpacity,
    confirmationOpacity:state.style.confirmationOpacity
  }
}


export default connect(mapStateToProps, actions)(App);
