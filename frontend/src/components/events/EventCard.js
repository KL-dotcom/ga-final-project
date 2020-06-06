import React from 'react'
import { Link } from 'react-router-dom'

function EventCard({ name, _id , image , origin , tastingNotes }) {
  return (
    <Link to={`/events/${_id}`}>
      <div className="event-card">
        <div className="card-left">
          <img src={image} alt={name} loading="lazy" width="200" height="200" />
        </div>
        <div className="card-right">
          <h4>{name}</h4>
          <div>{origin}</div>
          <div>{tastingNotes}</div>
        </div>
      </div>
    </Link>
  )
}

export default EventCard