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
  console.log(data)
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

export const getOwnBasket = () => {
  return axios.get(`${baseUrl}/basket/3/`)
  return axios.get(`${baseUrl}/profile`, withHeaders())
}

export const getCategories = () => {
  return axios.get(`${baseUrl}/categories/`)
}