import React from 'react'
import { Link, Redirect, useHistory, useParams } from 'react-router-dom'
import { getSingleEvent, getAllEvents, deleteEvent, userBasket, updateBasket , updatePoll , createComment } from '../../lib/api'
import useFetch from '../../utils/useFetch'
import EventCard from './EventCard'
import Spinner from '../common/Spinner'
import { isOwner } from '../../lib/auth'
import EventPoll from './EventPoll'
import EventComment from './EventComment'

import useForm from '../../utils/useForm'
import useFetchNew from '../../utils/useFetchNew'
import { isAuthenticated } from '../../lib/auth'
// import { isAttending } from '../../lib/auth'


function EventShow() {
  const { id: eventId } = useParams()
  const result = useFetchNew(getSingleEvent, eventId)
  const { data: event, loading, error } = useFetch(getSingleEvent, eventId)
  const { data: events } = useFetch(getAllEvents)
  const setState = result.setState
  const { formData, handleChange, handleSubmit } = useForm({
    text: '',
    talk: eventId
  }, createComment, eventId)
  const history = useHistory()
  // const eventImage = event.talk_images



  const [answer, setAnswer] = React.useState(
    {
      answerA: 0,
      answerB: 0,
      answerC: 0,
      answerD: 0
    })


  if (error) {
    return <Redirect to="/notfound" />
  }

  console.log(isAuthenticated().sub)


  if (!event || !events) return null

  const isAttending = () => {
    const attendees = event.ticket.map(ticket => {
      console.log(ticket.user)
      return ticket.user
    })
    if (attendees.includes(isAuthenticated().sub)){
      return (true)
    }
    
    console.log(attendees)
  
  }

  const pollVote = async (id, value, number) => {
    const newValue = number + 1
    let res
    if (value === 'a') {
      res = await updatePoll({ option_a_count: newValue }, id)
    } else if (value === 'b') {
      res = await updatePoll({ option_b_count: newValue }, id)
    } else if (value === 'c') {
      res = await updatePoll({ option_c_count: newValue }, id)
    } else {
      res = await updatePoll({ option_d_count: newValue }, id)
    }
  
    setState((oldState) => {
      const newState = { ...oldState }
      console.log('os ', oldState)
      console.log('dat ', res)
      newState.data.polls = oldState.data.polls.map((poll) => {
        if (poll.id === res.data.id) {
          console.log('Got a match and making a replacement')
          return res.data
        } else {
          console.log('no match')
          return poll
        }
      })
      console.log('new state', newState)
      return newState
    })
    console.log('event', event)
  }

  const handleDelete = async () => {
    try {
      await deleteEvent(eventId)
      history.push('/events')
    } catch (err) {
      history.push('/notfound')
    }
  }
  console.log(event)

  if (error) {
    return <Redirect to="/notfound" />
  }
  const filterOrigin = () => {
    if (!events) return null
    const regexp = new RegExp(event.categories[0], 'i')
    let filtered = events.filter(event => (
      (regexp.test(event.categories))))
    filtered = [filtered[1], filtered[2], filtered[3]]
    return filtered
  }


  const addToBasket = async () => {
    const res = await userBasket()
    const basket = res.data[0]
    await updateBasket({ 'talk': [...basket.talk, eventId] }, basket.id)

  }

  const addToWishlist = e => {
    console.log(e.target.value)
  }
  console.log(event.host.id)
  console.log(isOwner(event.host.id))

  return (
    <div className="body">
      <div className="container">

        {loading ?
          <Spinner />
          :
          <>
            <div className="title-container">
              <div className="title-image">
                {event.talk_images.map(image => (
                  <img src={image.image} key={image.id} loading="lazy" width="500" className="image" />
                ))}

              </div>
              <div className="title-wording">
                <div className="title">{event.name}</div>
                <div className="host">Hosted by: {event.host.username}</div>
                <div className="location">Location: {event.location}</div>
                <div className="price">Price: £{event.price}</div>
                {isOwner(event.host.id) ?
                  <div className="owner-buttons">
                    <Link to={`/events/${eventId}/edit`} className="link"><button>Edit</button></Link>
                    <button onClick={handleDelete}>Delete event</button>
                  </div>
                  : null}
              </div>
            </div>
            <div className="interest-buttons">
              <button onClick={addToWishlist} value="Wishlist" >Add to wish list</button>
              <button onClick={addToBasket} value="Basket" >Add to basket</button>
            </div>
            <div className="description">
              <div className="title-wording">
                <strong>About this event:</strong><br></br>
                {event.about}
              </div>
            </div>
            <div className="tags">
              <strong>Tags:</strong><br></br>
              {event.categories.map(category => (
                <h1 key={category.id}>{category.name}</h1>
              ))}
            </div>

            { isAttending() ? 
              <div className="poll-container">
                {event.polls ?
                  event.polls.map(poll => (
                    <EventPoll
                      pollVote={pollVote}
                      // style={poll.id === 2 ? { visibility: 'hidden' } : { visibility: 'display' }}
                      id={poll.id}
                      key={poll.id}

                      {...poll} />
                  ))
                  : ''}

                {event.comments ?
                  event.comments.map(poll => (
                    <EventComment
                      style={poll.id === 2 ? { visibility: 'hidden' } : { visibility: 'display' }}
                      key={poll.id}
                      {...poll} />
                  ))
                  : ''}

                <input
                  onChange={handleChange}
                  value={formData.text}
                  name="text"
                ></input>
                <button onClick={handleSubmit}>Submit</button>
              </div>
              : 
            
            
            
            
            
              <div className="similar-events">
                <strong>Similar Events:</strong><br></br>
                <div className="similar-events-cards">

                  {filterOrigin().map(event => 
                    <EventCard key={event.id} className="card" {...event} />
                  )}
                </div>
              </div>

            }





          </>
        }
      </div>
    </div>

  )
}

export default EventShow
