import React,{PropTypes} from 'react';

const AllBooks = (props) => {

const {allBooks, textboxOpacity, textboxData,
        showConfirmation, hideConfirmation,
        addBooksToTradeRequests, signedUp} = props;

if(allBooks.length > 0){

  const mouseEnterEvent = (e) => {//function for texBox movement

    const xOffset=Math.max(document.documentElement.scrollLeft,document.body.scrollLeft);
    const yOffset=Math.max(document.documentElement.scrollTop,document.body.scrollTop);
   const styleObj = {
     left:e.clientX + xOffset,
     top:e.clientY + yOffset,
     opacity:1
   }
const reg = /(\d+)/;

const index = Number(reg.exec(e.target.className)[0]);//gets number to find element in list

const elementData = allBooks[index];
   const textboxData = {//new data for text obj
      title: elementData.title,
      author:elementData.authors[0],
      link:elementData.link,
      index:index
   }

    props.getTextboxData(textboxData);//renews data
    props.textBoxStyle(styleObj);//changes location
  }

  const mouseLeaveEvent = (e) => {
    const styleObj = {
      left:e.clientX,
      top:e.clientY,
      opacity:0
    }
    props.textBoxStyle(styleObj);
  }

  const addBookToProfile = (e) => {
    const reg = /(\d+)/;
    const index = Number(reg.exec(e.target.className)[0]);
    showConfirmation();
    addBooksToTradeRequests(allBooks[index]);
    setTimeout(() => hideConfirmation() , 2000);
  }

  const data = allBooks.map((elem,i) => {
    const id = sessionStorage.getItem('id');//stops displaying owner's books in allbooks
    if(elem.owner !== id){
      const thumbNail = {
        backgroundImage:'url(' + elem.thumbnail + ')'
      }
      if(signedUp){
        return(
          <div key={elem.title + i} className={i +" bookWrapper"} onMouseEnter={mouseEnterEvent} style={thumbNail}>
          <div onClick={addBookToProfile} className=" requestImgWrapper"><img src="../../style/img/white-arrows.png" className={i +" requestImg"} /></div>
          </div>
        )
      }
      else{
        return(
          <div key={elem.title + i} className={i +" bookWrapper"}  onMouseEnter={mouseEnterEvent} style={thumbNail}>
          </div>
        )
      }
    }

  })

  const messageDisplay = () => {
    if(signedUp){
    return <div className="howToMessage">click this image<span id="howToImgWrapper"><img id="howtoImg" src="../../style/img/white-arrows.png"/></span> to request exchange with book owner.</div>
    }
    else{
      return <div></div>
    }
  }

  return(
    <div id="allBooksWrapper" onMouseLeave={mouseLeaveEvent}>
        {messageDisplay()}
        <div id="bookTextBox" style={textboxOpacity}>
          <b>Title:</b> {textboxData.title} <br/>
          <b>Author:</b> {textboxData.author}<br/>
        <b>Link:</b><a href={textboxData.link} target="_blank"> click for information </a>
        </div>
      {data}
    </div>

  )
}
else{
  return <div>awaiting books</div>
}


}

AllBooks.propTypes = {
  allBooks: PropTypes.array.isRequired,
  textboxOpacity: PropTypes.object.isRequired,
  textboxData:PropTypes.object.isRequired
};

export default AllBooks;
