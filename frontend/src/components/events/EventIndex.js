import React from 'react'
import { getAllEvents } from '../../lib/api'
import useFetch from '../../utils/useFetch'
import { Redirect } from 'react-router-dom'

import EventCard from './EventCard'


function EventIndex() {
  const { data: events, error } = useFetch(getAllEvents)
  const [filteredEvents , setFilteredEvents] = React.useState('')
  const [searchVal , setSetSearchVal] = React.useState(events)

  const filterEvents = () => {
    console.log('filter', searchVal)
    const regexp = new RegExp(searchVal, 'i')
    const filtered = events.filter(event => (
      (regexp.test(event.origin)
      // || regexp.test(trip.endPointCity))
      // && (selectVal?.every(tag => { return trip.tags.includes(tag.name) }) ?? true
      )
    ))
    setFilteredEvents(filtered)
    console.log(filtered)
  }
  
  
  const handleSearch = e => {
    const search = e.target.value
    setSetSearchVal(search)
    filterEvents()
    console.log(searchVal)
  }
  
  if (error) {
    return <Redirect to="/notfound" />
  }

  if (!events) return null
  return (
    <div className="body-index">
      <div className="filter-container">
        {/* <h1>{searchVal}</h1> */}
        <div className="filters">
          <input className="input" type="text" onChange={handleSearch} placeholder="Search..." />
          <div className="filter-item">Location</div>
          <div className="filter-item">Category</div>
          <div className="filter-item">Price</div>
          <div className="filter-item">Host</div>
        </div>
      </div>
      <div className="container-index">
        {filteredEvents ? 
          filteredEvents.map(event => (
            <EventCard key={event.id} {...event} />
          )) :
          events.map(event => (
            <EventCard key={event.id} {...event} />
          ))
        }
      </div>
    </div>
  )
}

export default EventIndex