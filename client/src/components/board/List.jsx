import React, { useState } from "react"
import { useDispatch } from "react-redux";
import ExistingCards from "./ExistingCards";
import { editList } from "../../features/lists/lists";
import { createCard } from "../../features/cards/cards";

const List = ({ list, activeAddCardList, setActiveAddCardList }) => {
  const dispatch = useDispatch();

  const [ showForm, setShowForm ] = useState(false);
  const [ title, setTitle ] = useState(list.title);
  const [ newCardTitle, setNewCardTitle ] = useState("");

  const handleNewCardTitleChange = (e) => {
    setNewCardTitle(e.target.value);
  };

  const handleSubmitNewCardTitle = () => {
    dispatch(createCard({ listId: list._id, title: newCardTitle, callback: toggleShowCardForm }));
    setNewCardTitle("");
  }

  const listTitleElement = () => {
    if (showForm) {
      return <input type="text" 
        className="list-title" 
        value={title} 
        onChange={handleTitleChange}
        onKeyUp={handleSubmitNewTitle}
        onBlur={handleSubmitNewTitle}
        ></input>
    } else {
      return <p onClick={toggleShowForm} className="list-title">{list.title}</p>
    }
  };

  const handleSubmitNewTitle = (e) => {
    if (e.type !== "keyup" || e.key === "Enter") {
      dispatch(editList({ listId: list._id, title, callback: toggleShowForm }));
    }
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const toggleShowForm = () => {
    setShowForm(!showForm);
  };

  const isActiveList = () => {
    return list._id === activeAddCardList;
  }

  const toggleShowCardForm = () => {
    isActiveList() ? setActiveAddCardList(null) : setActiveAddCardList(list._id);
    setNewCardTitle("");
  }

  const listWrapperClass = isActiveList() ? "list-wrapper add-dropdown-active" : "list-wrapper"
  const addDropDownClass = isActiveList() ? "add-dropdown add-bottom active-card" : "add-dropdown add-bottom"

  return (
    <div className={listWrapperClass}>
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
          <div className={addDropDownClass}>
            <div className="card">
              <div className="card-info"></div>
              <textarea name="add-card" placeholder="Add card title..." value={newCardTitle} onChange={handleNewCardTitleChange}></textarea>
              <div className="members"></div>
            </div>
            <a className="button" onClick={handleSubmitNewCardTitle}>Add</a>
            <i className="x-icon icon" onClick={toggleShowCardForm}></i>
            <div className="add-options"><span>...</span></div>
          </div>
          <div className="add-card-toggle" data-position="bottom" onClick={toggleShowCardForm}>Add a card...</div>
        </div>
      </div>
    </div>
  )
}

export default List;
