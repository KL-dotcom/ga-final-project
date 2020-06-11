import React from 'react'
import { getAllEvents } from '../../lib/api'
import useFetch from '../../utils/useFetch'
import { Redirect } from 'react-router-dom'
import Spinner from '../common/Spinner'

import { locationOptions, categoryOptions, priceOptions } from '../../lib/IndexSearchOptions'

import EventCard from './EventCard'


function EventIndex() {
  const { data: events, loading, error } = useFetch(getAllEvents)
  const [filteredEvents, setFilteredEvents] = React.useState()
  const [locationFilter, setLocationFilter] = React.useState()
  const [priceFilter, setPriceFilter] = React.useState()
  const [categoryFilter, setCategoryFilter] = React.useState()
  const [searchInput, setSearchInput] = React.useState()


  console.log(locationFilter)
  console.log(priceFilter)
  console.log(categoryFilter)
 
  console.log(events)
  



  const emptyFilter = () => {
    if (filteredEvents && filteredEvents.length === 0) return true
  }


  const filterLocations = (event) => {
    if (locationFilter) {
      return null
    } else { 
      const search = event.target.value
      const regexp = new RegExp(search, 'i')
      const startingEvents = filteredEvents ? filteredEvents : events
      const filtered = startingEvents.filter((event) => {
        if (regexp.test(event.location)) return true
      }
      )
      setLocationFilter(search)
      setFilteredEvents(filtered)
    }
  }

  const filterCategories = (event) => {
    if (categoryFilter) {
      return null
    } else { 
      const search = event.target.value
      const startingEvents = filteredEvents ? filteredEvents : events
      const filtered = startingEvents.filter((event) => {
        const eventCategories = event.categories.map((currentValue) => {
          return currentValue.id
        })
        if (eventCategories.includes(parseInt(search))) {
          return event
        }
      }
      )
      setCategoryFilter(search)
      setFilteredEvents(filtered)
    }

  }


  const filterPrice = (event) => {
    if (priceFilter) {
      return null
    } else { 
      const search = event.target.value
      const startingEvents = filteredEvents ? filteredEvents : events
      const filtered = startingEvents.filter((event) => {
        if (event.price < search) return event
      
      })
      setPriceFilter(search)
      setFilteredEvents(filtered)
    }
  }

  const handleReset = () => {
    setFilteredEvents('')
    setSearchInput('')
    setPriceFilter('')
    setCategoryFilter('')
    setLocationFilter('')
  }


  const handleSearch = (event) => {
    const search = event.target.value
    const regexp = new RegExp(search, 'i')
    const startingEvents = filteredEvents ? filteredEvents : events
    const filtered = startingEvents.filter((event) => {
      if (regexp.test(event.name)) return event
    })
    setFilteredEvents(filtered)
    setSearchInput(search)
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
          <button onClick={handleReset}>Reset filters</button>
          <input
            value = {searchInput}
            className="input"
            type="text" 
            onChange={handleSearch}
            placeholder="Search..." />
          {/* <button onClick={handleReset}>Reset Filter</button> */}
          <div className="filter-item">
            <div>
            Location
            </div>
            {locationOptions.map(location => 
              <button
                onClick={filterLocations}
                className={location.label === locationFilter ? 'filter-option-selected' : 'filter-option' }
                value={location.label}
                key={location.label}>
                {location.label}
              </button>)}
          </div>
          <div className="filter-item">
            <div>
            Category
            </div>
            {categoryOptions.map(category => 
            
              <button 
                onClick={filterCategories} 
                className={category.id === parseInt(categoryFilter) ? 'filter-option-selected' : 'filter-option' }                
                value={category.id} 
                key={category.id}>
                {category.label}
              </button>)}

          </div>
          <div className="filter-item">Price
            {priceOptions.map(price =>
              <button 
                onClick={filterPrice} 
                className={parseInt(price) === priceFilter ? 'filter-option-selected' : 'filter-option' }                value={price.value} 
                key={price.label}>
                {price.label}
              </button>)}

          </div>

          {/* <div className="filter-item">Host</div> */}
        </div>
      </div>

      {loading ?
        <Spinner />
        :
        <div className="container-index">

          <div
            style={emptyFilter() ?
              { display: 'flex' } :
              { display: 'none' }}
          >Ooops, looks like you ran out of talks...
            <button
              onClick={handleReset}
              className="reset-button"
            >Reset</button> 
          </div>
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