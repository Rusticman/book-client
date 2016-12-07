import React, {PropTypes} from 'react';


const BooksSearched = (props) => {

  const {   booksSearched, textboxOpacity,
            textboxData, getTextboxData,
            textBoxStyle,
            addBookToMyCollection} = props;

  if(booksSearched.length > 0 ){

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

  const elementData = booksSearched[index];
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
    props.textBoxStyle(styleObj);//changes location
  }

  const addBookToCollection = (e) => {
    const reg = /(\d+)/;

    const index = Number(reg.exec(e.target.className)[0]);//gets number to find element in list

      addBookToMyCollection(booksSearched[index]);
  }


  const booksSearchedlist = booksSearched.map((elem,i) => {
    const thumbNail = {
      backgroundImage:'url(' + elem.thumbnail + ')'
    }
    return(
      <div key={"booksSearched" + i} className={i +" bookWrapper"}  onMouseEnter={mouseEnterEvent} style={thumbNail}>
      <div onClick={addBookToCollection} className={i + " plusButton"}>+</div>
      </div>
    )
})

  return(
    <div id="searchedBooksWrapper" onMouseLeave={mouseLeaveEvent}>
    <div className="howToMessage">click this<span id="howToPlusButton">+</span> to add to my books.</div>
      <div id="searchedBookTextBox" style={textboxOpacity}>
        <b>Title:</b> {textboxData.title} <br/>
        <b>Author:</b> {textboxData.author}<br/>
        <b>Link:</b><a href={textboxData.link} target="_blank"> click for more info </a>
      </div>
    {booksSearchedlist}

    </div>
  )
}
else{
  return(
    <div></div>
  )
}

BooksSearched.propTypes = {
  booksSearched: PropTypes.array.isRequired
}
}

export default BooksSearched;
