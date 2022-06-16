import React from "react";
import { useSelector } from "react-redux";
import Card from "./Card";

const ExistingCards = ({ listId }) => {
  const cards = useSelector((state) => {
    return state.cards.filter(card => card.listId === listId);
  });

  return (
    <div id="cards-container" data-id="list-1-cards">
      { cards.map(card => <Card key={card._id} card={card}/>) }
    </div>
  )
};

export default ExistingCards;