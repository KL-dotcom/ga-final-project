import axios from 'axios'
import { getToken } from './auth'


const baseUrl = 'https://cheesebored.herokuapp.com'

const withHeaders = () => {
  return { headers: { Authorization: `Bearer ${getToken()}` } }
}

export const getAllEvents = () => {
  return axios.get(`${baseUrl}/cheeses`)
}

export const getSingleEvent = id => {
  return axios.get(`${baseUrl}/cheeses/${id}`)
}

export const createEvent = data => {
  return axios.post(`${baseUrl}/cheeses`, data, withHeaders())
}

export const editEvent = (data, id) => {
  return axios.put(`${baseUrl}/cheeses/${id}`, data, withHeaders())
}

export const deleteEvent = id => {
  return axios.delete(`${baseUrl}/cheeses/${id}`, withHeaders())
}

export const registerUser = data => {
  return axios.post(`${baseUrl}/register`, data)
}

export const loginUser = data => {
  return axios.post(`${baseUrl}/login`, data)
}