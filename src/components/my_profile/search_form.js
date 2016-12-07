import React, {PropTypes, Component} from 'react';
import {reduxForm, Field} from 'redux-form';


class SearchForm extends Component{

  handleBookSubmit(value){
 this.props.bookQuery(value.query);
  }

  handleDetailsProfileSubmit(e){
    e.preventDefault();
    this.props.addDetailsToMyProfile();
  }

  render(){
    const {handleSubmit,errorOpacity,addDetailsToMyProfile, addBookMessage} = this.props;

    return(
        <form autoComplete="off" id="searchForm" onSubmit={handleSubmit(this.handleBookSubmit.bind(this))}>
          <Field name="query" id="queryInput" placeholder="find books here...." type="text" component="input" label="symbol" />
          <button action="submit" id="submitAddBookButton">search</button><button id="submitProfileDetailsButton" onClick={this.handleDetailsProfileSubmit.bind(this)}>update account</button>
          <div id="queryError" className={errorOpacity}>Sorry, nothing matched your search query. Please try again.</div>
          <div className={addBookMessage} id="addBookMessage">This books has been added to your collection!</div>
        </form>
    )
  }
}

export default reduxForm({
  form:'booksearch'
})(SearchForm)
