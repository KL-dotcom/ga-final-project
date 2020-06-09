import React from 'react'


function EventPoll({ id, question, option_a , option_b , option_c , option_d , style }) {

  return (

    <div className="poll" style={style}>
      <div className="question">
        Question {id}: {question}
      </div>
      <div className="answers">
        <button>{option_a}</button>
        <button>{option_b}</button>
        <button>{option_c}</button>
        <button>{option_d}</button>
      </div>
    </div>

  )
}

export default EventPoll