import React from 'react'

function EventForm({ data, errors, handleChange, handleSubmit , submitText }) {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          label="Name"
          placeholder="Event Name"
          onChange={handleChange}
          value={data.name}
          // error={errors.name}
        />

        <button buttontext={submitText}/>
      </form>
    </div>
  )
}

export default EventForm