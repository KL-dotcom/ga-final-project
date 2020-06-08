import React from 'react'

function EventForm({ data, handleChange, handleSubmit , submitText }) {
  return (
    <div className="event-form">
      <form onSubmit={handleSubmit}>
        <div className="form-item">
          <input
            name="name"
            label="Name"
            placeholder="Event Name"
            onChange={handleChange}
            value={data.name}
          />
        </div>

        <div className="form-item">
          <input
            name="categories"
            label="Categories"
            placeholder="Categories"
            onChange={handleChange}
            value={data.categories}
          />
        </div>
          
        <div className="form-item">
          <input
            name="Location"
            label="Location"
            placeholder="Location"
            onChange={handleChange}
            value={data.location}
          />
        </div>
        
        <div className="form-item">
          <input
            name="price"
            label="Price"
            placeholder="Price"
            onChange={handleChange}
            value={data.price}
          />
        </div>

        <div className="form-item">
          <input
            name="about"
            label="About"
            placeholder="About"
            onChange={handleChange}
            value={data.about}
          />
        </div>

        <div className="form-item">
          <input
            name="images"
            label="Images"
            placeholder="Images"
            onChange={handleChange}
            value={data.talk_images}
          />
        </div>






        <button buttontext={submitText}>{submitText}</button>
      </form>
    </div>
  )
}

export default EventForm