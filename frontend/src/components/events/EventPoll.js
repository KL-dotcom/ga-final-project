import React from 'react'


function EventPoll({ id, question, option_a, option_b, option_c, option_d, style, pollVote, answerA, answerB, answerC, answerD, option_a_count, option_b_count, option_c_count, option_d_count }) {

  return (
    <div className="poll" style={style}>
      <div className="question">

        <h3>{question}</h3>
        <hr />
      </div>
      <div className="answers">
        <div className="option-container">
          <p>{option_a}</p>
          <button onClick={() => pollVote(id, 'a', option_a_count)} id={id} value="a">Select</button>
        </div>
        <h4>Total Votes: {option_a_count}</h4>
        <hr />

        <div className="option-container">
          <p>{option_b}</p>
          <button onClick={() => pollVote(id, 'b', option_b_count)} id={id} value="b">Select</button>
        </div>
        <h4>Total Votes: {option_b_count}</h4>
        <hr />
        <div className="option-container">
          <p>{option_c}</p>
          <button onClick={() => pollVote(id, 'c', option_c_count)} id={id} value="c">Select</button>
        </div>
        <h4>Total Votes: {option_c_count}</h4>
        <hr />
        <div className="option-container"> <p>{option_d}</p>
          <button onClick={() => pollVote(id, 'd', option_d_count)} id={id} value="d">Select</button></div>
        <h4>Total Votes: {option_d_count}</h4>
        <hr />
      </div>
    </div>

  )
}

export default EventPoll