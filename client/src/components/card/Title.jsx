import React, { useState } from "react"
import { useDispatch } from "react-redux";
import { editCard } from "../../features/cards/cards";
import { cleanCard } from "../../lib/Utils";

const Title = ({ activeCard }) => {
  const dispatch = useDispatch();
  const [ title, setTitle ] = useState(activeCard.title)

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSubmitNewTitle = () => {
    const cardCloneCleaned = cleanCard(activeCard);
    cardCloneCleaned.title = title;
    dispatch(editCard({ cardId: activeCard._id, ...cardCloneCleaned }))
  };

  return (
    <textarea className="list-title" style={{ height: "45px" }} onChange={handleTitleChange} onBlur={handleSubmitNewTitle} value={title}></textarea>
  )
}

export default Title
