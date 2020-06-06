import React from 'react'
import { useHistory } from 'react-router-dom'


// import Eventsimage from '../../styles/assets/roadtrippers.png'

function Error () {
  const history = useHistory()

  const goBack = () => {
    history.push('/events')
  }

  return (
    <div className="body">
      <div className="header-right">
        <button onClick={goBack} className="back-button" type="button">Back</button>
      </div>
      <div className="container">
        <p className="title">Oops something went wrong, try again</p>
      </div>
    </div>
  )
}
export default Error