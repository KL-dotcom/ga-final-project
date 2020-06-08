import React from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
import { getOwnBasket } from '../../lib/api'
import useFetch from '../../utils/useFetch'

function Basket() {
  const { id: profileId } = useParams()
  const { data: basket, loading, error } = useFetch(getOwnBasket)

  if (error) {
    console.log(error)
  }

  const makeTicket = e => {

  }


  return (
    <div className="body">
      <h1>Your Basket</h1>
      <div className="basket-item">
        <h4></h4>

        {loading ?
          <p> Loading .... </p>
          :

          basket.talk.map(item => (
            <div key={item.id}>
              <p>{item.name}</p>
              <p>{item.price}</p>
            </div>))

        }

        <p>Price: <span>{loading ? '' : basket.total_price}</span></p>
        <button>Check Out</button>
      </div>

    </div >

  )
}



export default Basket