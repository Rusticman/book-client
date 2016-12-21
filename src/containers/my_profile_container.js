import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions';
import BookTradeRequests from '../components/my_profile/book_trade_requests';
import BooksAwaitingApproval from '../components/my_profile/books_awaiting_approval';
import BooksIOwn from '../components/my_profile/books_i_own';
import SearchForm from '../components/my_profile/search_form';
import BooksSearched from '../components/my_profile/books_searched';
import FurtherDetailsForm from '../components/my_profile/further_details_form';
import TradeBooks from '../components/my_profile/trade_books';

 class MyProfileContainer extends Component {

componentWillMount(){
  this.props.allBookRequests();
  this.props.booksApprovalNeeded();
  this.props.getMyBooks();
}


  render() {
    return (
      <div id="myProfileContainer">
          <FurtherDetailsForm detailsFormOpacity={this.props.detailsFormOpacity}
                              detailsFormSlider={this.props.detailsFormSlider}
                              locationAndEmailDetails={this.props.locationAndEmailDetails}
                              formMessage={this.props.formMessage}
                              showFormMessage={this.props.showFormMessage}/>
          <SearchForm bookQuery={this.props.bookQuery}
                      errorOpacity={this.props.errorOpacity}
                      showError={this.props.showError}
                      addBookMessage={this.props.addBookMessage}
                      detailsFormSlider={this.props.detailsFormSlider}/>
          <BooksSearched booksSearched={this.props.booksSearched}
                         textboxOpacity={this.props.textboxOpacity}
                         textboxData={this.props.textboxData}
                         getTextboxData={this.props.getTextboxData}
                         textBoxStyle={this.props.textBoxStyle}
                         addBookToMyCollection={this.props.addBookToMyCollection}/>
          <BooksIOwn myBooks={this.props.myBooks}
                     deleteBookIOwn={this.props.deleteBookIOwn}/>
          <BookTradeRequests bookTradeRequests={this.props.bookTradeRequests}
                             deleteTradeRequest={this.props.deleteTradeRequest}/>
          <BooksAwaitingApproval booksAwaitingMyApproval={this.props.booksAwaitingMyApproval}
                                 deleteRequesterApproval={this.props.deleteRequesterApproval}
                                 booksIHaveGot={this.props.booksIHaveGot}/>
          <TradeBooks booksGivenAway={this.props.booksGivenAway}
                      booksIGot={this.props.booksIGot}
                      deleteApprovedBooks={this.props.deleteApprovedBooks}/>
      </div>
    )

  }


}

function mapStateToProps(state){
  return{
    bookTradeRequests:state.data.bookTradeRequests,
    booksAwaitingMyApproval:state.data.booksAwaitingMyApproval,
    myBooks:state.data.myBooks,
    booksSearched:state.data.booksSearched,
    errorOpacity:state.style.errorOpacity,
    textboxData:state.data.textboxData,
    textboxOpacity:state.style.textboxOpacity,
    addBookMessage:state.style.addBookMessage,
    detailsFormOpacity:state.style.detailsFormOpacity,
    booksGivenAway:state.data.booksGivenAway,
    booksIGot:state.data.booksIGot,
    formMessage:state.style.formMessage
  }
}

export default connect(mapStateToProps,actions)(MyProfileContainer)
