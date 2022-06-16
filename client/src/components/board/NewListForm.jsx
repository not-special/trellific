import React from "react";
import { useState } from "react";


const NewListForm = () => {
  // FROM THE DOCS:
  // When the create a list button tile is clicked, it should add the `selected` 
  // class to the `#new-list.new-list` element. This will display the form. 
  // When either the 'Save' or 'X' buttons are clicked, the `selected` class should be removed.

  const [ showForm, setShowForm ] = useState(false);

  const handleNewListClick = () => {
    toggleForm();
  }

  const toggleForm = () => {
    setShowForm(!showForm);
  }
  
  const selectedClass = showForm ? "new-list selected" : "new-list";

  return (
    <div id="new-list" className={selectedClass} onClick={handleNewListClick}>
      <span>Add a list...</span>
      <input type="text" placeholder="Add a list..." />
      <div>
        <input type="submit" className="button" value="Save"/>
        <i className="x-icon icon"></i>
      </div>
    </div>
  )
};

export default NewListForm;