import React from "react"
import { useSelector } from "react-redux";
import List from "./List"
import NewListForm from "./NewListForm";

const ExistingLists = () => {
  const lists = useSelector((state) => state.lists);

  return (
    <div id="list-container" className="list-container">
      <div id="existing-lists" className="existing-lists">
      { lists.map(list => <List key={list._id} list={list} />) }
      </div>
      <NewListForm />
    </div>
  )
}

export default ExistingLists
