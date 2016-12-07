import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions';
import AllBooks from '../components/all_books';

 class AllBooksContainer extends Component {

componentWillMount(){
  this.props.getAllBooks();
}


  render() {



    return (
      <div id="allBooksContainer">
        <AllBooks allBooks={this.props.allBooks}
                  textboxOpacity={this.props.textboxOpacity}
                  textBoxStyle={this.props.textBoxStyle}
                  textboxData={this.props.textboxData}
                  getTextboxData={this.props.getTextboxData}
                  showConfirmation={this.props.showConfirmation}
                  hideConfirmation={this.props.hideConfirmation}
                  addBooksToTradeRequests={this.props.addBooksToTradeRequests}
                  signedUp={this.props.signedUp}
                  />
      </div>
    )

  }


}

function mapStateToProps(state){
  return{
    allBooks:state.data.allBooks,
    textboxOpacity:state.style.textboxOpacity,
    textboxData:state.data.textboxData,
    confirmationOpacity:state.style.confirmationOpacity,
    signedUp:state.auth.signedUp
  }
}

export default connect(mapStateToProps,actions)(AllBooksContainer)
