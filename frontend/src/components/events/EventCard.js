import React from 'react'
import { Link } from 'react-router-dom'

function EventCard({ categories, name, id, image, location, date_time }) {

  return (
    <Link className="link" to={`/events/${id}`}>
      <div className="event-card">
        <div className="card-left">
          {image ?
            < img src={image} alt={name} loading="lazy" width="150" height="150" />
            :
            <img src='https://avatars.slack-edge.com/2020-05-09/1112549471909_7543dde099089941d3c3_512.png' alt={name} loading="lazy" width="150" height="150" />}

        </div>
        <div className="card-right">
          <div className="name">{name}</div>
          <div className="location">{location}</div>
          <div className="date-time">{date_time.replace('T', ' at ').replace(':00Z', '')}</div>
          <div className="tags">
            <strong>Tags:</strong><br></br>

            {categories.map(category => (
              <h4 key={category.id}>{category.name}</h4>
            ))}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default EventCard