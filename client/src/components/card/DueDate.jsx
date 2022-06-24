import React from "react"
import { formatDateLong, pastDue, dueDateStatus } from "../../lib/Utils";

const DueDate = ({ toggleDueDatePopover, activeCard }) => {
  if (activeCard.dueDate) {
    return (
      <li className="due-date-section" onClick={toggleDueDatePopover}>
        <h3>Due Date</h3>
        <div id="dueDateDisplay" className={dueDateStatus(activeCard.dueDate)}>
          <input
            id="dueDateCheckbox"
            type="checkbox"
            className="checkbox"
            defaultChecked=""
          />
          { formatDateLong(activeCard.dueDate) } 
          <span> { pastDue(activeCard.dueDate) ? "(past due)" : "" }</span>
        </div>
      </li>
    )
  }
  return null
}

export default DueDate;
