import React, {PropTypes} from 'react';

const BooksAwaitingApproval = (props) => {

  const {booksAwaitingMyApproval, deleteRequesterApproval,booksIHaveGot} = props;

  if(booksAwaitingMyApproval.length > 0){

    const removeApproval = (e) => {
      const reg = /(\d+)/;
      const index = Number(reg.exec(e.target.className)[0]);
      const requestID = booksAwaitingMyApproval[index].requestID;
      const title = booksAwaitingMyApproval[index].title;//all info required to delete trade request

        deleteRequesterApproval(index, requestID, title);
    }

    const confirmApproval = (e) => {
      const reg = /(\d+)/;
      const index = Number(reg.exec(e.target.className)[0]);

      booksIHaveGot(index);
    }

    const bookApprovalList = booksAwaitingMyApproval.map((elem, i) => {

      return(
        <div key={i + 'bookawaitingapproval'}  className="bookApprovalTags">
          <div>{elem.title} </div>
            <div><i>by {elem.authors[0]}</i></div>
            <div>

              <div onClick={confirmApproval} className={i + " approveImg"}>accept</div>
              <div onClick={removeApproval} className={i + " notApproveImg"}>decline</div>


          </div>
        </div>
      )
    })

    return <div id="bookApprovalContainer">
              <div className="profileTitles">books awaiting my approval:</div>
                {bookApprovalList}
            </div>
  }
  else{
    return <div id="bookApprovalContainer">awaiting data</div>
  }

}

BooksAwaitingApproval.propTypes = {
  booksAwaitingMyApproval: PropTypes.array.isRequired,
};


export default BooksAwaitingApproval;
