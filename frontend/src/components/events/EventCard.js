import React from 'react'
import { Link } from 'react-router-dom'

function EventCard({ categories, name, id, talk_images, location, date_time , price }) {

  const picture = () => {
    if (talk_images.length === 0) {
      return <img src='https://avatars.slack-edge.com/2020-05-09/1112549471909_7543dde099089941d3c3_512.png' alt={name} loading="lazy" width="200"  className="image"/>
    } else {
      return < img src={talk_images[0]?.image} alt={name} loading="lazy" width="200" className="image" />
    }
  }

  return (
    <Link className="link" to={`/events/${id}`}>
      <div className="event-card">
        <div className="card-left">
          <div className="crop">
            {picture()}
          </div>

        </div>
        <div className="card-right">
          <div className="title">
            <div className="name">{name}</div>
            <div className="price">{price > 0 ? `£${price}` : 'Free'}</div>
          </div>
          <div className="location">{location}</div>
          <div className="date-time">{date_time.replace('T', ' at ').replace(':00Z', '')}</div>
          <div className="tags">
            <strong>Tags:</strong><br></br>
            {categories.map(category => (
              <div key={category.id} className="tag">{category.name}</div>
            ))}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default EventCard