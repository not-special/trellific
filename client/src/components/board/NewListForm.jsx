import React, {useState} from "react";
import { useDispatch } from "react-redux";
import { createList } from "../../features/lists/lists";


const NewListForm = ({ boardId }) => {
  const dispatch = useDispatch();

  const [ showForm, setShowForm ] = useState(false);
  const [ title, setTitle ] = useState("");

  const toggleForm = () => {
    setShowForm(!showForm);
  }

  const handleCloseForm = () => {
    toggleForm();
    setTitle("");
  }

  const handleTitleChange = (e) => {
    setTitle(e.target.value)
  }

  const handleTitleSubmit = () => {
    dispatch(createList({title, boardId, callback: handleCloseForm}))
  }
  
  const selectedClass = showForm ? "new-list selected" : "new-list";

  return (
    <div id="new-list" className={selectedClass}>
      <span onClick={toggleForm}>Add a list...</span>
      <input type="text" placeholder="Add a list..." value={title} onChange={handleTitleChange} />
      <div>
        <input type="submit" className="button" value="Save" onClick={handleTitleSubmit}/>
        <i className="x-icon icon" onClick={handleCloseForm}></i>
      </div>
    </div>
  )
};

export default NewListForm;