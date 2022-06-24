import React from "react"

const Buttons = ({ toggleLabelsPopover, toggleDueDatePopover }) => {
  return (
    <aside className="modal-buttons">
      <h2>Add</h2>
      <ul>
        <li className="label-button" onClick={toggleLabelsPopover}>
          <i className="label-icon sm-icon"></i>Labels
        </li>
        <li className="date-button not-implemented" onClick={toggleDueDatePopover}>
          <i className="clock-icon sm-icon"></i>Due Date
        </li>
      </ul>
    </aside>
  )
}

export default Buttons;
