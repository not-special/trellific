import React from "react";
import { Link } from "react-router-dom";

const Card = ({ card }) => {  
  return (
      <div className="card-background">
        <Link to={`/cards/${card._id}`} >
          <div className="card ">
            <i className="edit-toggle edit-icon sm-icon"></i>
            <div className="cover-image"></div>
            <div className="card-info">
              <p>{card.title}</p>
            </div>
            <div className="card-icons"></div>
          </div>
        </Link>
      </div>
  )
};

export default Card;