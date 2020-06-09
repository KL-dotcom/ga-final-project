import React from 'react'
import { useParams } from 'react-router-dom'
import { getTicket } from '../../lib/api'
import useFetch from '../../utils/useFetch'

function TicketShow() {
  const { id: ticketId } = useParams()
  const { data: ticket, loading, error } = useFetch(getTicket, ticketId)

  console.log(ticket)

  if (error) {
    console.log(error)
  }

  if (loading) return <p>Loading</p>
  return (
    <div className="body">
      <h1>Booking Confirmation</h1>
      <div>
        <h4>Thank you {ticket.user.first_name} {ticket.user.last_name} for booking your ticket with <em>Pollopalooza</em>. Please retain a copy of this eticket and present it to admission upon your arrival.</h4>
        <p>Booking reference: <span>00{ticket.id}</span></p>
        <p>Event attending: <span>{ticket.talk.name}</span></p>
        <p>Location: <span>{ticket.talk.location}</span></p>
        <p>Date and time: <span>{ticket.talk.date_time.replace('T', ' at ').replace(':00Z', '')}</span></p>
        <img src={ticket.image} alt={ticket.id} />
      </div>

    </div >

  )
}



export default TicketShow