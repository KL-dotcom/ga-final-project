import React from 'react'
import ProgressBar from 'react-bootstrap/ProgressBar'
import '../../styles/main.scss'

const Home = () => {
  return (

    <div className="body">
    <div>Homepage, checking in

        <ProgressBar animated variant="info"  now={90} />
        <ProgressBar animated now={20} />
        <ProgressBar animated variant="warning" now={60} />
        <ProgressBar animated variant="danger" now={80} />
        </div>
    </div>

  )
}



export default Home