import React, { useState } from "react"
import { useSelector } from "react-redux";
import List from "./List"
import NewListForm from "./NewListForm";

const ExistingLists = ({ boardId }) => {
  const lists = useSelector((state) => state.lists);

  const [activeAddCardList, setActiveAddCardList] = useState(null);

  return (
    <div id="list-container" className="list-container">
      <div id="existing-lists" className="existing-lists">
      { lists.map(list => <List 
        activeAddCardList={activeAddCardList} 
        setActiveAddCardList={setActiveAddCardList} 
        key={list._id} 
        list={list} />
      )}
      </div>
      <NewListForm boardId={boardId}/>
    </div>
  )
}

export default ExistingLists
