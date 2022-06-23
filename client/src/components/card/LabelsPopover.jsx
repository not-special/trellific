import React from "react";
import Label from "./Label";

const LabelsPopover = ({ activeCard, toggleLabelsPopover }) => {
  const colorOptions = ["green", "yellow", "blue", "purple", "orange", "red"] 
  
  return (
    <div className="popover labels">
      <div id="add-options-labels-dropdown">
        <header>
          <span>Labels</span>
          <a href="#" className="icon-sm icon-close" onClick={toggleLabelsPopover}></a>
        </header>
        <div className="content">
          <input
            className="dropdown-input"
            placeholder="Search labels..."
            type="text"
          />
          <div className="labels-search-results">
            <ul className="label-list">
              { colorOptions.map(color => <Label activeCard={activeCard} color={color} key={color}/>)}
            </ul>
            <ul className="light-list">
              <li className="not-implemented">Create a new label</li>
              <hr />
              <li className="toggleColorblind">
                Enable color blind friendly mode.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LabelsPopover;


