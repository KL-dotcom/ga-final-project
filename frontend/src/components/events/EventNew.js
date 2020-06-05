import React from 'react'
import { useHistory } from 'react-router-dom'
import { createEvent } from '../../lib/api'
import { popupNotification } from '../../lib/notification'
import useForm from '../../utils/useForm'

import EventForm from './EventForm'

function EventNew() {

  const history = useHistory()

  const onSubmitSuccess = res => {
    popupNotification('Event Added!')
    history.push(`/events/${res.data._id}`)
  }

  const { formData, handleChange, formErrors, handleSubmit } = useForm({
    name: '',
    origin: '',
    image: '',
    tastingNotes: ''
  }, createEvent, null, onSubmitSuccess)

  return (
    <div>
      <h1>Create new event</h1>
      <EventForm
        data={formData}
        errors={formErrors}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        submitText="Make my Event!"
      />
    </div>

  )
}

export default EventNew
