import React from 'react'
// bars
import ProgressBar from 'react-bootstrap/ProgressBar'
import '../../styles/main.scss'


function EventPoll({ id, question, option_a, option_b, option_c, option_d, style, pollVote, answerA, answerB, answerC, answerD, option_a_count, option_b_count, option_c_count, option_d_count }) {

  const total = option_a_count + option_b_count + option_c_count + option_d_count

  return (
    <div className="poll" style={style}>
      <div className="question">

        <h4>{question}</h4>
        <hr />
      </div>
      <div className="answers">
        <div className="option-container">
          <p>{option_a}</p>
          <button onClick={() => pollVote(id, 'a', option_a_count)} id={id} value="a">Select</button>
        </div>
        <h3>Total Votes: {option_a_count}</h3>
        <ProgressBar animated variant="info" now={(option_a_count / total) * 100} />
        <hr />

        <div className="option-container">
          <p>{option_b}</p>
          <button onClick={() => pollVote(id, 'b', option_b_count)} id={id} value="b">Select</button>
        </div>
        <h3>Total Votes: {option_b_count}</h3>
        <ProgressBar animated now={(option_b_count / total) * 100} />
        <hr />
        <div className="option-container">
          <p>{option_c}</p>
          <button onClick={() => pollVote(id, 'c', option_c_count)} id={id} value="c">Select</button>
        </div>
        <h3>Total Votes: {option_c_count}</h3>
        <ProgressBar animated variant="warning" now={(option_c_count / total) * 100} />
        <hr />
        <div className="option-container"> <p>{option_d}</p>
          <button onClick={() => pollVote(id, 'd', option_d_count)} id={id} value="d">Select</button></div>
        <h3>Total Votes: {option_d_count}</h3>
        <ProgressBar animated variant="danger" now={(option_d_count / total) * 100} />
        <hr />
      </div>
    </div>

  )
}

export default EventPoll