import React, {PropTypes} from 'react';

const BookRequests = (props) => {

const {bookTradeRequests, deleteTradeRequest} = props;

if(bookTradeRequests.length > 0){

const deleteRequest = (e) => {
const index = e.target.className;
const ownerID = bookTradeRequests[e.target.className].owner;
const title = bookTradeRequests[e.target.className].title;//all info required to delete trade request

  deleteTradeRequest(index, title, ownerID);//action to delete trade request
}

const bookTradeRequestList = bookTradeRequests.map((elem,i) => {

  return(
    <div key={i + 'bookrequest'}  className="bookRequestTags">
      <div onClick={deleteRequest} className={i}>delete</div>
      <div>{elem.title} </div>
      <div><i>by {elem.authors[0]}</i></div>
    </div>
  )
})

return(
  <div id="bookRequestsContainer">
    <div className="profileTitles">Book trade requests awaiting owner approval:</div>
 {bookTradeRequestList}
  </div>
)
}
else{
  return <div></div>
}
}

BookRequests.propTypes = {
  bookTradeRequests: PropTypes.array.isRequired,
};


export default BookRequests;
