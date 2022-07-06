import React, { useState } from "react"
import { useSelector } from "react-redux";
import List from "./List"
import NewListForm from "./NewListForm";

const ExistingLists = ({ boardId }) => {
  const lists = useSelector((state) => state.lists);

  const [activeAddCardList, setActiveAddCardList] = useState(null);

  const sortedLists = () => {
    const listsCopy = [...lists]; // https://stackoverflow.com/questions/64957735/typeerror-cannot-assign-to-read-only-property-0-of-object-object-array-in
    listsCopy.sort((a, b) => a.position - b.position );
    return listsCopy;
  }

  return (
    <div id="list-container" className="list-container">
      <div id="existing-lists" className="existing-lists">
      { sortedLists().map(list => <List 
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
