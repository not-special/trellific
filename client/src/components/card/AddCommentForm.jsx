import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createComment } from "../../features/comments/comments";

const AddCommentForm = ({ activeCard }) => {
  const dispatch = useDispatch();

  const [ newComment, setNewComment ] = useState("");

  const handleEditNewComment = (e) => {
    setNewComment(e.target.value);
  }

  const handleSubmitNewComment = () => {
    dispatch(createComment({cardId: activeCard._id, text: newComment}));
    setNewComment("");
  }

  return (
    <li className="comment-section">
      <h2 className="comment-icon icon">Add Comment</h2>
      <div>
        <div className="member-container">
          <div className="card-member">AP</div>
        </div>
        <div className="comment">
          <label>
            <textarea
              required=""
              rows="1"
              placeholder="Write a comment..."
              value={newComment}
              onChange={handleEditNewComment}
            ></textarea>
            <div>
              {/* <a className="light-button card-icon sm-icon"></a>
              <a className="light-button smiley-icon sm-icon"></a>
              <a className="light-button email-icon sm-icon"></a>
              <a className="light-button attachment-icon sm-icon"></a> */}
            </div>
            <div>
              <input
                type="submit"
                className="button not-implemented"
                value="Save"
                onClick={handleSubmitNewComment}
              />
            </div>
          </label>
        </div>
      </div>
    </li>
  )
}

export default AddCommentForm;
