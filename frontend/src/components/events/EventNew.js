import React from 'react'
import { useHistory } from 'react-router-dom'
import { createEvent } from '../../lib/api'
// import { popupNotification } from '../../lib/notification'
import useForm from '../../utils/useForm'

import EventForm from './EventForm'


function EventNew() {

  const history = useHistory()

  const onSubmitSuccess = res => {
    // popupNotification('Event Added!')
    history.push(`/events/${res.data.id}`)
  }

  const tempCategories = []

  const { formData, handleChange, formErrors, handleSubmit } = useForm({
    name: '',
    date_time: ''
  }, createEvent, null, onSubmitSuccess)



  const categoryPush = () => {
    console.log(tempCategories)
    formData.categories.push(formData.tempCategories)
    console.log(formData.categories)
  }


  return (
    <div className="body">
      <h1>Create new event</h1>
      <div className="form">

        <EventForm
          data={formData}
          errors={formErrors}
          handleChange={handleChange}
          categoryPush={categoryPush}
          handleSubmit={handleSubmit}
          submitText="Make my Event!"
        />
      </div>
    </div>

  )
}

export default EventNew
