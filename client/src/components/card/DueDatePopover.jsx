import React from "react";
import Pikaday from "pikaday";
import moment from "moment";
import { editCard } from "../../features/cards/cards";

class DueDatePopover extends React.Component {
  componentDidMount() {
    this.picker = new Pikaday({
      field: document.querySelector(".datepicker-select-date input"),
      bound: false,
      container: document.getElementById("calendar-widget"),
      firstDay: 1,
      yearRange: 10,
      defaultDate: (function() {
        if (this.props.activeCard.dueDate) {
          return new Date(Date.parse(this.props.activeCard.dueDate, "YYYY-MM-DD"));
        } 
        return moment().add(1, "day").toDate();
      }).bind(this)(),
      setDefaultDate: true,
      format: "M/D/YYYY",
      i18n: {
        previousMonth: "Prev",
        nextMonth: "Next",
        months: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December"
        ],
        weekdays: [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday"
        ],
        weekdaysShort: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]
      },
      toString(date, format) {
        return moment(date).format(format);
      }
    });
    this.picker.show();
  }

  render() {
    const { toggleDueDatePopover, dispatch, activeCard } = this.props

    const handleRemoveDueDate = () => {
      const payload = { dueDate: null, cardId: activeCard._id };
      dispatch(editCard(payload));
      toggleDueDatePopover();
    }

    const handleSubmitDueDate = (e) => {
      e.preventDefault();
      const payload = { dueDate: this.picker.getDate(), cardId: activeCard._id }
      dispatch(editCard(payload))
      toggleDueDatePopover();
    }

    return (
      <div className="popover due-date">
        <header>
          <span>Change due date</span>
          <a href="#" className="icon-sm icon-close" onClick={toggleDueDatePopover}></a>
        </header>
        <div className="content">
          <form defaultChecked onSubmit={handleSubmitDueDate}>
            <div className="datepicker-select">
              <div className="datepicker-select-date">
                <label>
                  Date
                  <input type="text" placeholder="Enter date" autoFocus />
                </label>
              </div>
              <div id="calendar-widget"></div>
            </div>
            <button className="button" type="submit">
              Save
            </button>
            <button className="button red-button" type="reset" onClick={handleRemoveDueDate}>
              Remove
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default DueDatePopover;
