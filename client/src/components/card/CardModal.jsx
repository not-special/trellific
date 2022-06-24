/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchCard } from "../../features/cards/cards";
import ExistingActivities from "./ExistingActivities"
import DueDatePopover from "./DueDatePopover";
import LabelsPopover from "./LabelsPopover";
import Title from "./Title";
import Description from "./Description";
import AddCommentForm from "./AddCommentForm";
import DueDate from "./DueDate";


const CardModal = () => {
  const cardId = useParams().id;
  const dispatch = useDispatch();
  
  const [ showDueDatePopover, setShowDueDatePopover ] = useState(false); 
  const [ showLabelsPopover, setShowLabelsPopover ] = useState(false); 
  
  const activeCard = useSelector((state) => {
    return state.cards.find(c => c._id === cardId);
  });

  const activeCardBoardId = activeCard ? activeCard.boardId : "";

  useEffect(() => {
    dispatch(fetchCard({cardId}));
  }, [dispatch, cardId]);

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

  // const dueDate = () => {
  //   if (activeCard && activeCard.dueDate) {
  //     return (
  //       <li className="due-date-section" onClick={toggleDueDatePopover}>
  //         <h3>Due Date</h3>
  //         <div id="dueDateDisplay" className="overdue completed">
  //           <input
  //             id="dueDateCheckbox"
  //             type="checkbox"
  //             className="checkbox"
  //             defaultChecked
  //           />
  //           { new Date(Date.parse(activeCard.dueDate, "YYYY-MM-DD")).toDateString() } 
  //           <span> { Date.parse(activeCard.dueDate, "YYYY-MM-DD") < Date.now() ? "(past due)" : "" }</span>
  //         </div>
  //       </li>
  //     )    
  //   }
  // }

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
        </header>
        <section className="modal-main">
          <ul className="modal-outer-list">
            <li className="details-section">
              <ul className="modal-details-list">
                { renderLabels() }
                {/* { dueDate() } */}
                <DueDate toggleDueDatePopover={toggleDueDatePopover} activeCard={activeCard} />
              </ul>
              <Description activeCard={activeCard}/>
            </li>
            <AddCommentForm activeCard={activeCard}/>
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
