import React from 'react'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import Loader from 'react-loader-spinner'

function Spinner() {
  return (
    <div className="loading">
      <Loader type="TailSpin" color="#ffd539" height="100" width="100" />
    </div>
  )
}

export default Spinner