import React, { useEffect } from 'react'
// bars
import ProgressBar from 'react-bootstrap/ProgressBar'
import '../../styles/main.scss'


function EventPoll({ id, question, option_a: optionA, option_b: optionB, option_c: optionC, option_d: optionD, style, pollVote, option_a_count: optionACount, option_b_count: optionBCount, option_c_count: optionCCount, option_d_count: optionDCount }) {



  const [seeResult, setSeeResult] = React.useState('')

  useEffect(() => {
    const initialValue = localStorage.getItem(id)
    setSeeResult(initialValue)
  })


  const total = optionACount + optionBCount + optionCCount + optionDCount

  const makeNum = value => {
    if (value === 0) return 0
    return Math.round((value / total) * 100)
  }

  const storeResult = () => {
    localStorage.setItem(id, true)
    setSeeResult(true)
  }

  return (
    <div className="poll" style={style}>
      <div className="question">
        <hr />
        <h5>{question}</h5>
        {/* <hr /> */}
      </div>
      < div className="answers">
        {!seeResult &&


          <div className="option-container">
            <button onClick={() => pollVote(id, 'a', optionACount, storeResult())} id={id} value="a" max='30'>{optionA}</button>
            <button onClick={() => pollVote(id, 'b', optionBCount, storeResult())} id={id} value="b" max='30'>{optionB}</button>
            <button onClick={() => pollVote(id, 'c', optionCCount, storeResult())} id={id} value="c" max='30'>{optionC}</button>
            <button onClick={() => pollVote(id, 'd', optionDCount, storeResult())} id={id} value="d" max='30'>{optionD}</button>
          </div>}


        {seeResult &&

          <>
            <div>{optionA}: {makeNum(optionACount)}%</div>
            <ProgressBar animated variant="info" now={(optionACount / total) * 100} />

            <div>{optionB}: {makeNum(optionBCount)}%</div>
            <ProgressBar animated now={(optionBCount / total) * 100} />

            <div>{optionC}: {makeNum(optionCCount)}%</div>
            <ProgressBar animated variant="warning" now={(optionCCount / total) * 100} />

            <div>{optionD}: {makeNum(optionDCount)}%</div>
            <ProgressBar animated variant="danger" now={(optionDCount / total) * 100} />
          </>
        }

      </div>
    </div>

  )
}

export default EventPoll