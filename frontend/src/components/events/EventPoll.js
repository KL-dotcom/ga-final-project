import React from 'react'


function EventPoll({ id, question, option_a , option_b , option_c , option_d , style , pollVote , answerA , answerB , answerC, answerD }) {

  return (
    <div className="poll" style={style}>
      <div className="question">
        Question {id}: {question}
      </div>
      <div className="answers">
        <button onClick={pollVote} id={id} value="a">{option_a}</button>
        <h4>{answerA}</h4>
        <button onClick={pollVote} id={id} value="b">{option_b}</button>
        <h4>{answerB}</h4>
        <button onClick={pollVote} id={id} value="c">{option_c}</button>
        <h4>{answerC}</h4>
        <button onClick={pollVote} id={id} value="d">{option_d}</button>
        <h4>{answerD}</h4>
      </div>
    </div>

  )
}

export default EventPoll