import axios from 'axios'

const baseUrl = 'https://cheesebored.herokuapp.com'

export const getAllEvents = () => {
  return axios.get(`${baseUrl}/cheeses`)
}

export const getSingleEvent = id => {
  return axios.get(`${baseUrl}/cheeses/${id}`)
}