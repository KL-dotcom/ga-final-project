import React from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { getOwnBasket, createTicket, updateBasket } from '../../lib/api'
import useFetch from '../../utils/useFetch'

function Basket() {
  const { id: basketId } = useParams()
  const { data: basket, loading, error } = useFetch(getOwnBasket, basketId)
  const history = useHistory()

  if (error) {
    console.log(error)
  }

  const makeTicket = () => {

    {
      basket.talk.map(item => (
        createTicket({ 'talk': item.id, 'image': `https://api.qrserver.com/v1/create-qr-code/?data=talk=${item.id}&size=300x300` }, basketId)
      ))
    }

    updateBasket({ 'talk': [], 'total_price': 0.00 }, basketId)
    // history.push('/profile/') --> push to profile, doesn't seem to be working rn check after next push

  }
  console.log(basket)

  if (loading) return <p>Loading</p>
  return (
    <div className="body">
      <h1>Your Basket</h1>
      <div className="basket-item">

        {basket?.talk.map(item => (
          <div key={item.id}>
            <p>{item.name}</p>
            <p>{item.price}</p>

          </div>))}

        <p>Price: <span>{basket?.total_price}</span></p>
        <button onClick={makeTicket}>Check Out</button>
      </div>

    </div >

  )
}



export default Basket