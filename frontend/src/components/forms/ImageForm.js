import React from 'react'
import { createImage } from '../../lib/api'
import useForm from '../../utils/useForm'

import { useParams } from 'react-router-dom'

function ImageForm() {
  const { id: eventId } = useParams()

  const onSubmitSuccess = () => {

  }
  const { data, handleChange, formErrors, handleSubmit } = useForm({
    image: '',
    talk: eventId
  }, createImage, null, onSubmitSuccess)




  return (
    <div className="event-form">
      <form onSubmit={handleSubmit}>
        <div className="form-item">
          <input
            name="image"
            label="Image"
            placeholder="Event Images"
            onChange={handleChange}
            value={data}
            error={formErrors}
          />
        </div>
        <button>Submit your Image</button>
      </form>
    </div>
  )
}

export default ImageForm