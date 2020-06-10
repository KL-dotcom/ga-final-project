import React from 'react'
import { Redirect } from 'react-router-dom'
import { useHistory, useParams } from 'react-router-dom'
import { editEvent, getSingleEvent , getAllCategories } from '../../lib/api'
import useForm from '../../utils/useForm'
import useFetch from '../../utils/useFetch'

import EventForm from './EventForm'
import ImageForm from '../forms/ImageForm'
import PollForm from '../forms/PollForm'



function EventEdit() {
  const { id: eventId } = useParams()
  const history = useHistory()
  const { data: event, error } = useFetch(getSingleEvent, eventId)
  const { data: categories } = useFetch(getAllCategories)

  const onSubmitSuccess = () => {
    history.push(`/events/${eventId}`)
  }

  const { formData, handleChange, setFormData, formErrors, handleSubmit } = useForm({
    name: '',
    categories: []
  }, editEvent, eventId, onSubmitSuccess)

  React.useEffect(() => {
    if (event) {
      setFormData(event)
    }
  }, [event, setFormData])

  const categoryPush = (event) => {
    const category = parseInt(event.target.id)
    formData.categories.push(category)
    console.log(formData.categories)
  }

  if (error) {
    return <Redirect to="notfound" />
  }
  if (!event) return null
  if (!categories) return null


  return (
    <div className="body">
      <h1>Edit your event</h1>
      <div className="form">
        <ImageForm />
        <PollForm />
        <EventForm
          data={formData}
          errors={formErrors}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          submitText="Edit my Event!"
        />
        {categories.map(category => (
          <button
            key={category.id}
            id={category.id}
            onClick={categoryPush}
            style={ formData.categories.includes(category.id) ? console.log('hello') : console.log('bugger')}
          >
            {category.name}
          </button>))}
      </div>
    </div>
  )
}

export default EventEdit
