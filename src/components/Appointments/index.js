// Write your code here
import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import {format} from 'date-fns'

import AppointmentItem from '../AppointmentItem'

import './index.css'

const appointmentsList = []

class Appointments extends Component {
  state = {
    initialAppointmentList: appointmentsList,
    title: '',
    date: '',
    starredClicked: false,
  }

  onChangeTitle = event => {
    this.setState({title: event.target.value})
  }

  onChangeDate = event => {
    this.setState({date: event.target.value})
  }

  addAppointment = event => {
    event.preventDefault()
    const {title, date} = this.state
    const newAppointment = {
      id: uuidv4(),
      title,
      date: `Date: ${format(new Date(date), 'dd MMMM yyyy, EEEE')}`,
      isStarred: false,
    }

    this.setState(prevStat => ({
      initialAppointmentList: [
        ...prevStat.initialAppointmentList,
        newAppointment,
      ],
      title: '',
      date: '',
    }))
  }

  toggleFav = id => {
    this.setState(prevStat => ({
      initialAppointmentList: prevStat.initialAppointmentList.map(
        eachAppointment => {
          if (eachAppointment.id === id) {
            return {...eachAppointment, isStarred: !eachAppointment.isStarred}
          }
          return eachAppointment
        },
      ),
    }))
  }

  starredAppointments = () => {
    this.setState(prevStat => ({
      starredClicked: !prevStat.starredClicked,
    }))
  }

  render() {
    const {initialAppointmentList, title, date, starredClicked} = this.state

    const appointmentsToShow =
      starredClicked === true
        ? initialAppointmentList.filter(
            eachAppointment => eachAppointment.isStarred === true,
          )
        : initialAppointmentList

    return (
      <div className="appointments-bg">
        <div className="appointments-section">
          <form onSubmit={this.addAppointment}>
            <div className="form-section">
              <div className="input-section">
                <h1 className="appointment-title">Add Appointment</h1>
                <label htmlFor="title" className="title-text">
                  TITLE
                </label>
                <input
                  id="title"
                  type="text"
                  placeholder="Title"
                  value={title}
                  onChange={this.onChangeTitle}
                  className="title-box"
                />
                <label htmlFor="date" className="title-text">
                  DATE
                </label>
                <input
                  id="date"
                  type="date"
                  placeholder="dd/mm/yyyy"
                  className="title-box"
                  value={date}
                  onChange={this.onChangeDate}
                />
                <button type="submit" className="add-button">
                  Add
                </button>
              </div>
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
                className="appointments-image"
              />
            </div>
          </form>
          <hr className="separator" />
          <div className="bottom-section">
            <h1 className="appointments-header">Appointments</h1>
            {starredClicked ? (
              <button
                type="button"
                className="selected-btn"
                onClick={this.starredAppointments}
              >
                Starred
              </button>
            ) : (
              <button
                type="button"
                className="unselected-btn"
                onClick={this.starredAppointments}
              >
                Starred
              </button>
            )}
          </div>
          <ul className="appointments-list">
            {appointmentsToShow.map(eachAppointment => (
              <AppointmentItem
                appointmentDetails={eachAppointment}
                key={eachAppointment.id}
                toggleFav={this.toggleFav}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
