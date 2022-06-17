import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { activateCardId } from "../../features/cards/activeCardId";
import CardModal from "./CardModal"


const CardModalContainer = () => {
  const activeCard = useSelector((state) => state.cards.find(card => card._id === state.activeCardId));
  const dispatch = useDispatch();

  const handleCloseModal = () => {    
    dispatch(activateCardId({ cardId: "" }));  
  }
  
  if (!activeCard) {
    return <div id="modal-container" className="modal-container"></div>;  
  }

  return (
    <div id="modal-container" className="modal-container" onClick={handleCloseModal}>
      <CardModal activeCard={activeCard} handleCloseModal={handleCloseModal}/>
    </div>
  );
};

export default CardModalContainer;
