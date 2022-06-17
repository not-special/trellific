import React from "react";
import { useDispatch } from "react-redux";
import { activateCardId } from "../../features/cards/activeCardId";

const Card = ({ card }) => {
  const dispatch = useDispatch();
  
  const handleCardClick = () => {
    dispatch(activateCardId({ cardId: card._id }));
  };
  
  return (
    <div className="card-background" onClick={handleCardClick}>
        <div className="card ">
          <i className="edit-toggle edit-icon sm-icon"></i>
          <div className="cover-image"></div>
          <div className="card-info">
            <p>{card.title}</p>
          </div>
          <div className="card-icons"></div>
        </div>
      </div>
  )
};

export default Card;