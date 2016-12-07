import React, {PropTypes} from 'react';

const BooksIOwn = (props) => {

const {myBooks, deleteBookIOwn} = props;

const removeBook = (e) => {
  const index = e.target.className;
  deleteBookIOwn(index);
}

if(myBooks.length > 0 ){
  const myBooksList = myBooks.map((elem,i) => {

    return(
      <div key={i + 'mybooks'}  className="myBookTags">
      <div onClick={removeBook} className={i}>delete</div>
      <div>{elem.title}</div>
      <div><i>by {elem.authors[0]}</i></div>
      </div>
    )
  })

  return(
    <div id="booksOwnedContainer">
    <div className="profileTitles">My books:</div>
    {myBooksList}
    </div>
  )
} else{
  return <div > </div>
}


}

BooksIOwn.propTypes = {
  myBooks: PropTypes.array.isRequired
}
export default BooksIOwn;
