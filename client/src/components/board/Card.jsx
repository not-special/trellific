import React from "react";
import { Link } from "react-router-dom";
import { formatDateShort, dueDateStatus } from "../../lib/Utils";

const dueDateIcon = (dueDate) => {
  if (dueDate) {
    return <i className={`clock-icon sm-icon ${dueDateStatus(dueDate)}`}>{formatDateShort(dueDate)}</i>
  }
}

const Card = ({ card }) => {  
  return (
      <div className="card-background">
        <Link to={`/cards/${card._id}`} >
          <div className="card ">
            <i className="edit-toggle edit-icon sm-icon"></i>
            <div className="cover-image"></div>
            <div className="card-info">
              {card.labels.map(color => <div key={color} className={`card-label ${color} colorblindable`}></div>)}
              <p>{card.title}</p>
            </div>
            <div className="card-icons">
              { dueDateIcon(card.dueDate) }
              <i className="description-icon sm-icon"></i>
            </div>
          </div>
        </Link>
      </div>
  )
};

export default Card;