import React from 'react'


function EventComment({ text, user }) {
  return (

    <div className="comment">
      {/* <p>{user.username}:</p> */}
      <p> {text}</p>
      <hr />
    </div>

  )
}

export default EventComment