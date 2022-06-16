import React, { useState } from "react"
import { useDispatch } from "react-redux";
import ExistingCards from "./ExistingCards";

/*
### 1.1.1. List titles
The React component should swap the list title `<p>` tag for an `<input>` tag when it is clicked on. 
Pressing enter during editing the title or blurring the input should submit the change and swap the `<p>` back in.

NOTE: It is important to have the `<p>` and `<input>` wrapped in a `<div>` so that the styles will work properly.
*/

const List = ({ list }) => {
  const dispatch = useDispatch();

  const [ showForm, setShowForm ] = useState(false);
  const [ title, setTitle ] = useState("value...");

  const listTitleElement = () => {
    if (showForm) {
      return <input type="text" 
        className="list-title" 
        value={title} 
        onChange={handleTitleChange}
        onBlur={submitNewTitle}
        ></input>
    } else {
      return <p onClick={toggleShowForm} className="list-title">{list.title}</p>
    }
  };

  const submitNewTitle = (e) => {
    console.log("BLURRING...")
    console.log(e)
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const toggleShowForm = () => {
    setShowForm(!showForm);
  };
  
  return (
    <div className="list-wrapper">
      <div className="list-background">
        <div className="list">
          <a className="more-icon sm-icon" href=""></a>
          <div>
            {listTitleElement()}
          </div>
          <div className="add-dropdown add-top">
            <div className="card"></div>
            <a className="button">Add</a><i className="x-icon icon"></i>
            <div className="add-options"><span>...</span></div>
          </div>
          <ExistingCards listId={list._id}/>
          <div className="add-dropdown add-bottom">
            <div className="card">
              <div className="card-info"></div>
              <textarea name="add-card"></textarea>
              <div className="members"></div>
            </div>
            <a className="button">Add</a><i className="x-icon icon"></i>
            <div className="add-options"><span>...</span></div>
          </div>
          <div className="add-card-toggle" data-position="bottom">Add a card...</div>
        </div>
      </div>
    </div>
  )
}

export default List;
