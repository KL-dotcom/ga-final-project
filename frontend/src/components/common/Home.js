import React from 'react'
import ProgressBar from 'react-bootstrap/ProgressBar'

const Home = () => {
  return (
    <div className="body">
      <div>Homepage, checking in</div>
      <div>
        <ProgressBar variant="success" now={40} />
        <ProgressBar variant="info" now={20} />
        <ProgressBar variant="warning" now={60} />
        <ProgressBar variant="danger" now={80} />
      </div>
    </div>

  )
}



export default Home