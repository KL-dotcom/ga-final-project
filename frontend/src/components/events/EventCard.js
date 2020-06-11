import React from 'react'
import { Link } from 'react-router-dom'

function EventCard({ categories, name, id, talk_images, location, date_time }) {

  const picture = () => {
    if (talk_images.length === 0) {
      return <img src='https://avatars.slack-edge.com/2020-05-09/1112549471909_7543dde099089941d3c3_512.png' alt={name} loading="lazy" width="150" height="150" />
    } else {
      return < img src={talk_images[talk_images.length - 1]?.image} alt={name} loading="lazy" width="150" height="150" />
    }
  }


  return (
    <Link className="link" to={`/events/${id}`}>
      <div className="event-card">
        <div className="card-left">
          {picture()}

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