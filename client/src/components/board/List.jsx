import React from "react"

const List = ({ list }) => {
  return (
    <div className="list-wrapper">
      <div className="list-background">
        <div className="list">
          <a className="more-icon sm-icon" href=""></a>
          <div>
            <p className="list-title">{list.title}</p>
          </div>
          <div className="add-dropdown add-top">
            <div className="card"></div>
            <a className="button">Add</a><i className="x-icon icon"></i>
            <div className="add-options"><span>...</span></div>
          </div>
          <div id="cards-container" data-id="list-1-cards">
            <div className="card-background">
              <div className="card ">
                <i className="edit-toggle edit-icon sm-icon"></i>
                <div className="cover-image"></div>
                <div className="card-info">
                  <p>TODO: Extract cards!</p>
                </div>
                <div className="card-icons"></div>
              </div>
            </div>
          </div>
          <div className="add-dropdown add-bottom">
            <div className="card">
              <div className="card-info"></div>
              <textarea name="add-card"></textarea>
              <div className="members"></div>
            </div>
            <a className="button">Add</a><i className="x-icon icon"></i>
            <div className="add-options"><span>...</span></div>
          </div>
          <div className="add-card-toggle" data-position="bottom">Add a card...</div>
        </div>
      </div>
    </div>
  )
}

export default List;
