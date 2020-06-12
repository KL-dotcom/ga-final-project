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
  const [showFilter, setShowFilter] = React.useState('')

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

const handleShowFilters = () => {
  setShowFilter('')
}
const handleHideFilters = () => {
  setShowFilter('hidden')
}

  if (error) {
    return <Redirect to="/notfound" />
  }
  if (!events) return null
  return (
    <div className="body-index">
      <button onClick={handleShowFilters} className="show-filters-button">Show Filters</button>
      <div style={{visibility: `${showFilter}`}} className="filter-container">
        {/* <h1>{searchVal}</h1> */}
        <div className="filters">
          
          <button
            className="reset-button"
            onClick={handleReset}>
            Reset filters
          </button>
          <button
          
          onClick={handleHideFilters} className="hide-filters-button">Hide Filters</button>
          <div className="filter-item">
            <div className="filter-title">
              Search:
            </div>
            <div className="text-input">
              <input
                value = {searchInput}
                className="input"
                type="text" 
                onChange={handleSearch}
                placeholder="Search..." />
            </div>
          </div>
          <div className="filter-item">
            <div className="filter-title">
            Location:
            </div>
            <div className="filter-options">
              {locationOptions.map(location => 
                <button
                  onClick={filterLocations}
                  className={location.label === locationFilter ? 'filter-option-selected' : 'filter-option' }
                  value={location.label}
                  key={location.label}>
                  {location.label}
                </button>)}
            </div>
          </div>
          <div className="filter-item">
            <div className="filter-title">
            Category:
            </div>
            <div className="filter-options">
              {categoryOptions.map(category => 
                <button 
                  onClick={filterCategories} 
                  className={category.id === parseInt(categoryFilter) ? 'filter-option-selected' : 'filter-option' }                
                  value={category.id} 
                  key={category.id}>
                  {category.label}
                </button>)}
            </div>
          </div>
          <div className="filter-item">
            <div className="filter-title">
              Price:
            </div>
            <div className="filter-options">
              {priceOptions.map(price =>
                <button 
                  onClick={filterPrice} 
                  className={parseInt(price) === priceFilter ? 'filter-option-selected' : 'filter-option' }                value={price.value} 
                  key={price.label}>
                  {price.label}
                </button>)}
            </div>
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
              { display: 'none' }}>
            <div className="reset-box">
              <div className="text">
                Ooops, looks like you ran out of talks...
              </div>
              <button
                onClick={handleReset}
                className="reset-button">
              Reset
              </button> 
            </div>
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