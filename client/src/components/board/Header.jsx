import React from "react"

const Header = ({ title }) => {
  return (
    <header>
      <ul>
        <li id="title">{title}</li>
        <li class="star-icon icon"></li>
        <li class="private private-icon icon">Private</li>
      </ul><div class="menu">
      <i class="more-icon sm-icon"></i>
        Show Menu
      </div>
      <div class="subscribed">
        <i class="sub-icon sm-icon"></i>
        Subscribed
      </div>
    </header>
  )
}

export default Header;
