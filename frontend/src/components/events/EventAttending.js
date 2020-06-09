import React from 'react'
import { Link, Redirect, useHistory, useParams } from 'react-router-dom'
import { getSingleEvent, deleteEvent , createComment } from '../../lib/api'
import useFetch from '../../utils/useFetch'
import EventPoll from './EventPoll'
import EventComment from './EventComment'
import Spinner from '../common/Spinner'
import useForm from '../../utils/useForm'



function EventAttending() {
  const { id: eventId } = useParams()
  const { data: event , loading , error } = useFetch(getSingleEvent, eventId)
  const { formData, handleChange, handleSubmit } = useForm({
    text: '', 
    talk: eventId
  }, createComment, eventId) 



  // const history = useHistory()
  // // const eventImage = event.talk_images
  // const activeQuestions = [1,2,3,4]
  
  if (error) {
    return <Redirect to="/notfound" />
  }
  
  if (!event) return null

  return (
    <div className="body">
      <div className="container">
        <h1>THIS PAGE IS FOR PEOPLE ATTENDING THE EVENT</h1>

        {loading ?
          <Spinner />
          :
          <>
            <div className="title-container">
              <div className="title-image">
                <img src={event.image} alt={event.name} loading="lazy" width="500" className="image"/>
              </div>
              <div className="title-wording">
                <div className="title">{event.name}</div>
                <div className="host">Hosted by: {event.host.username}</div>
                <div className="location">Location: {event.location}</div>
                <div className="price">Price: £{event.price}</div>
              </div>
            </div>
            <div className="description">
              <div className="title-wording">
                <strong>About this event:</strong><br></br>
                {event.about}
              </div>
            </div>
            {event.polls ?
              event.polls.map(poll => (
                <EventPoll
                  style={poll.id === 2 ? { visibility: 'hidden' } : { visibility: 'display' }}
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

          </>
        }
      </div>
    </div>

  )
}

export default EventAttending
