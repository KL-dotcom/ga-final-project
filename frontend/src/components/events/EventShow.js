import React from 'react'
import { Link, Redirect, useHistory, useParams } from 'react-router-dom'
import { getSingleEvent, getAllEvents, deleteEvent, userBasket, updateBasket } from '../../lib/api'
import useFetch from '../../utils/useFetch'
import EventCard from './EventCard'
import Spinner from '../common/Spinner'


function EventShow() {
  const { id: eventId } = useParams()
  const { data: event, loading, error } = useFetch(getSingleEvent, eventId)
  const { data: events } = useFetch(getAllEvents)
  const history = useHistory()
  // const eventImage = event.talk_images

  const handleDelete = async () => {
    try {
      await deleteEvent(eventId)
      history.push('/events')
    } catch (err) {
      history.push('/notfound')
    }
  }
  console.log(event)

  if (error) {
    return <Redirect to="/notfound" />
  }
  const filterOrigin = () => {
    if (!events) return null
    const regexp = new RegExp(event.categories[0], 'i')
    let filtered = events.filter(event => (
      (regexp.test(event.categories))))
    filtered = [filtered[1], filtered[2], filtered[3]]
    return filtered
  }


  const addToBasket = async () => {
    const res = await userBasket()
    const basket = res.data[0]
    await updateBasket({ 'talk': [...basket.talk, eventId] }, basket.id)

  }

  const addToWishlist = e => {
    console.log(e.target.value)
  }
  if (!event || !events) return null


  return (
    <div className="body">
      <div className="container">

        {loading ?
          <Spinner />
          :
          <>
            <div className="title-container">
              <div className="title-image">
                {event.talk_images.map(image => (
                  <img src={image.image} key={image.id} loading="lazy" width="500" className="image" />
                ))}

              </div>
              <div className="title-wording">
                <div className="title">{event.name}</div>
                <div className="host">Hosted by: {event.host.username}</div>
                <div className="location">Location: {event.location}</div>
                <div className="price">Price: £{event.price}</div>
                <div className="owner-buttons">
                  <Link to={`/events/${eventId}/edit`} className="link"><button>Edit</button></Link>
                  <button onClick={handleDelete}>Delete event</button>
                </div>
              </div>
            </div>
            <div className="interest-buttons">
              <button onClick={addToWishlist} value="Wishlist" >Add to wish list</button>
              <button onClick={addToBasket} value="Basket" >Add to basket</button>
            </div>
            <div className="description">
              <div className="title-wording">
                <strong>About this event:</strong><br></br>
                {event.about}
              </div>
            </div>
            <div className="tags">
              <strong>Tags:</strong><br></br>
              {event.categories.map(category => (
                <h1 key={category.id}>{category.name}</h1>
              ))}
            </div>
            <div className="similar-events">
              <strong>Similar Events:</strong><br></br>
              <div className="similar-events-cards">

                {filterOrigin().map(event => 
                  <EventCard key={event.id} className="card" {...event} />
                )}
              </div>
            </div>

          </>
        }
      </div>
    </div>

  )
}

export default EventShow
