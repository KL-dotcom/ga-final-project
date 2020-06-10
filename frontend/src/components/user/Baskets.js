import React from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { getOwnBasket, createTicket, updateBasket } from '../../lib/api'
import useFetchNew from '../../utils/useFetchNew'


function Basket() {
  const { id: basketId } = useParams()
  const result = useFetchNew(getOwnBasket, basketId)
  const { data: basket, loading, error } = result.state
  console.log('init state is ', basket)
  const setState = result.setState
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
    history.push('/profile/')

  }

  const handleClick = async (item) => {
    const newArr =
      basket.talk.filter(talk => (
        talk !== item
      )).map(obj => (obj.id))

    const res = await updateBasket({ 'talk': newArr }, basketId)

    setState((oldState) => {

      const newState = { ...oldState }
      newState.data.talk = oldState.data.talk.filter((talk) => res.data.talk.includes(talk.id))
      return newState
    })

  }



  if (loading) return <p>Loading</p>
  return (
    <div className="body">
      <h1>Your Basket</h1>
      <div className="basket-item">

        {basket?.talk.map(item => (
          <div key={item.id}>
            <p>{item.name}</p>
            <p>{item.price}</p>
            <button onClick={() => (handleClick(item))}>x</button>
          </div>))}

        <p>Price: <span>£{basket?.talk.reduce((accumulator, item) => (accumulator + parseFloat(item.price)), 0)}</span></p>
        <button onClick={makeTicket}>Check Out</button>
      </div>

    </div >

  )
}



export default Basket
