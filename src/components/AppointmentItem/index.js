// Write your code here
import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, toggleFav} = props
  const {id, title, date, isStarred} = appointmentDetails

  const addFav = () => {
    toggleFav(id)
  }

  const favImage = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  return (
    <li key={id} className="each-appointment-item">
      <div className="each-appointment-section">
        <p className="title-font">{title}</p>
        <button onClick={addFav} data-testid="star" className="button-star">
          <img src={favImage} alt="star" />
        </button>
      </div>
      <p className="date-font">{date}</p>
    </li>
  )
}

export default AppointmentItem
