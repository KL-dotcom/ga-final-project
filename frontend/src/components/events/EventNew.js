import React from 'react'
import { useHistory } from 'react-router-dom'
import { createEvent, getAllCategories } from '../../lib/api'
// import { popupNotification } from '../../lib/notification'
import useForm from '../../utils/useForm'
import useFetch from '../../utils/useFetch'

import EventForm from './EventForm'
import ImageForm from '../forms/ImageForm'
import PollForm from '../forms/PollForm'

function EventNew() {
  const history = useHistory()
  const { data: categories } = useFetch(getAllCategories)



  console.log(categories)
  const onSubmitSuccess = res => {
    // popupNotification('Event Added!')
    history.push(`/events/${res.data.id}`)
  }

  // const tempCategories = ''

  const { formData, handleChange, formErrors, handleSubmit } = useForm({
    name: '',
    categories: [],
    date_time: ''
  }, createEvent, null, onSubmitSuccess)


  const categoryPush = (event) => {
    const category = parseInt(event.target.id)
    formData.categories.push(category)
    console.log(formData.categories)
  }



  if (!categories) return null
  // can't post things into images and poll on this view, requires the talk id first which hasn't been made yet

  return (
    <div className="body">
      <h1>Create new event</h1>
      <div className="form">
        {/* <ImageForm />
        <PollForm /> */}
        <EventForm
          data={formData}
          errors={formErrors}
          handleChange={handleChange}
          categoryPush={categoryPush}
          handleSubmit={handleSubmit}
          submitText="Make my Event!"
        />

        {categories.map(category => (
          <button
            key={category.id}
            id={category.id}
            onClick={categoryPush}
            style={formData.categories.includes(category.id) ? console.log('hello') : console.log('bugger')}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>

  )
}

export default EventNew
