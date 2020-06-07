import React from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
import { getSingleEvent , deleteEvent } from '../../lib/api'
import useFetch from '../../utils/useFetch'

function EventShow() {
  const { id: eventId } = useParams()
  const { data: event } = useFetch(getSingleEvent, eventId)
  const history = useHistory()


  const handleDelete = async () => {
    try {
      await deleteEvent(eventId)
      history.push('/events')
    } catch (err) {
      history.push('/notfound')
    }
  }

  const addToBasket = e => {
    console.log(e.target.value)
  }

  const addToWishlist = e => {
    console.log(e.target.value)
  }

  if (!event) return null

  return (
    <div className="body">
      <div className="container">

        <div className="title-container">
          
          <div className="title-image">
            <img src={event.image} alt={event.name} loading="lazy" width="500" className="image"/>
          </div>
          <div className="title-wording">
            <div className="title">{event.name}</div>
            <div className="title">Hosted by: Captain Jack</div>
            <div className="title">Location: Tortuga</div>
            <button><Link to={`/events/${eventId}/edit`} className="link">Edit</Link></button>
            <button onClick={handleDelete}>Delete event</button>
          </div>

        </div>





        <button onClick={addToWishlist} value="Wishlist" >Add to wish list</button>
        <button onClick={addToBasket} value="Basket" >Add to basket</button>
      </div>
    </div>

  )
}

export default EventShow
