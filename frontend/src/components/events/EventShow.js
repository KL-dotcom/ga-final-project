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


  if (!event) return null

  return (
    <div>
      <h2>{event.name}</h2>
      <Link to={`/events/${eventId}/edit`} className="link">Edit</Link>
      <button onClick={handleDelete}>Delete event</button>

    </div>
  )
}

export default EventShow
