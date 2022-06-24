import React from "react"

const DueDate = ({ toggleDueDatePopover, activeCard }) => {
  if (activeCard.dueDate) {
    return (
      <li className="due-date-section" onClick={toggleDueDatePopover}>
        <h3>Due Date</h3>
        <div id="dueDateDisplay" className="overdue completed">
          <input
            id="dueDateCheckbox"
            type="checkbox"
            className="checkbox"
            defaultChecked
          />
          { new Date(Date.parse(activeCard.dueDate, "YYYY-MM-DD")).toDateString() } 
          <span> { Date.parse(activeCard.dueDate, "YYYY-MM-DD") < Date.now() ? "(past due)" : "" }</span>
        </div>
      </li>
    )
  }
  return null
}

export default DueDate;
