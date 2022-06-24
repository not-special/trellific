import React, { useState } from "react"
import { useDispatch } from "react-redux";
import { editCard } from "../../features/cards/cards";
import { cleanCard } from "../../lib/Utils";

const Description = ( { activeCard }) => {
  const dispatch = useDispatch();
  const [ showDescriptionForm, setShowDescriptionForm ] = useState(false);
  const [ description, setDescription ] = useState(activeCard.description);
  const [ backupDescription, setBackupDescription ] = useState(activeCard.description);

  const toggleShowDescriptionForm = () => {
    setShowDescriptionForm(!showDescriptionForm);
  };

  const handleEditDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleCloseDescription = () => {
    setDescription(backupDescription);
    toggleShowDescriptionForm();
  };

  const handleSubmitNewDescription = () => {
    const cardCloneCleaned = cleanCard(activeCard);
    cardCloneCleaned.description = description;
    dispatch(editCard({ cardId: activeCard._id, ...cardCloneCleaned }));
    setBackupDescription(description);
    toggleShowDescriptionForm();
  };

  const descriptionElements = () => {
    if (showDescriptionForm) {
      return (
        <>
          <textarea className="textarea-toggle" rows="1" onChange={handleEditDescription}>{description}</textarea> 
          <div>
            <div className="button" value="Save" onClick={handleSubmitNewDescription}>Save</div>
            <i className="x-icon icon" onClick={handleCloseDescription}></i>
          </div>
        </>
      )
    }
    return (
      <>
        <span id="description-edit" className="link" onClick={toggleShowDescriptionForm}>
          Edit
        </span>
        <p className="textarea-overlay">
          {description}
        </p>
        <p id="description-edit-options" className="hidden">
          You have unsaved edits on this field.{" "}
          <span className="link">View edits</span> -{" "}
          <span className="link">Discard</span>
        </p>
      </>
    )
  };

  return (
    <form defaultChecked className="description">
      <p>Description</p>                
      { descriptionElements() }
    </form>
  )
};

export default Description;