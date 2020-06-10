import React from 'react'


function EventComment({ text , user }) {
  return (

    <div className="comment">
      {text}
      {/* {userId} */}
    </div>

  )
}

export default EventComment