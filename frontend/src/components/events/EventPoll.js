import React from 'react'
// bars
import ProgressBar from 'react-bootstrap/ProgressBar'
import '../../styles/main.scss'


function EventPoll({ id, question, option_a, option_b, option_c, option_d, style, pollVote, answerA, answerB, answerC, answerD, option_a_count, option_b_count, option_c_count, option_d_count }) {

  const total = option_a_count + option_b_count + option_c_count + option_d_count

  const makeNum = value => {
    if (value === 0) return 0
    return Math.round((value / total) * 100)
  }


  return (
    <div className="poll" style={style}>
      <div className="question">
        <hr />
        <h5>{question}</h5>
        {/* <hr /> */}
      </div>
      <div className="answers">
        <div className="option-container">
          <button onClick={() => pollVote(id, 'a', option_a_count)} id={id} value="a" max='30'>{option_a}</button>
          <button onClick={() => pollVote(id, 'b', option_b_count)} id={id} value="b" max='30'>{option_b}</button>
          <button onClick={() => pollVote(id, 'c', option_c_count)} id={id} value="c" max='30'>{option_c}</button>
          <button onClick={() => pollVote(id, 'd', option_d_count)} id={id} value="d" max='30'>{option_d}</button>
        </div>





        <div>{option_a}: {makeNum(option_a_count)}%</div>
        <ProgressBar animated variant="info" now={(option_a_count / total) * 100} />

        <div>{option_b}: {makeNum(option_b_count)}%</div>
        <ProgressBar animated now={(option_b_count / total) * 100} />

        <div>{option_c}: {makeNum(option_c_count)}%</div>
        <ProgressBar animated variant="warning" now={(option_c_count / total) * 100} />

        <div>{option_d}: {makeNum(option_d_count)}%</div>
        <ProgressBar animated variant="danger" now={(option_d_count / total) * 100} />

      </div>
    </div>

  )
}

export default EventPoll