import React from 'react'
import { useParams } from 'react-router-dom'
import { getSingleEvent } from '../../lib/api'
import useFetch from '../../utils/useFetch'

function EventShow() {
  const { id: eventId } = useParams()
  const { data: event } = useFetch(getSingleEvent, eventId)

  if (!event) return null

  return (
      <div>
        <h2>{event.name}</h2>
      </div>
  )
}

export default EventShow
