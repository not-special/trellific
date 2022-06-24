import React from "react";

const ExistingLabels = ({ toggleLabelsPopover, activeCard}) => {
  return (
    <li className="labels-section">
      <h3>Labels</h3>    
      {activeCard.labels.map(color => {
        return (
            <div key={color} className="member-container">
              <div className={`${color} label colorblindable`}></div>
            </div>
        )
      })}
      <div className="member-container" onClick={toggleLabelsPopover}>
        <i className="plus-icon sm-icon"></i>
      </div>
    </li> 
  )
}

export default ExistingLabels;