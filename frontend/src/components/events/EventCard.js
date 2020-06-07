import React from 'react'
import { Link } from 'react-router-dom'

function EventCard({ name, _id , image , origin , tastingNotes }) {
  return (
    <Link className="link" to={`/events/${_id}`}>
      <div className="event-card">
        <div className="card-left">
          <img src={image} alt={name} loading="lazy" width="150" height="150" />
        </div>
        <div className="card-right">
          <div className="name">{name}</div>
          <div className="location">{origin}</div>
          {/* <div className="description">{tastingNotes}</div> */}
        </div>
      </div>
    </Link>
  )
}

export default EventCard