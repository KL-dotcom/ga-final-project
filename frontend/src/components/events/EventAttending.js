import React from 'react'
import { Redirect, useParams } from 'react-router-dom'
import { getSingleEvent, createComment, updatePoll } from '../../lib/api'
import EventPoll from './EventPoll'
import EventComment from './EventComment'
import Spinner from '../common/Spinner'

import useFetchNew from '../../utils/useFetchNew'
import { isAuthenticated } from '../../lib/auth'



function EventAttending() {
  const { id: eventId } = useParams()
  const result = useFetchNew(getSingleEvent, eventId)
  const { data: event, loading, error } = result.state
  const setState = result.setState

  // const { data: events } = useFetch(getAllEvents)
  const [pending, setPending] = React.useState('')
  const handleChange = e => {
    const text = e.target.value
    setPending(text)
  }

  console.log(pending)


  const handleClick = async () => {

    try {
      const res = await createComment({ text: pending, talk: eventId })
      setState((oldState) => {
        const newState = { ...oldState }
        console.log(newState.data.comments.push(res.data))
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

  console.log(isAuthenticated().sub)



  if (!event) return null

  const isAttending = () => {
    const attendees = event.ticket.map(ticket => {
      console.log(ticket.user)
      return ticket.user
    })
    if (attendees.includes(isAuthenticated().sub)) {
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

  return (
    <div className="body">
      <div className="container">
        {loading ?
          <Spinner />
          :
          <>
            <div className="title-container">
              <div className="title-image">
                {/* {event.image ? */}
                < img src={event.image} alt={event.name} loading="lazy" width="150" height="150" />
                {/* // :
                  // <img src='https://avatars.slack-edge.com/2020-05-09/1112549471909_7543dde099089941d3c3_512.png' alt={event.name} loading="lazy" width="150" height="150" />} */}
              </div>
              <div className="title-wording">
                <div className="title">{event.name}</div>
                <div className="host">Hosted by: {event.host.username}</div>
                <div className="location">Location: {event.location}</div>
                <div className="date-time">When: {event.date_time.replace('T', ' at ').replace(':00Z', '')}</div>
                <div className="price">Price: £{event.price}</div>
              </div>
            </div>
            <div className="description">
              <div className="title-wording">
                <strong>About this event:</strong><br></br>
                {event.about}
              </div>
            </div>
            {isAttending() ?
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

                {/* <input
                  onChange={handleChange}
                  value={pending}
                  name="text"
                ></input>
                <button onClick={handleSubmit}>Submit</button> */}
              </div>
              : ''}


            <input
              onChange={handleChange}
              value={pending}
              name="text"
            ></input>
            <button onClick={handleClick}>Submit</button>

          </>
        }
      </div>
    </div>

  )

}
// const totalVotes = a + b + c + d
// const answerA = a
// const answerB = b
// const answerC = c
// const answerD = d

// console.log(a)
// console.log(b)
// console.log(c)
// console.log(d)











export default EventAttending
