import React from "react";
import { useSelector } from "react-redux";
import Card from "./Card";

const ExistingCards = ({ listId }) => {
  const cards = useSelector((state) => {
    return state.cards.filter(card => card.listId === listId);
  });

  const sortedCards = () => {
    const cardsCopy = [...cards]; // https://stackoverflow.com/questions/64957735/typeerror-cannot-assign-to-read-only-property-0-of-object-object-array-in
    cardsCopy.sort((a, b) => a.position - b.position );
    return cardsCopy;
  }

  return (
    <div id="cards-container" data-id="list-1-cards">
      { sortedCards().map(card => <Card key={card._id} card={card}/>) }
    </div>
  )
};

export default ExistingCards;