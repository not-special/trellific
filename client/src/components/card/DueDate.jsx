import React, { useState } from "react"
import { formatDateLong, pastDue, dueDateStatus } from "../../lib/Utils";
import { editCard } from "../../features/cards/cards";
import { useDispatch } from "react-redux";
import { cleanCard } from "../../lib/Utils";

const DueDate = ({ toggleDueDatePopover, activeCard }) => {
  const dispatch = useDispatch();

  const [ checked, setChecked ] = useState(activeCard.completed);

  const handleCheckboxChange = () => {
    handleSubmitCompleted();
    setChecked(!checked);
  }

  const handleSubmitCompleted = () => {
    const cardCloneCleaned = cleanCard(activeCard);
    cardCloneCleaned.completed = !checked;
    dispatch(editCard({ cardId: activeCard._id, ...cardCloneCleaned }));
  };

  const dueDateClass = (card) => {
    if (card.completed) {
      return "completed"
    }
    return dueDateStatus(card.dueDate);
  }

  if (activeCard.dueDate) {
    return (
      <li className="due-date-section">
        <h3>Due Date</h3>
        <div id="dueDateDisplay" className={dueDateClass(activeCard)}>
          <input
            id="dueDateCheckbox"
            type="checkbox"
            className="checkbox"
            checked={checked}
            onChange={handleCheckboxChange}
          />
          <span onClick={toggleDueDatePopover}>{ formatDateLong(activeCard.dueDate) }</span>
          <span> { pastDue(activeCard.dueDate) && !activeCard.completed ? "(past due)" : "" }</span>
        </div>
      </li>
    )
  }
  return null
}

export default DueDate;
