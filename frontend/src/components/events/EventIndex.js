import React from 'react'
import { getAllEvents } from '../../lib/api'
import useFetch from '../../utils/useFetch'
import { Redirect } from 'react-router-dom'
import Spinner from '../common/Spinner'

import { locationOptions, categoryOptions, priceOptions } from '../../lib/IndexSearchOptions'

import EventCard from './EventCard'


function EventIndex() {
  const { data: events, loading, error } = useFetch(getAllEvents)
  const [filteredEvents, setFilteredEvents] = React.useState('')
  const [searchVal, setSetSearchVal] = React.useState(events)

  const filterEvents = () => {
    console.log('filter', searchVal)
    const regexp = new RegExp(searchVal, 'i')
    const filtered = events.filter(event => (
      (regexp.test(event.name)
        || regexp.test(event.location))
      // && (selectVal?.every(tag => { return trip.tags.includes(tag.name) }) ?? true
    )
    )
    setFilteredEvents(filtered)
    console.log(filtered)
  }

  const handleReset = () => {

    setFilteredEvents('')
  }

  // const handleSearch = e => {
  //   const search = e.target.value
  // const handleReset = () => {
  //   setFilteredEvents('')
  // }

  const handleSearch = event => {
    const search = event.target.value
    console.log(event.target.value)

    setSetSearchVal(search)
    filterEvents()
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
          <button onClick={handleReset}>Reset Filter</button>
          <div className="filter-item">Location
            {locationOptions.map(location => <button onClick={handleSearch} value={location.label} key={location.label}>{location.label}</button>)}
          </div>
          <div className="filter-item">Category
            {categoryOptions.map(category => <button onClick={handleSearch} value={category.label} key={category.label}>{category.label}</button>)}

          </div>
          <div className="filter-item">Price
            {priceOptions.map(price => <button onClick={handleSearch} value={price.value} key={price.label}>{price.label}</button>)}

          </div>

          {/* <div className="filter-item">Host</div> */}
        </div>
      </div>
      {loading ?
        <Spinner />
        :
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
      }
    </div>
  )
}

export default EventIndex