import React from 'react'
import { Link } from 'react-router-dom'

function EventCard({ name, id , image , location , about }) {

  return (
    <Link className="link" to={`/events/${id}`}>
      <div className="event-card">
        <div className="card-left">
          <img src={image} alt={name} loading="lazy" width="150" height="150" />
        </div>
        <div className="card-right">
          <div className="name">{name}</div>
          <div className="location">{location}</div>
          {/* <div className="description">{about}</div> */}
        </div>
      </div>
    </Link>
  )
}

export default EventCard