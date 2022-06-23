import React, { useState } from "react";
import { editCard } from "../../features/cards/cards";
import { useDispatch } from "react-redux";

const Label = ({ activeCard, color }) => {
  const dispatch = useDispatch();
  const [ labelSelected, setLabelSelected ] = useState(activeCard.labels.includes(color));
  const checkClass = labelSelected ? "check-icon sm-icon" : "";

  const handleLabelSelect = () => {
    const payload = { cardId: activeCard._id };
    if (!labelSelected) {
      payload.labels = [...activeCard.labels, color];
    } else {
      const filteredLabels = activeCard.labels.filter(item => item !== color);
      payload.labels = filteredLabels;
    }

    dispatch(editCard(payload));
    setLabelSelected(!labelSelected);
  };
  
  return (
    <li>
      <div className={`${color} colorblindable`} data-id="1" onClick={handleLabelSelect}>
        <i className={checkClass}></i>
      </div>
      <div className={`label-background ${color}`}></div>
      <div className="label-background-overlay"></div>
      <i className="edit-icon icon not-implemented"></i>
    </li>
  )
};

export default Label;