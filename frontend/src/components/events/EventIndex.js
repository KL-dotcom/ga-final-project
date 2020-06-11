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



 

  // const filterLocations = (event) => {
  //   const search = event.target.value
  //   // const regexp = new RegExp(search, 'i')
  //   // const startingEvents = filteredEvents ? filteredEvents : events
  //   // const filtered = startingEvents.filter((event) => {
  //   //   if (regexp.test(event.location)) return true
  //   // } 
  //   // )
  //   setLocationFilter(search)
  //   filterEvents()
  //   // setFilteredEvents(filtered)
  // }
  // console.log(locationFilter)

  // const filterCategories = (event) => {
  //   const search = event.target.value
  //   // const startingEvents = filteredEvents ? filteredEvents : events
  //   // const filtered = startingEvents.filter((event) => {
  //   //   const eventCategories = event.categories.map((currentValue) => {
  //   //     return currentValue.id
  //   //   })
  //   //   if (eventCategories.includes(parseInt(search))) {
  //   //     return event
  //   //   }
  //   // }
  //   // )
  //   setCategoryFilter(search)
  //   filterEvents()
  // }


  // const filterPrice = (event) => {
  //   const search = event.target.value
  //   // const startingEvents = filteredEvents ? filteredEvents : events
  //   // const filtered = startingEvents.filter((event) => {
  //   //   if (event.price < search) return event
  //   // })

  //   setPriceFilter(search)
  //   filterEvents()
  // }



  // console.log(priceFilter)
  // console.log(locationFilter)
  // console.log(categoryFilter)




  // const filterEvents = () => {
  //   const regexp = new RegExp(locationFilter, 'i')
  //   const startingEvents = filteredEvents ? filteredEvents : events
  //   console.log(startingEvents)
  //   const filtered = startingEvents.filter(event => (
  //     (priceFilter ? event.price < priceFilter : null) 
  //       &&
  //       (categoryFilter ?  
  //         startingEvents.filter((event) => {
  //           const eventCategories = event.categories.map((currentValue) => {
  //             return currentValue.id
  //           })
  //           if (eventCategories.includes(parseInt(categoryFilter))) {
  //             return true
  //           }
  //         })
  //         : null) 
  //     && 
  //     (locationFilter ? (regexp.test(event.location)) : null) 

      
  //   ))
  //   setFilteredEvents(filtered)
  // }










  const filterLocations = (event) => {
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

  const filterCategories = (event) => {
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


  const filterPrice = (event) => {
    const search = event.target.value
    const startingEvents = filteredEvents ? filteredEvents : events
    const filtered = startingEvents.filter((event) => {
      if (event.price < search) return event
      
    })
    setPriceFilter(search)
    setFilteredEvents(filtered)
  }



  console.log(priceFilter)
  console.log(locationFilter)
  console.log(categoryFilter)

  // const handleSearch = e => {
  //   const search = e.target.value
  // const handleReset = () => {
  //   setFilteredEvents('')
  // }

  const handleSearch = event => {

    console.log(event)
    // filterEvents(search)

    // setSetSearchVal(search)
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
          {/* <button onClick={handleReset}>Reset Filter</button> */}
          <div className="filter-item">Location
            {locationOptions.map(location => 
              <button
                onClick={filterLocations}
                value={location.label}
                key={location.label}>
                {location.label}
              </button>)}
          </div>
          <div className="filter-item">Category
            {categoryOptions.map(category => 
              <button 
                onClick={filterCategories} 
                value={category.id} 
                key={category.id}>
                {category.label}
              </button>)}

          </div>
          <div className="filter-item">Price
            {priceOptions.map(price =>
              <button 
                onClick={filterPrice} 
                value={price.value} 
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