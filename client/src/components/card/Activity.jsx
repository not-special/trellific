import React from "react";
import { USER_INITIALS, USER_NAME } from "../../constants/DummyNames";


const Activity = ({ activity }) => {
  return (
    <li>
      <div className="member-container">
        <div className="card-member">{ USER_INITIALS }</div>
      </div>
      <h3>{ USER_NAME }</h3>
      <div className="comment static-comment">
        <span>{activity.text}</span>
      </div>
      <div className="comment">
        <label>
          <textarea required="" rows="1">
          </textarea>
          <div>
            <a className="light-button card-icon sm-icon"></a>
            <a className="light-button smiley-icon sm-icon"></a>
            <a className="light-button email-icon sm-icon"></a>
          </div>
          <div>
            <p>You haven&apos;t typed anything!</p>
            <input
              type="submit"
              className="button not-implemented"
              value="Save"
            />
            <i className="x-icon icon"></i>
          </div>
        </label>
      </div>
    </li>
  )
}

export default Activity;