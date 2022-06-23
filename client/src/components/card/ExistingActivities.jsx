import React from "react";
import { useSelector } from "react-redux";
import Activity from "./Activity";

const ExistingActivities = () => {
  const comments = useSelector((state) => {
    return state.comments;
  });

  return (
    <li className="activity-section">
      <h2 className="activity-icon icon">Activity</h2>
      <ul className="horiz-list">
        {/* <li className="not-implemented">Show Details</li> */}
      </ul>
      <ul className="modal-activity-list">
        {comments.map(comment => <Activity key={comment._id} activity={comment}/>)}
      </ul>
    </li>
  )
}

export default ExistingActivities;