import React from 'react'
import { Link, Redirect, useHistory, useParams } from 'react-router-dom'
import { getSingleEvent, deleteEvent, createComment, updatePoll } from '../../lib/api'
import useFetch from '../../utils/useFetch'
import EventPoll from './EventPoll'
import EventComment from './EventComment'
import Spinner from '../common/Spinner'
import useForm from '../../utils/useForm'
import useFetchNew from '../../utils/useFetchNew'
import { isAuthenticated } from '../../lib/auth'
// import { isAttending } from '../../lib/auth'


function EventAttending() {
  const { id: eventId } = useParams()
  const result = useFetchNew(getSingleEvent, eventId)
  const { data: event, loading, error } = result.state
  const setState = result.setState
  const { formData, handleChange, handleSubmit } = useForm({
    text: '',
    talk: eventId
  }, createComment, eventId)


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

  // const onSubmitSuccess = (response) => {
  //   setState((oldState) => {
  //     const newState = { ...oldState }
  //     newState.comments.push(response.data)
  //   })
  // }
  console.log(isAuthenticated().sub)

  
  
  if (!event) return null
  
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


  //   const handleChange = async () => {
  // await 
  //   }

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

  return (
    <div className="body">
      <div className="container">
        {loading ?
          <Spinner />
          :
          <>
            <div className="title-container">
              <div className="title-image">
                <img src={event.image} alt={event.name} loading="lazy" width="500" className="image" />
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
              : ''}
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
