import React from 'react'


function EventComment({ text, user }) {




  return (

    <div className="comment">
      <div className="comment-title">{user.username}:</div>
      <div className="comment-text"> {text}</div>
      <hr />
    </div>

  )
}

export default EventComment