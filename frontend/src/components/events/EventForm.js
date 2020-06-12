import React from 'react'
import { locationOptions } from '../../lib/IndexSearchOptions'

function EventForm({ data, handleChange, handleSubmit, errors, submitText }) {
  console.log(locationOptions)
  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="event-form-item">
          <input
            name="name"
            label="Name"
            placeholder="Event Name"
            onChange={handleChange}
            value={data.name}
            error={errors.name}
          />
        </div>
        {errors && <small>{errors.name}</small>}

        <div className="event-form-item">
          <select
            name="location"
            label="location"
            placeholder="Location"
            onChange={handleChange}
            value={data.location}
            error={errors.location}
            defaultValue="DEFAULT"
          >
            <option value="DEFAULT" disabled>Location</option>
            {locationOptions.map(location => {
              return <option key={location.label} value={location.label}>{location.label}</option>
            })}
          </select>
        </div>
        {errors && <small>{errors.location}</small>}
        {/* 
        <div className="event-form-item">
          <input
            name="location"
            label="Location"
            placeholder="Location"
            onChange={handleChange}
            value={data.location}
            error={errors.location}
          />
        </div> */}

        <div className="event-form-item">
          <input

            name="price"
            label="Price"
            placeholder="Price"
            onChange={handleChange}
            value={data.price}
            error={errors.price}
          />
        </div>
        {errors && <small>{errors.price}</small>}
        <div className="event-form-item">
          <input
            type="datetime-local"
            name="date_time"
            label="date_time"
            placeholder="Date time"
            onChange={handleChange}
            value={data.date_time}
            error={errors.date_time}
          />
        </div>
        {errors && <small>{errors.date_time}</small>}
        <div className="event-form-item">
          <textarea
            name="about"
            label="About"
            placeholder="About"
            onChange={handleChange}
            value={data.about}
            error={errors.about}
          />
        </div>
        {errors && <small>{errors.about}</small>}
        {/* <div className="event-form-item">
          <input
            name="talk_images"
            label="talk_images"
            placeholder="Image"
            onChange={handleChange}
            value={data.talk_images}
            error={errors.talk_images}
          />
        </div> */}






        <button className="make-event-button" buttontext={submitText}>{submitText}</button>
      </form>
    </div>
  )
}

export default EventForm