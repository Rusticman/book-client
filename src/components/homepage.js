import React, { Component } from 'react';
import {connect} from 'react-redux';

 class Homepage extends Component {

showLock(){
  this.props.lock.show();
}

showMessage(){
  const {authenticated} = this.props;
  if(authenticated){
  return  <div id="intro"> </div>
  }
  else{
  return  <div id="intro">To use this service, you need to <a onClick={this.showLock.bind(this)}>login.</a></div>
  }
}


  render() {
    return (
      <div id="homepage">
      <h1>book trade forum</h1>
        <div id="instructionsContainer">
          <div className="instructionBubble">
            1. request book<br/>
            <img className="instructionImg" src="../../style/img/white-arrows.png" alt="book-request" />
          </div>
          <div className="instructionBubble">
            2. await owner approval<br/>
            <img className="instructionImg" src="../../style/img/white-check.png" alt="owner-approval" />

          </div>
          <div className="instructionBubble">
            3. send owner a message<br/>
            <img className="instructionImg" src="../../style/img/speech-bubbles.png" alt="message-owner" />

          </div>
          <div className="instructionBubble">
            4. get book<br/>
            <img className="instructionImg" src="../../style/img/white-orange-book.png" alt="get-book" />

          </div>
        </div>
          {this.showMessage()}
      </div>
    );
  }
}

function mapStateToProps(state){
  return{
    authenticated:state.auth.authenticated
  }
}

export default connect(mapStateToProps)(Homepage)
