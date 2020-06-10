import React from 'react'
import { useHistory } from 'react-router-dom'
import { getOwnProfile } from '../../lib/api'
import useFetch from '../../utils/useFetch'


function TicketIndex() {
  const { data: profile } = useFetch(getOwnProfile)
  const history = useHistory()

  const handleBackButton = () => {
    history.push('/profile')
  }

  const handleTicketSelect = (e) => {
    history.push(`/tickets/${e.target.value}`)
  }

  if(!profile) return null
console.log(profile.ticket)
  return (
    <div className="body">
      <div className="ticket-body">
    <h1>Your Tickets</h1>

      {profile.ticket.map(tick => <button className="ticket"
  key={tick.id}
  value={tick.id}
  onClick={handleTicketSelect}
  >{tick.talk.name} </button>)}
      </div>
      <button onClick={handleBackButton}>Back</button>


    </div>
  )
}

export default TicketIndex