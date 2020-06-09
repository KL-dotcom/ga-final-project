import React from 'react'
import { Redirect } from 'react-router-dom'
import { useHistory, useParams } from 'react-router-dom'
import { editEvent, getSingleEvent } from '../../lib/api'
import useForm from '../../utils/useForm'
import useFetch from '../../utils/useFetch'

import EventForm from './EventForm'

function EventEdit() {
  const { id: eventId } = useParams()
  const history = useHistory()

  const { data: event, error } = useFetch(getSingleEvent, eventId)

  const onSubmitSuccess = () => {
    history.push(`/events/${eventId}`)
  }

  const { formData, handleChange, setFormData, formErrors, handleSubmit } = useForm({
    name: '',
    image: ''
  }, editEvent, eventId, onSubmitSuccess) 

  React.useEffect(() => {
    if (event) {
      setFormData(event)
    }
  }, [event, setFormData])

  if (error) {
    return <Redirect to="notfound" />
  }
  if (!event) return null
  console.log(event.categories)

  return (
    <div className="body">
      <h1>Edit your event</h1>
      <div className="form">
        <EventForm
          data={formData}
          errors={formErrors}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          submitText="Edit my Event!"
        />
      </div>
    </div>
  )
}

export default EventEdit
