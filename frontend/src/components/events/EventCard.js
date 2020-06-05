import React from 'react'
import { Link } from 'react-router-dom'

function EventCard({ name, _id }) {
  return (
    <div>
      <Link to={`/events/${_id}`}>
        <h4>{name}</h4>
      </Link>
    </div>
  )
}

export default EventCard