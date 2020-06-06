import React from 'react'

function EventForm({ data, handleChange, handleSubmit , submitText }) {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          label="Name"
          placeholder="Event Name"
          onChange={handleChange}
          value={data.name}
        />

        <button buttontext={submitText}/>
      </form>
    </div>
  )
}

export default EventForm