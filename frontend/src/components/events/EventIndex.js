import React from 'react'
import { getAllEvents } from '../../lib/api'
import useFetch from '../../utils/useFetch'
import { Redirect } from 'react-router-dom'

import EventCard from './EventCard'


function EventIndex() {
  const { data: events, error } = useFetch(getAllEvents)

  const handleSearch = e => {
    const searchVal = e.target.value
    console.log(searchVal)
  }

  if (error) {
    return <Redirect to="/notfound" />
  }
  
  if (!events) return null
  return (
    <div className="body-index">
      <div className="filter-container">
        <div className="filters">
          <input className="input" type="text" onChange={handleSearch} placeholder="Search..." />
          <div className="filter-item">Location</div>
          <div className="filter-item">Category</div>
          <div className="filter-item">Price</div>
          <div className="filter-item">Host</div>
        </div>
      </div>
      <div className="container-index">
        {events.map(event => (
          <EventCard key={event._id} {...event} />
        ))
        }
      </div>
    </div>
  )
}

export default EventIndex