import React from "react";
import { Link } from "react-router-dom";
import { formatDateShort, dueDateStatus } from "../../lib/Utils";

const dueDateIcon = (card) => {
  if (card.dueDate && !card.completed ) {
    return <i className={`clock-icon sm-icon ${dueDateStatus(card.dueDate)}`}>{formatDateShort(card.dueDate)}</i>
  } else if (card.dueDate) {
    return <i className={`clock-icon sm-icon green`}>{formatDateShort(card.dueDate)}</i>
  }
}

const descriptionIcon = (description) => {
  if (description !== "") {
    return <i className="description-icon sm-icon"></i>
  }
}

const commentsIcon = (comments) => {
  if (comments.length) {
    return <i className="comment-icon sm-icon"></i>
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
              { dueDateIcon(card) }
              { descriptionIcon(card.description) }
              { commentsIcon(card.comments) }
            </div>
          </div>
        </Link>
      </div>
  )
};

export default Card;