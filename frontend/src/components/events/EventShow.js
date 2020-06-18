import React from 'react'
import { Link, Redirect, useHistory, useParams } from 'react-router-dom'
import { getSingleEvent, getAllEvents, deleteEvent, userBasket, updateBasket, updatePoll, createComment } from '../../lib/api'
import useFetch from '../../utils/useFetch'
import EventCardSimilar from './EventCardSimilar'
import Spinner from '../common/Spinner'
import { isOwner, getPayload } from '../../lib/auth'
import EventPoll from './EventPoll'
import EventComment from './EventComment'

import useFetchNew from '../../utils/useFetchNew'
import { isAuthenticated } from '../../lib/auth'
// import { isAttending } from '../../lib/auth'
import { popupToasty } from '../../lib/toasty'
import Notifications from 'react-notify-toast'


function EventShow() {
  const { id: eventId } = useParams()
  const result = useFetchNew(getSingleEvent, eventId)
  const { data: event, loading, error } = result.state
  const setState = result.setState
  const history = useHistory()

  const { data: events } = useFetch(getAllEvents)
  const [pending, setPending] = React.useState('')
  const handleChange = e => {
    const text = e.target.value
    setPending(text)
  }

  const handleClick = async () => {

    try {
      const res = await createComment({ text: pending, talk: eventId })
      res.data.user = { username: 'Your most recent comment' }
      console.log('res', res)
      setState((oldState) => {
        const newState = { ...oldState }
        newState.data.comments.push(res.data)
        console.log(newState)
        return newState
      })
      setPending('')

    } catch (err) {
      console.log(err)
    }
  }


  if (error) {
    return <Redirect to="/notfound" />
  }

  if (!event) return null

  // console.log(isAuthenticated().sub)



  if (!event) return null

  const isAttending = () => {
    const attendees = event.ticket.map(ticket => {
      // console.log(ticket.user)
      return ticket.user
    })
    if (attendees.includes(isAuthenticated().sub)) {
      return (true)
    }

    // console.log(attendees)

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
      newState.data.polls = oldState.data.polls.map((poll) => {
        if (poll.id === res.data.id) {
          return res.data
        } else {
          return poll
        }
      })

      return newState
    })
  }
  const handleDelete = async () => {
    try {
      await deleteEvent(eventId)
      history.push('/events')
    } catch (err) {
      history.push('/notfound')
    }
  }



  if (error) {
    return <Redirect to="/notfound" />
  }



  const filterOrigin = () => {
    if (!events) return null
    const filtered = events.filter((item, index) => (
      item.id !== parseFloat(eventId) && index < 3
    ))
    return filtered
  }

  const picture = () => {
    if (event.talk_images?.length === 0) {
      return <img src='https://avatars.slack-edge.com/2020-05-09/1112549471909_7543dde099089941d3c3_512.png' alt={event.name} loading="lazy" width="200" className="image" />
    } else {
      return <img src={event?.talk_images?.[0].image} alt={event.name} loading="lazy" width="200" className="image" />
    }
  }


  const whichUser = async () => {
    const res = await userBasket()
    const commentWriter = res.data.user
    if (event.comments.user.id === commentWriter) {
      return <p>You:</p>
    } else {
      return <p>{event.comments.user.username}</p>
    }
  }


  const addToBasket = async () => {
    if (!isAuthenticated()) popupToasty('Please log in or register an account first')
    const res = await userBasket()
    const basket = res.data
    await updateBasket({ 'talk': [...basket.talk, eventId] }, basket.id)
    popupToasty('Added to Basket!')

  }



  return (
    <div className="body">
      <div className="container">
        <Notifications />
        {loading ?
          <Spinner />
          :
          <>
            <div className="title-container">
              <div className="title-image">
                {picture()}
              </div>
              <div className="title-wording">
                <div className="title">{event.name}</div>
                <div className="host">Hosted by: {event.host?.username}</div>
                <div className="location">Location: {event.location}</div>
                <div className="price">Price: £{event.price}</div>
                <div className="date-time">{event.date_time?.replace('T', ' at ').replace(':00Z', '')}</div>
                {isOwner(event.host?.id) ?
                  <div className="owner-buttons">
                    <Link to={`/events/${eventId}/edit`} className="link"><button>Edit</button></Link>
                    <button onClick={handleDelete}>Delete event</button>
                  </div>
                  : null}
              </div>
            </div>
            <div className="interest-buttons">
              {/* <button onClick={addToWishlist} value="Wishlist" >Add to wish list</button> */}
              {!isAttending() && <button onClick={addToBasket} value="Basket">Add to basket</button>}
            </div>
            <div className="description">
              <div className="title-wording">
                <strong>About this event:</strong><br></br>
                {event.about}
              </div>
            </div>
            <div className="tags">
              <div className="title">
                <strong >Tags:</strong><br></br>
              </div>
              <div className="tags-container">
                {event.categories?.map(category => (
                  <div key={category.id} className="tag">{category.name}</div>
                ))}
              </div>
            </div>

            {isOwner(event.host?.id) || isAttending() ?
              <div className="paricipation-container">
                <div className="poll-container">
                  <div className="title">
                    <strong >Polls:</strong><br></br>
                  </div>
                  {event.polls ?
                    event.polls?.map(poll => (
                      <EventPoll
                        pollVote={pollVote}
                        // style={poll.id === 2 ? { visibility: 'hidden' } : { visibility: 'display' }}
                        id={poll.id}
                        key={poll.id}

                        {...poll} />
                    ))
                    : ''}
                </div>
                <div>
                  <div className="comments">
                    <div className="comments-title">
                      <strong >Comments:</strong><br></br>
                    </div>

                    {event.comments ?
                      event.comments?.map(poll => (
                        <EventComment
                          // style={poll.id === 2 ? { visibility: 'hidden' } : { visibility: 'display' }}
                          whichUser={whichUser}

                          key={poll.id}
                          {...poll} />

                      ))
                      : ''}
                  </div>
                  <div className="create-comment">
                    <textarea
                      onChange={handleChange}
                      value={pending}
                      placeholder='Write a comment...'
                      className="text-input"
                      name="text"
                    ></textarea>
                    <button onClick={handleClick}>Submit</button>
                  </div>
                </div>
              </div>
              :
              <div className="similar-events">
                <strong>Other events you may like:</strong>
                <div className="similar-events-cards">
                  {filterOrigin()?.map(event =>
                    <EventCardSimilar key={event.id} className="event-card" {...event} />
                  )}
                </div>
              </div>
            }





          </>
        }
      </div>
    </div >

  )
}

export default EventShow
