import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';


 class Header extends Component {


showLock(){
  this.props.lock.show();
}


renderLinks(){
const {auth} = this.props;
  if(auth){
  return  [<Link key={"link1"}  className="headerLinks" to="/">homepage</Link>,
    <Link key={"link2"}  className="headerLinks" to="/allbooks">all books </Link>,
    <Link key={"link3"} className="headerLinks" to="/profile">my profile </Link>,
    <Link key={"link4"} className="headerLinks" to="/signout">signout</Link>]
  }
  else{
    return [<Link key={"link7"}  className="headerLinks" to="/">homepage</Link>,
      <Link key={"link5"} className="headerLinks" to="/allbooks">all books </Link>,
      <Link key={"link6"} className="headerLinks" onClick={this.showLock.bind(this)}>login</Link>]

  }
}

  render(){
  const  {confirmationOpacity, signedUpMessageOpacity} = this.props;
    return (
      <div id="header">
        <img className="bookLogo" src="../../style/img/blue-book.png" alt="book-logo" />
        <div id="bookAddedConfirmation" className={confirmationOpacity}>This book has been added to your profile.</div>
        <div id="signUpMessage" className={signedUpMessageOpacity}>Go to your profile page to update your account<br/> before selecting books you'd like to exchange.</div>
        <div id="headerLinkContainer">
          {this.renderLinks()}
        </div>
      </div>
    );

  }
};

export default Header;
