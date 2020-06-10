import axios from 'axios'
import { getToken } from './auth'


const baseUrl = '/api'

const withHeaders = () => {
  return { headers: { Authorization: `Bearer ${getToken()}` } }
}

export const getAllEvents = () => {
  return axios.get(`${baseUrl}/talks`)
}

export const getSingleEvent = id => {
  return axios.get(`${baseUrl}/talks/${id}`)
}

export const createEvent = data => {
  console.log(data)
  return axios.post(`${baseUrl}/talks/`, data, withHeaders())
}

export const editEvent = (data, id) => {
  return axios.put(`${baseUrl}/talks/${id}/`, data, withHeaders())
}

export const deleteEvent = id => {
  return axios.delete(`${baseUrl}/talks/${id}`, withHeaders())
}

export const registerUser = data => {
  return axios.post(`${baseUrl}/register`, data)
}

export const loginUser = data => {
  return axios.post(`${baseUrl}/login`, data)
}

export const getOwnProfile = () => {
  return axios.get(`${baseUrl}/profile/`, withHeaders())
}

export const editProfile = (data) => {
  return axios.put(`${baseUrl}/profile/`, data, withHeaders())
}

export const getOwnBasket = id => {
  return axios.get(`${baseUrl}/basket/${id}/`, withHeaders())
}

export const updateBasket = (data, id) => {
  return axios.put(`${baseUrl}/basket/${id}/`, data, withHeaders())
}

export const userBasket = () => {
  return axios.get(`${baseUrl}/basket/`, withHeaders())
}

export const createBasket = () => {
  return axios.post(`${baseUrl}/basket/`, {}, withHeaders())
}

export const getCategories = () => {
  return axios.get(`${baseUrl}/categories/`)
}

export const createComment = data => {
  return axios.post(`${baseUrl}/comments/`, data, withHeaders())
}

export const createTicket = data => {
  return axios.post(`${baseUrl}/tickets/`, data, withHeaders())
}

export const getTicket = id => {
  return axios.get(`${baseUrl}/tickets/${id}/`, withHeaders())
}

export const createImage = data => {
  return axios.post(`${baseUrl}/images/talk/`, data, withHeaders())
}

export const createPoll = data => {
  return axios.post(`${baseUrl}/polls/`, data)
}

export const answerPoll = data => {
  return axios.post(`${baseUrl}/votes/`, data, withHeaders())
}

export const getAllCategories = () => {
  return axios.get(`${baseUrl}/categories/`)
}