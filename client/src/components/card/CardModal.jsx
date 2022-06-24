/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { editCard, fetchCard } from "../../features/cards/cards";
import { createComment } from "../../features/comments/comments";
import ExistingActivities from "./ExistingActivities"
import DueDatePopover from "./DueDatePopover";
import LabelsPopover from "./LabelsPopover";
import Title from "./Title";
import { cleanCard } from "../../lib/Utils";


const CardModal = () => {
  const cardId = useParams().id;
  const dispatch = useDispatch();
  const [ showDescriptionForm, setShowDescriptionForm ] = useState(false);
  const [ newComment, setNewComment ] = useState();
  const [ showDueDatePopover, setShowDueDatePopover ] = useState(false); 
  const [ showLabelsPopover, setShowLabelsPopover ] = useState(false); 
  
  const activeCard = useSelector((state) => {
    return state.cards.find(c => c._id === cardId);
  });

  const activeCardDescription = activeCard ? activeCard.description : "";
  const activeCardBoardId = activeCard ? activeCard.boardId : "";

  const [ description, setDescription ] = useState(activeCardDescription);
  const [ backupDescription, setBackupDescription ] = useState(activeCardDescription);

  useEffect(() => {
    setDescription(activeCardDescription);
    setBackupDescription(activeCardDescription);
  }, [activeCardDescription])

  useEffect(() => {
    dispatch(fetchCard({cardId}));
  }, [dispatch, cardId]);

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
    dispatch(editCard({ cardId, ...cardCloneCleaned }));

    setBackupDescription(description);
    toggleShowDescriptionForm();
  };

  const handleEditNewComment = (e) => {
    setNewComment(e.target.value);
  }

  const handleSubmitNewComment = () => {
    dispatch(createComment({cardId: activeCard._id, text: newComment}));
    setNewComment("");
  }

  const toggleDueDatePopover = () => {
    setShowDueDatePopover(!showDueDatePopover);
  }

  const toggleLabelsPopover = () => {
    setShowLabelsPopover(!showLabelsPopover);
  };

  const handleRemoveDueDate = (e) => {
    e.preventDefault();
  }

  const renderLabels = () => {
    if (activeCard) {
      return (
        <li className="labels-section">
          <h3>Labels</h3>    
          {activeCard.labels.map(color => {
            return (
                <div key={color} className="member-container">
                  <div className={`${color} label colorblindable`}></div>
                </div>
            )
          })}
          <div className="member-container" onClick={toggleLabelsPopover}>
            <i className="plus-icon sm-icon"></i>
          </div>
       </li> 
      )
    }
  }

  const dueDate = () => {
    if (activeCard && activeCard.dueDate) {
      return (
        <li className="due-date-section" onClick={toggleDueDatePopover}>
          <h3>Due Date</h3>
          <div id="dueDateDisplay" className="overdue completed">
            <input
              id="dueDateCheckbox"
              type="checkbox"
              className="checkbox"
              checked=""
            />
            { new Date(Date.parse(activeCard.dueDate, "YYYY-MM-DD")).toDateString() } 
            <span> { Date.parse(activeCard.dueDate, "YYYY-MM-DD") < Date.now() ? "(past due)" : "" }</span>
          </div>
        </li>
      )    
    }
  }

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
  }

  if (!activeCard) {
    return null
  }

  return (
    <div id="modal-container" className="modal-container">
      { showDueDatePopover ? <DueDatePopover activeCard={activeCard} dispatch={dispatch} toggleDueDatePopover={toggleDueDatePopover} /> : "" }
      { showLabelsPopover ? <LabelsPopover activeCard={activeCard} toggleLabelsPopover={toggleLabelsPopover} /> : "" }
      <div className="screen"></div>

      <div id="modal">
        <Link to={`/boards/${activeCardBoardId}`}>
          <i className="x-icon icon close-modal"></i>
        </Link>
        <header>
          <i className="card-icon icon .close-modal"></i>
          <Title activeCard={activeCard}/>
          {/* <textarea className="list-title" style={{ height: "45px" }} onChange={handleCardTitleChange} onBlur={handleSubmitNewTitle} value={title}></textarea> */}
        </header>
        <section className="modal-main">
          <ul className="modal-outer-list">
            <li className="details-section">
              <ul className="modal-details-list">
                { renderLabels() }
                { dueDate() }
              </ul>
              <form className="description">
                <p>Description</p>
                {descriptionElements()}
              </form>
            </li>
            <li className="comment-section">
              <h2 className="comment-icon icon">Add Comment</h2>
              <div>
                <div className="member-container">
                  <div className="card-member">AP</div>
                </div>
                <div className="comment">
                  <label>
                    <textarea
                      required=""
                      rows="1"
                      placeholder="Write a comment..."
                      value={newComment}
                      onChange={handleEditNewComment}
                    ></textarea>
                    <div>
                      {/* <a className="light-button card-icon sm-icon"></a>
                      <a className="light-button smiley-icon sm-icon"></a>
                      <a className="light-button email-icon sm-icon"></a>
                      <a className="light-button attachment-icon sm-icon"></a> */}
                    </div>
                    <div>
                      <input
                        type="submit"
                        className="button not-implemented"
                        value="Save"
                        onClick={handleSubmitNewComment}
                      />
                    </div>
                  </label>
                </div>
              </div>
            </li>
            <ExistingActivities />
          </ul>
        </section>
        <aside className="modal-buttons">
          <h2>Add</h2>
          <ul>
            {/* <li className="member-button">
              <i className="person-icon sm-icon"></i>Members
            </li> */}
            <li className="label-button" onClick={toggleLabelsPopover}>
              <i className="label-icon sm-icon"></i>Labels
            </li>
            {/* <li className="checklist-button">
              <i className="checklist-icon sm-icon"></i>Checklist
            </li> */}
            <li className="date-button not-implemented" onClick={toggleDueDatePopover}>
              <i className="clock-icon sm-icon"></i>Due Date
            </li>
            {/* <li className="attachment-button not-implemented">
              <i className="attachment-icon sm-icon"></i>Attachment
            </li> */}
          </ul>
          {/* <h2>Actions</h2>
          <ul>
            <li className="move-button">
              <i className="forward-icon sm-icon"></i>Move
            </li>
            <li className="copy-button">
              <i className="card-icon sm-icon"></i>Copy
            </li>
            <li className="subscribe-button">
              <i className="sub-icon sm-icon"></i>Subscribe
              <i className="check-icon sm-icon"></i>
            </li>
            <hr />
            <li className="archive-button">
              <i className="file-icon sm-icon "></i>Archive
            </li>
          </ul> */}
          {/* <ul className="light-list">
            <li className="not-implemented">Share and more...</li>
          </ul> */}
        </aside>
      </div>
    </div>
  );
};

export default CardModal;
