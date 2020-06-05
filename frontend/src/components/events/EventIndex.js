import React from 'react'
import { getAllEvents } from '../../lib/api'
import useFetch from '../../utils/useFetch'
import { Redirect } from 'react-router-dom'
 
import EventCard from './EventCard'


function EventIndex() {
  const { data: events, loading, error } = useFetch(getAllEvents)
  
  
  if (!events) return null
  return (
    <>
            {events.map(event => (
              <EventCard key={event._id} {...event} />
            ))
            }
    </>
  )
}

export default EventIndex