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
import ExistingLabels from "./ExistingLabels";

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
        <Title activeCard={activeCard}/>
        <section className="modal-main">
          <ul className="modal-outer-list">
            <li className="details-section">
              <ul className="modal-details-list">
                <ExistingLabels toggleLabelsPopover={toggleLabelsPopover} activeCard={activeCard}/>
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
            <li className="label-button" onClick={toggleLabelsPopover}>
              <i className="label-icon sm-icon"></i>Labels
            </li>
            <li className="date-button not-implemented" onClick={toggleDueDatePopover}>
              <i className="clock-icon sm-icon"></i>Due Date
            </li>
          </ul>
        </aside>
      </div>
    </div>
  );
};

export default CardModal;