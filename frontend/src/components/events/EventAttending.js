import React from 'react'
import { Link, Redirect, useHistory, useParams } from 'react-router-dom'
import { getSingleEvent, deleteEvent , createComment , answerPoll } from '../../lib/api'
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
  


  // const [answerA, setAnswerA] = React.useState(0)
  // const [answerB, setAnswerB] = React.useState(0)
  // const [answerC, setAnswerC] = React.useState(0)
  // const [answerD, setAnswerD] = React.useState(0)
  const [answer, setAnswer] = React.useState(
    {
      answerA: 0,
      answerB: 0,
      answerC: 0,
      answerD: 0
    })


  const pollVote = async e => {
    e.preventDefault()
    const data = {
      response: e.target.value,
      polls: e.target.id
    }
    try {
      const res = await answerPoll(data)
      pollAnswers(data)
      console.log(res)
    } catch (err) {
      console.log(err)
    }
  }
  
  if (error) {
    return <Redirect to="/notfound" />
  }

  if (!event) return null

  
  const pollAnswers = (data) => {
    console.log(data)
    event.polls[(data.polls - 1)].results.map(poll => {
      if ( poll.response === 'a' ){
        setAnswer( { ...answer, answerA: 10 + 1  })
      } else if (poll.response === 'b' ){
        setAnswer( { ...answer, answerB: 10 + 1  })
      } else if (poll.response === 'c' ){
        setAnswer( { ...answer, answerC: 10 + 1  })
      } else {
        setAnswer( { ...answer, answerD: 10 + 1  })
      }
    }
    )
  
    
    console.log(answer.answerA)
    console.log(answer.answerB)
    console.log(answer.answerC)
    console.log(answer.answerD)
    
    
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
                  pollVote={pollVote}
                  style={poll.id === 2 ? { visibility: 'hidden' } : { visibility: 'display' }}
                  id={poll.id}
                  key={poll.id}
                  answerA={answer.answerA}
                  answerB={answer.answerB}
                  answerC={answer.answerC}
                  answerD={answer.answerD}
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
