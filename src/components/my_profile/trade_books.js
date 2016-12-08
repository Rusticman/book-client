import React, {PropTypes} from 'react';


const TradeBooks = (props) => {

const{booksGivenAway, booksIGot, deleteApprovedBooks} = props;

const deleteGivenTag = (e) => {
  const reg = /(\d+)/;
  const index = Number(reg.exec(e.target.className)[0]);//gets number to find element in list
  deleteApprovedBooks(true,index);
}

const deleteGotTag = (e) => {
  const reg = /(\d+)/;
  const index = Number(reg.exec(e.target.className)[0]);//gets number to find element in list
  deleteApprovedBooks(false,index);
}

if(booksGivenAway.length > 0 || booksIGot.length > 0){
  const giveToRequesterList = booksGivenAway.map((elem, i) => {

    return(
      <div key={i+ "booksToGive"} className="booksGivenAwayTags">
      <b>Book</b>:{elem.title}<br/>
      <b>Requester:</b>{elem.requesterName}<br/>
      <b>Email address:</b>{elem.requesterEmail}<br/>
      <b>Location:</b>{elem.requesterLocation}<br/>
      <button onClick={deleteGivenTag} className={i+" deleteBooksGivenButton"}>delete</button>
      </div>
    )
  })
const receiveFromOwnerList = booksIGot.map((elem, i) => {

  return(
    <div key={i+ "booksToGive"} className="booksGivenAwayTags">
      <b>Book</b>:{elem.title}<br/>
      <b>Owner:</b>{elem.ownerName}<br/>
      <b>Email address:</b>{elem.requesterEmail}<br/>
      <b>Location:</b>{elem.requesterLocation}<br/>
      <div onClick={deleteGotTag} className={i+" deleteBooksGivenButton"}>delete</div>
    </div>
  )
})

  return(
    <div id="tradeBooksContainer">
<div>Books to be traded:</div>
<div id="giveToRequesterWrapper">
  <div  className="profileTitles">Get in contact with the book's requester:</div>
{giveToRequesterList}
</div>
<div id="getFromOwnerWrapper">
  <div  className="profileTitles">Get in contact with the book's owner:</div>
  {receiveFromOwnerList}
</div>

    </div>
  )
} else{
  return <div></div>
}
}

export default TradeBooks;
